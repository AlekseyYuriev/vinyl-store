import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1715093147394 implements MigrationInterface {
    name = 'AddEntities1715093147394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_420cf6d31487d2f341b40d52e3" UNIQUE ("userId"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vinyls" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "authorName" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(5,2) NOT NULL, "image" character varying NOT NULL, "adminId" integer, CONSTRAINT "PK_309b6afad2f0f00e32f99a9bf79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthdate" character varying NOT NULL, "avatar" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "score" "public"."reviews_score_enum" NOT NULL, "userId" integer, "vinylId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_purchased_vinyls" ("vinylsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_778590988a18c54a052db2b5aad" PRIMARY KEY ("vinylsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6495adb14fefce305d9b07c02f" ON "user_purchased_vinyls" ("vinylsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9bad369345537fdd3588e125b" ON "user_purchased_vinyls" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "admins" ADD CONSTRAINT "FK_420cf6d31487d2f341b40d52e37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vinyls" ADD CONSTRAINT "FK_754392047d7faaba871f523598c" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_824ac8e8ce880d78453bbdca9cb" FOREIGN KEY ("vinylId") REFERENCES "vinyls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_purchased_vinyls" ADD CONSTRAINT "FK_6495adb14fefce305d9b07c02f2" FOREIGN KEY ("vinylsId") REFERENCES "vinyls"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_purchased_vinyls" ADD CONSTRAINT "FK_e9bad369345537fdd3588e125b0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_purchased_vinyls" DROP CONSTRAINT "FK_e9bad369345537fdd3588e125b0"`);
        await queryRunner.query(`ALTER TABLE "user_purchased_vinyls" DROP CONSTRAINT "FK_6495adb14fefce305d9b07c02f2"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_824ac8e8ce880d78453bbdca9cb"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "vinyls" DROP CONSTRAINT "FK_754392047d7faaba871f523598c"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP CONSTRAINT "FK_420cf6d31487d2f341b40d52e37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9bad369345537fdd3588e125b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6495adb14fefce305d9b07c02f"`);
        await queryRunner.query(`DROP TABLE "user_purchased_vinyls"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "vinyls"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
