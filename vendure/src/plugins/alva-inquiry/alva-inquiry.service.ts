import { Injectable, Logger } from '@nestjs/common';
import { ID, TransactionalConnection } from '@vendure/core';
import { createTransport } from 'nodemailer';
import { FindOptionsWhere, ILike } from 'typeorm';
import { sendMicrosoftGraphEmail } from '../../email/microsoft-graph-email-sender';
import { AlvaInquiry, AlvaInquiryStatus } from './alva-inquiry.entity';

export type AlvaInquiryInput = {
    source?: unknown;
    company?: unknown;
    contact?: unknown;
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    message?: unknown;
    needs?: unknown;
    locale?: unknown;
    pageUrl?: unknown;
    website?: unknown;
    metadata?: unknown;
};

export type AlvaInquiryRequestMeta = {
    origin?: string;
    referer?: string;
    userAgent?: string;
};

export type AlvaInquiryListOptions = {
    skip?: number | null;
    take?: number | null;
    status?: string | null;
    source?: string | null;
    search?: string | null;
};

@Injectable()
export class AlvaInquiryService {
    private readonly logger = new Logger(AlvaInquiryService.name);

    constructor(private connection: TransactionalConnection) {}

    async submit(input: AlvaInquiryInput, requestMeta: AlvaInquiryRequestMeta = {}) {
        if (clean(input.website, 100)) {
            return { success: true, reference: 'ACCEPTED', notificationStatus: 'SKIPPED' as const };
        }

        const normalized = this.normalizeAndValidate(input, requestMeta);
        const repository = this.connection.rawConnection.getRepository(AlvaInquiry);
        const inquiry = repository.create({
            ...normalized,
            reference: this.createReference(),
            status: 'NEW',
            notificationStatus: 'PENDING',
            notificationError: '',
            notifiedAt: null as never,
        });

        await repository.save(inquiry);

        try {
            const sent = await this.sendNotification(inquiry);
            inquiry.notificationStatus = sent ? 'SENT' : 'SKIPPED';
            inquiry.notifiedAt = sent ? new Date() : null as never;
        } catch (error) {
            inquiry.notificationStatus = 'FAILED';
            inquiry.notificationError = clean(error instanceof Error ? error.message : String(error), 2000);
            this.logger.error(`Inquiry ${inquiry.reference} was saved, but notification delivery failed: ${inquiry.notificationError}`);
        }

        await repository.save(inquiry);
        return {
            success: true,
            reference: inquiry.reference,
            notificationStatus: inquiry.notificationStatus,
        };
    }

