import { MigrationInterface, QueryRunner } from "typeorm";

export class Usuarios1746734056877 implements MigrationInterface {
    name = 'Usuarios1746734056877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
