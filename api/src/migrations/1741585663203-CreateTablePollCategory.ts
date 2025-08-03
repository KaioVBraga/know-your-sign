import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePollCategory1741585663203
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE poll_category (
        poll_id INT NOT NULL,
        category_id INT NOT NULL,

        PRIMARY KEY (poll_id, category_id),
        FOREIGN KEY (poll_id) REFERENCES poll (id),
        FOREIGN KEY (category_id) REFERENCES category (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE poll_category;`);
  }
}
