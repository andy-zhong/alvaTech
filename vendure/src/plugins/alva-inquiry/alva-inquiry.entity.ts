import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity, Index } from 'typeorm';

export type AlvaInquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED';
export type AlvaNotificationStatus = 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED';

@Entity('alva_inquiry')
export class AlvaInquiry extends VendureEntity {
    constructor(input?: DeepPartial<AlvaInquiry>) {
        super(input);
    }

    @Index({ unique: true })
    @Column({ length: 40 })
    reference: string;

    @Index('IDX_alva_inquiry_source')
    @Column({ length: 40 })
    source: string;

    @Index('IDX_alva_inquiry_status')
    @Column({ length: 20, default: 'NEW' })
    status: AlvaInquiryStatus;

    @Column({ length: 200, default: '' })
    company: string;

    @Column({ length: 200, default: '' })
    contact: string;

    @Column({ length: 320, default: '' })
    email: string;

    @Column({ length: 100, default: '' })
    phone: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ length: 12, default: '' })
    locale: string;

    @Column({ length: 1000, default: '' })
    pageUrl: string;

    @Column({ length: 500, default: '' })
    userAgent: string;

    @Column({ type: 'text', default: '{}' })
    metadataJson: string;

    @Column({ length: 20, default: 'PENDING' })
    notificationStatus: AlvaNotificationStatus;

    @Column({ type: 'text', default: '' })
    notificationError: string;

    @Column({ nullable: true })
    notifiedAt: Date;
}
