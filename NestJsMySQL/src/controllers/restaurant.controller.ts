import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Restaurant } from "src/entities/restaurant.entity";
import { RestaurantService } from "src/services/restaurant.service";

@Controller("/restaurant")
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get("")
  fetchAll() {
    return this.restaurantService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const restaurant = await this.restaurantService.fetchOne(+id);

    if (!restaurant) throw new NotFoundException("Restaurant not found");

    return restaurant;
  }

  @Post()
  create(@Body() restaurant: Restaurant) {
    return this.restaurantService.create(restaurant);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() restaurant: Partial<Restaurant>) {
    const receivedRestaurant = await this.restaurantService.update(+id, restaurant);

    if (!receivedRestaurant) throw new NotFoundException("Restaurant not found");

    return receivedRestaurant;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedRestaurant = await this.restaurantService.delete(+id);

    if (!receivedRestaurant) throw new NotFoundException("Restaurant not found");

    return receivedRestaurant;
  }
}
