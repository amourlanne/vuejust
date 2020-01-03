import {MigrationInterface, QueryRunner} from "typeorm";

export class nullablePassword1577299516622 implements MigrationInterface {
    name = 'nullablePassword1577299516622'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `password` `password` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `password` `password` varchar(255) NOT NULL", undefined);
    }

}
