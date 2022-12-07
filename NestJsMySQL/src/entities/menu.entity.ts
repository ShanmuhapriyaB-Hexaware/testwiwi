import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  item: number;

  @Column()
  itemid: string;

  @Column()
  itemprice: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.menu, { cascade: true })
  restomenus: Restaurant[];

}
