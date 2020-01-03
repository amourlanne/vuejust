import {MigrationInterface, QueryRunner} from "typeorm";

export class addAuthToken1577296684635 implements MigrationInterface {
    name = 'addAuthToken1577296684635'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `password_reset_tokens` (`id` int NOT NULL AUTO_INCREMENT, `value` varchar(255) NOT NULL, `valid` tinyint NOT NULL, `expiredAt` datetime NOT NULL, `userId` varchar(36) NULL, UNIQUE INDEX `IDX_e7e75688e44248ab956ce370de` (`value`), UNIQUE INDEX `IDX_d6a19d4b4f6c62dcd29daa497e` (`userId`), UNIQUE INDEX `REL_d6a19d4b4f6c62dcd29daa497e` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `account_confirmation_tokens` (`id` int NOT NULL AUTO_INCREMENT, `value` varchar(255) NOT NULL, `valid` tinyint NOT NULL, `expiredAt` datetime NOT NULL, `userId` varchar(36) NULL, UNIQUE INDEX `IDX_654f6e98bedb648d4247a5dd56` (`value`), UNIQUE INDEX `IDX_86953bd4a3058bdb55485c64e5` (`userId`), UNIQUE INDEX `REL_86953bd4a3058bdb55485c64e5` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `FK_d6a19d4b4f6c62dcd29daa497e2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` ADD CONSTRAINT `FK_86953bd4a3058bdb55485c64e5f` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account_confirmation_tokens` DROP FOREIGN KEY `FK_86953bd4a3058bdb55485c64e5f`", undefined);
        await queryRunner.query("ALTER TABLE `password_reset_tokens` DROP FOREIGN KEY `FK_d6a19d4b4f6c62dcd29daa497e2`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("DROP INDEX `REL_86953bd4a3058bdb55485c64e5` ON `account_confirmation_tokens`", undefined);
        await queryRunner.query("DROP INDEX `IDX_86953bd4a3058bdb55485c64e5` ON `account_confirmation_tokens`", undefined);
        await queryRunner.query("DROP INDEX `IDX_654f6e98bedb648d4247a5dd56` ON `account_confirmation_tokens`", undefined);
        await queryRunner.query("DROP TABLE `account_confirmation_tokens`", undefined);
        await queryRunner.query("DROP INDEX `REL_d6a19d4b4f6c62dcd29daa497e` ON `password_reset_tokens`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d6a19d4b4f6c62dcd29daa497e` ON `password_reset_tokens`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e7e75688e44248ab956ce370de` ON `password_reset_tokens`", undefined);
        await queryRunner.query("DROP TABLE `password_reset_tokens`", undefined);
    }

}
