import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddAlvaInquiry1758096000000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        const isPostgres = queryRunner.connection.options.type === 'postgres';
        const timestampType = isPostgres ? 'timestamp without time zone' : 'datetime';
        await queryRunner.createTable(new Table({
            name: 'alva_inquiry',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'createdAt', type: timestampType, default: isPostgres ? 'now()' : "(datetime('now'))" },
                { name: 'updatedAt', type: timestampType, default: isPostgres ? 'now()' : "(datetime('now'))" },
                { name: 'reference', type: 'varchar', length: '40', isUnique: true },
                { name: 'source', type: 'varchar', length: '40' },
                { name: 'status', type: 'varchar', length: '20', default: "'NEW'" },
                { name: 'company', type: 'varchar', length: '200', default: "''" },
                { name: 'contact', type: 'varchar', length: '200', default: "''" },
                { name: 'email', type: 'varchar', length: '320', default: "''" },
                { name: 'phone', type: 'varchar', length: '100', default: "''" },
                { name: 'message', type: 'text' },
                { name: 'locale', type: 'varchar', length: '12', default: "''" },
                { name: 'pageUrl', type: 'varchar', length: '1000', default: "''" },
                { name: 'userAgent', type: 'varchar', length: '500', default: "''" },
                { name: 'metadataJson', type: 'text', default: "'{}'" },
                { name: 'notificationStatus', type: 'varchar', length: '20', default: "'PENDING'" },
                { name: 'notificationError', type: 'text', default: "''" },
                { name: 'notifiedAt', type: timestampType, isNullable: true },
            ],
            indices: [
                { name: 'IDX_alva_inquiry_source', columnNames: ['source'] },
                { name: 'IDX_alva_inquiry_status', columnNames: ['status'] },
            ],
        }), true);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('alva_inquiry', true);
    }
}
