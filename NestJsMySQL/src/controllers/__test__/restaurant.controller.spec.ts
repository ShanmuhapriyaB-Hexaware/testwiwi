import { Test } from "@nestjs/testing";
import { RestaurantService } from "src/services/restaurant.service";
import { RestaurantController } from "src/controllers/restaurant.controller";
import { Restaurant } from "src/entities/restaurant.entity";

describe("RestaurantController", () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  const singleRestaurant = {
    id: 1,
    resname: "rapidx",
    resid: "rapidx",
    menu: "rapidx",
  } as Restaurant;

  const multipleRestaurants = [
    {
      id: 1,
      resname: "rapidx",
      resid: "rapidx",
      menu: "rapidx",
    },
  ] as Restaurant[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleRestaurants),
      fetchOne: (id: number) => Promise.resolve(singleRestaurant),
      create: (restaurant: Restaurant) => Promise.resolve(restaurant),
      delete: (id: number) => Promise.resolve(singleRestaurant),
      update: (id: number, restaurant: Partial<Restaurant>) => Promise.resolve(restaurant),
    };

    const module = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(RestaurantController);
    service = module.get(RestaurantService);
  });

  describe("fetchAll", () => {
    it("should fetch all restaurants", async () => {
      const restaurants = await controller.fetchAll();
      expect(restaurants.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one restaurant for the given id", async () => {
      const restaurant = await controller.fetchOne("1");
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
  });

  describe("Create restaurant", () => {
    it("should create a restaurant", async () => {
      const restaurant = await controller.create(singleRestaurant);
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
  });

  describe("Update restaurant", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, restaurant: Partial<Restaurant>) => Promise.resolve(null);
      await expect(controller.update("1", singleRestaurant)).rejects.toThrow();
    });

    it("should return one restaurant for the given id", async () => {
      const restaurant = await controller.update("1", singleRestaurant);
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
  });

  describe("Delete restaurant", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one restaurant for the given id", async () => {
      const restaurant = await controller.delete("1");
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
  });
});
