import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePoll1741648074137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      alter table poll modify column image varchar(1000) null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      alter table poll modify column image varchar(255) null;
    `);
  }
}
