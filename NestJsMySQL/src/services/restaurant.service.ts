import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "src/entities/restaurant.entity";
import { Repository } from "typeorm";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  fetchAll() {
    return this.restaurantRepo.find();
  }

  fetchOne(id: number) {
    return this.restaurantRepo.findOne({
      where: { id },
    });
  }

  create(restaurant: Restaurant) {
    const newRestaurant = this.restaurantRepo.create(restaurant);
    return this.restaurantRepo.save(newRestaurant);
  }

  async update(id: number, attrs: Partial<Restaurant>) {
    const restaurant = await this.fetchOne(id);

    if (!restaurant) {
      return null;
    }

    Object.assign(restaurant, attrs);
    return this.restaurantRepo.save(restaurant);
  }

  async delete(id: number) {
    const restaurant = await this.fetchOne(id);

    if (!restaurant) {
      return null;
    }

    return this.restaurantRepo.remove(restaurant);
  }
}
