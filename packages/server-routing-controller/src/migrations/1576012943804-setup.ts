import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1576012943804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('ROLE_ADMIN', 'ROLE_USER') NOT NULL DEFAULT 'ROLE_USER', `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `activated` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `images` (`id` varchar(36) NOT NULL, `path` varchar(255) NOT NULL, `originalName` varchar(255) NOT NULL, `fileName` varchar(255) NOT NULL, `mimeType` varchar(255) NOT NULL, `size` int NOT NULL, `userId` varchar(36) NULL, UNIQUE INDEX `REL_96514329909c945f10974aff5f` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `images` ADD CONSTRAINT `FK_96514329909c945f10974aff5f8` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `images` DROP FOREIGN KEY `FK_96514329909c945f10974aff5f8`");
        await queryRunner.query("DROP INDEX `REL_96514329909c945f10974aff5f` ON `images`");
        await queryRunner.query("DROP TABLE `images`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
