import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Menu } from "./menu.entity";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  resname: string;

  @Column()
  resid: string;

  @Column()
  menu: string;

  @ManyToOne(() => Menu, (menu) => menu.restaurants)
  menu: Menu;

}
