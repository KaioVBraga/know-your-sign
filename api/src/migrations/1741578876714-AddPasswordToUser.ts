import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUser1741578876714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        ALTER TABLE user 
          ADD COLUMN password VARCHAR(255) NULL AFTER email
        ;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      ALTER TABLE user 
        DROP COLUMN password
      ;
    `);
  }
}