    async list(options: AlvaInquiryListOptions = {}) {
        const repository = this.connection.rawConnection.getRepository(AlvaInquiry);
        const skip = clampInteger(options.skip, 0, 100000, 0);
        const take = clampInteger(options.take, 1, 100, 25);
        const base: FindOptionsWhere<AlvaInquiry> = {};

        if (options.status) {
            base.status = normalizeStatus(options.status);
        }
        if (options.source) {
            base.source = clean(options.source, 40);
        }

        const search = clean(options.search, 200);
        const where = search
            ? ['reference', 'company', 'contact', 'email', 'phone', 'message'].map(field => ({
                ...base,
                [field]: ILike(`%${search}%`),
            }))
            : base;

        const [items, totalItems] = await repository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip,
            take,
        });
        return { items, totalItems };
    }

    findOne(id: ID) {
        return this.connection.rawConnection.getRepository(AlvaInquiry).findOne({ where: { id: id as never } });
    }

    async updateStatus(id: ID, status: string) {
        const repository = this.connection.rawConnection.getRepository(AlvaInquiry);
        const inquiry = await repository.findOne({ where: { id: id as never } });
        if (!inquiry) {
            throw new Error(`Inquiry ${id} was not found.`);
        }
        inquiry.status = normalizeStatus(status);
        return repository.save(inquiry);
    }

    private normalizeAndValidate(input: AlvaInquiryInput, requestMeta: AlvaInquiryRequestMeta) {
        const source = clean(input.source, 40) || (input.needs != null ? 'quote-widget' : 'b2b');
        const company = clean(input.company, 200);
        const contact = clean(input.contact ?? input.name, 200);
        const email = clean(input.email, 320).toLowerCase();
        const phone = clean(input.phone, 100);
        const message = clean(input.message ?? input.needs, 5000);
        const locale = clean(input.locale, 12);
        const pageUrl = clean(input.pageUrl ?? requestMeta.referer, 1000);
        const userAgent = clean(requestMeta.userAgent, 500);
        const metadataJson = safeJson({
            origin: clean(requestMeta.origin, 500),
            data: input.metadata && typeof input.metadata === 'object' ? input.metadata : undefined,
        });

        const missing: string[] = [];
        if (!message) missing.push('message');
        if (!phone && !email) missing.push('email or phone');
        if (source === 'b2b') {
            if (!contact) missing.push('contact');
            if (!email) missing.push('email');
            if (!phone) missing.push('phone');
        }
        if (missing.length) {
            throw new AlvaInquiryValidationError(`Please complete the required fields: ${missing.join(', ')}.`, missing);
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new AlvaInquiryValidationError('Please enter a valid email address.', ['email']);
        }

        return { source, company, contact, email, phone, message, locale, pageUrl, userAgent, metadataJson };
    }

    private async sendNotification(inquiry: AlvaInquiry): Promise<boolean> {
        const mailTransport = (process.env.MAIL_TRANSPORT || 'smtp').trim().toLowerCase();
        const host = process.env.SMTP_HOST?.trim();
        const user = process.env.SMTP_USER?.trim();
        const pass = process.env.SMTP_PASS?.trim();
        const recipients = (process.env.SALES_EMAIL || process.env.COMPANY_EMAIL || user || '')
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);

        if (!recipients.length) {
            throw new Error('SALES_EMAIL must be configured.');
        }

        const subject = `[${inquiry.reference}] ${inquiry.source === 'quote-widget' ? 'New quote request' : 'New website inquiry'}${inquiry.company ? ` — ${inquiry.company}` : ''}`;
        if (mailTransport === 'graph') {
            await sendMicrosoftGraphEmail({
                to: recipients,
                replyTo: inquiry.email || undefined,
                subject,
                text: this.renderText(inquiry),
                html: this.renderHtml(inquiry),
            });
            return true;
        }

        if (!host) {
            if (process.env.APP_ENV === 'production') {
                throw new Error('SMTP_HOST and SALES_EMAIL must be configured in production.');
            }
            this.logger.warn(`Inquiry ${inquiry.reference} saved without email notification because SMTP is not configured.`);
            return false;
        }

        const port = Number(process.env.SMTP_PORT || 587);
        const transporter = createTransport({
            host,
            port,
            secure: envBoolean('SMTP_SECURE', port === 465),
            auth: user ? { user, pass } : undefined,
        });
        const from = process.env.MAIL_FROM?.trim() || `"Alva Technology" <${user}>`;
        await transporter.sendMail({
            from,
            to: recipients,
            replyTo: inquiry.email || undefined,
            subject,
            text: this.renderText(inquiry),
            html: this.renderHtml(inquiry),
        });
        return true;
    }

    private renderText(inquiry: AlvaInquiry) {
        return [
            `Reference: ${inquiry.reference}`,
            `Source: ${inquiry.source}`,
            `Company: ${inquiry.company || '-'}`,
            `Contact: ${inquiry.contact || '-'}`,
            `Email: ${inquiry.email || '-'}`,
            `Phone: ${inquiry.phone || '-'}`,
            `Page: ${inquiry.pageUrl || '-'}`,
            '',
            inquiry.message,
        ].join('\n');
    }

    private renderHtml(inquiry: AlvaInquiry) {
        const row = (label: string, value: string) => `<tr><td style="padding:6px 16px 6px 0;color:#62746f;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value || '-')}</td></tr>`;
        return `<!doctype html><html><body style="margin:0;background:#f3f6f1;font:15px Arial,sans-serif;color:#102f29"><div style="max-width:640px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden"><div style="padding:24px 28px;background:#102f29;color:#fff"><strong>ALVA TECHNOLOGY</strong><div style="margin-top:6px;color:#c7df72">${escapeHtml(inquiry.reference)}</div></div><div style="padding:28px"><table style="border-collapse:collapse;width:100%">${row('Source', inquiry.source)}${row('Company', inquiry.company)}${row('Contact', inquiry.contact)}${row('Email', inquiry.email)}${row('Phone', inquiry.phone)}${row('Page', inquiry.pageUrl)}</table><div style="margin-top:22px;padding:18px;border:1px solid #dce5dc;border-radius:8px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</div></div></div></body></html>`;
    }

    private createReference() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10).replace(/-/g, '');
        const time = now.toISOString().slice(11, 19).replace(/:/g, '');
        const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
        return `ALVA-${date}-${time}-${suffix}`;
    }
}

export class AlvaInquiryValidationError extends Error {
    constructor(message: string, public readonly fields: string[]) {
        super(message);
    }
}

function clean(value: unknown, max: number): string {
    return String(value ?? '').trim().slice(0, max);
}

function safeJson(value: unknown): string {
    try {
        return JSON.stringify(value).slice(0, 10000);
    } catch {
        return '{}';
    }
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
}

function envBoolean(name: string, fallback: boolean): boolean {
    const value = process.env[name]?.trim().toLowerCase();
    if (!value) return fallback;
    return ['1', 'true', 'yes', 'on'].includes(value);
}

function clampInteger(value: number | null | undefined, min: number, max: number, fallback: number): number {
    if (!Number.isInteger(value)) return fallback;
    return Math.max(min, Math.min(max, Number(value)));
}

function normalizeStatus(value: string): AlvaInquiryStatus {
    const status = clean(value, 20).toUpperCase();
    if (!['NEW', 'CONTACTED', 'QUOTED', 'CLOSED'].includes(status)) {
        throw new AlvaInquiryValidationError('Invalid inquiry status.', ['status']);
    }
    return status as AlvaInquiryStatus;
}
