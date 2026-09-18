import { EmailDetails, EmailSender } from '@vendure/email-plugin';

type GraphMailInput = {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    cc?: string | string[];
    bcc?: string | string[];
};

type CachedToken = {
    value: string;
    expiresAt: number;
};

let cachedToken: CachedToken | undefined;

export class MicrosoftGraphEmailSender implements EmailSender {
    async send(email: EmailDetails): Promise<void> {
        if (email.attachments.length) {
            throw new Error('Microsoft Graph email attachments are not configured for this deployment.');
        }
        await sendMicrosoftGraphEmail({
            to: email.recipient,
            cc: email.cc,
            bcc: email.bcc,
            replyTo: email.replyTo,
            subject: email.subject,
            html: email.body,
        });
    }
}

export function validateMicrosoftGraphMailConfig(): void {
    requiredMailEnv('MICROSOFT_TENANT_ID');
    requiredMailEnv('MICROSOFT_CLIENT_ID');
    requiredMailEnv('MICROSOFT_CLIENT_SECRET');
    requiredMailEnv('MAIL_FROM_ADDRESS');
}

export async function sendMicrosoftGraphEmail(input: GraphMailInput): Promise<void> {
    validateMicrosoftGraphMailConfig();
    const fromAddress = requiredMailEnv('MAIL_FROM_ADDRESS');
    const token = await getAccessToken();
    const response = await fetch(
        `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromAddress)}/sendMail`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: {
                    subject: input.subject,
                    body: {
                        contentType: input.html ? 'HTML' : 'Text',
                        content: input.html || input.text || '',
                    },
                    toRecipients: recipients(input.to),
                    ccRecipients: recipients(input.cc),
                    bccRecipients: recipients(input.bcc),
                    replyTo: recipients(input.replyTo),
                },
                saveToSentItems: true,
            }),
        },
    );

    if (!response.ok) {
        const details = (await response.text()).slice(0, 1500);
        throw new Error(`Microsoft Graph sendMail failed (${response.status}): ${details}`);
    }
}

async function getAccessToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
        return cachedToken.value;
    }

    const tenantId = requiredMailEnv('MICROSOFT_TENANT_ID');
    const body = new URLSearchParams({
        client_id: requiredMailEnv('MICROSOFT_CLIENT_ID'),
        client_secret: requiredMailEnv('MICROSOFT_CLIENT_SECRET'),
        grant_type: 'client_credentials',
        scope: 'https://graph.microsoft.com/.default',
    });
    const response = await fetch(
        `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        },
    );
    const payload = await response.json() as {
        access_token?: string;
        expires_in?: number;
        error_description?: string;
    };
    if (!response.ok || !payload.access_token) {
        throw new Error(
            `Microsoft identity token request failed (${response.status}): ${payload.error_description || 'No access token returned.'}`,
        );
    }
    cachedToken = {
        value: payload.access_token,
        expiresAt: Date.now() + Math.max(60, payload.expires_in || 3600) * 1000,
    };
    return cachedToken.value;
}

function recipients(value?: string | string[]): Array<{ emailAddress: { address: string } }> {
    const values = Array.isArray(value) ? value : String(value || '').split(',');
    return values
        .map(item => extractEmail(item))
        .filter(Boolean)
        .map(address => ({ emailAddress: { address } }));
}

function extractEmail(value: string): string {
    const trimmed = value.trim();
    const bracketed = trimmed.match(/<([^>]+)>/);
    return (bracketed?.[1] || trimmed).trim();
}

function requiredMailEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required Microsoft Graph mail setting ${name}.`);
    }
    return value;
}
