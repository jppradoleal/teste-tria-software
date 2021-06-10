import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  code: string;

  @Column({default: false})
  active: boolean;
  
  @Column({default: "common", enum: ["common", "rare", "ultrarare"], nullable: false})
  rarity: string;

  @CreateDateColumn()
  createdAt: Date;
}
