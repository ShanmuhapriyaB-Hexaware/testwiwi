import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuController } from "src/controllers/menu.controller";
import { Menu } from "src/entities/menu.entity";
import { MenuService } from "src/services/menu.service";

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
