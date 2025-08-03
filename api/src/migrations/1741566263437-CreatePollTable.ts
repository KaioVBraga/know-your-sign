import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePollTable1741566263437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE poll (
        id INT NOT NULL AUTO_INCREMENT,
        content TEXT NOT NULL,
        slug VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,

        create_user VARCHAR(50),
        create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_user VARCHAR(50),
        update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (id),
        CONSTRAINT UQ_poll_slug UNIQUE(slug),
        FOREIGN KEY (user_id) REFERENCES user (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE poll;`);
  }
}
