import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1575456511731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `images` (`id` varchar(36) NOT NULL, `path` varchar(255) NOT NULL, `originalName` varchar(255) NOT NULL, `fileName` varchar(255) NOT NULL, `mimeType` varchar(255) NOT NULL, `size` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('ROLE_ADMIN', 'ROLE_USER') NOT NULL DEFAULT 'ROLE_USER', `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `activated` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `avatarId` varchar(36) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), UNIQUE INDEX `REL_3e1f52ec904aed992472f2be14` (`avatarId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3e1f52ec904aed992472f2be147` FOREIGN KEY (`avatarId`) REFERENCES `images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3e1f52ec904aed992472f2be147`");
        await queryRunner.query("DROP INDEX `REL_3e1f52ec904aed992472f2be14` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `images`");
    }

}
