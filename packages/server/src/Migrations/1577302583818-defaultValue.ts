import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultValue1577302583818 implements MigrationInterface {
    name = 'defaultValue1577302583818'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `password_reset_tokens` CHANGE `used` `used` tinyint NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` CHANGE `used` `used` tinyint NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` CHANGE `used` `used` tinyint NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `password_reset_tokens` CHANGE `used` `used` tinyint NOT NULL", undefined);
    }

}
