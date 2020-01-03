import {MigrationInterface, QueryRunner} from "typeorm";

export class modifytoken1577301106167 implements MigrationInterface {
    name = 'modifytoken1577301106167'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` DROP COLUMN `expiredAt`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` ADD `expiredAt` datetime NOT NULL", undefined);
    }

}
