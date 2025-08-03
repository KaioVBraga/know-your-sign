import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1741219681294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        CREATE TABLE category (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL,

          create_user VARCHAR(50),
          create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_user VARCHAR(50),
          update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

          PRIMARY KEY (id),
          CONSTRAINT UQ_category_slug UNIQUE(slug)
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE category;`);
  }
}
