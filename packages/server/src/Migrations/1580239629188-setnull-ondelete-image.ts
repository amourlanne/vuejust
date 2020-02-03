import {MigrationInterface, QueryRunner} from "typeorm";

export class setnullOndeleteImage1580239629188 implements MigrationInterface {
    name = 'setnullOndeleteImage1580239629188'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3e1f52ec904aed992472f2be147`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3e1f52ec904aed992472f2be147` FOREIGN KEY (`avatarId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3e1f52ec904aed992472f2be147`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3e1f52ec904aed992472f2be147` FOREIGN KEY (`avatarId`) REFERENCES `images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
