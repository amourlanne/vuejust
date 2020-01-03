import {MigrationInterface, QueryRunner} from "typeorm";

export class modifytoken1577300655150 implements MigrationInterface {
    name = 'modifytoken1577300655150'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `password_reset_tokens` CHANGE `valid` `used` tinyint NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` CHANGE `valid` `used` tinyint NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` CHANGE `used` `valid` tinyint NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `password_reset_tokens` CHANGE `used` `valid` tinyint NOT NULL", undefined);
    }

}
