import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePollVote1741600235274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE poll_vote (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        poll_id INT NOT NULL,
        poll_option_id INT NOT NULL,

        create_user VARCHAR(50),
        create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_user VARCHAR(50),
        update_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (id),
        CONSTRAINT UQ_poll_vote_user_id_poll_id UNIQUE(user_id, poll_id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (poll_id) REFERENCES poll (id),
        FOREIGN KEY (poll_option_id) REFERENCES poll_option (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE poll_vote;`);
  }
}
