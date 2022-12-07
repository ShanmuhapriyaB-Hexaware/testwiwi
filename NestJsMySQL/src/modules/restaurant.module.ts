import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantController } from "src/controllers/restaurant.controller";
import { Restaurant } from "src/entities/restaurant.entity";
import { RestaurantService } from "src/services/restaurant.service";

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
