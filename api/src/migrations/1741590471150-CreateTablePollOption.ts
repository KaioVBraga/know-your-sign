import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePollOption1741590471150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE poll_option (
        id INT NOT NULL AUTO_INCREMENT,
        poll_id INT NOT NULL,
        content TEXT NOT NULL,

        create_user VARCHAR(50),
        create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_user VARCHAR(50),
        update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (id),
        FOREIGN KEY (poll_id) REFERENCES poll (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE poll_option;`);
  }
}
