import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { Coupon } from "../entity/Coupon";

export class coupon1623322272662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn("Coupon", new TableColumn({name: "rarity", default: "common", enum: ["common", "rare", "ultrarare"], isNullable: false, type: "string"}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn("Coupon", "rarity")
    }

}
