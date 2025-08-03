import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1741214087518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE user (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        nick_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'A',

        create_user VARCHAR(50),
        create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_user VARCHAR(50),
        update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (id)
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE user;`);
  }
}
