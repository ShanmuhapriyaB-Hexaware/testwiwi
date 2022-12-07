import { Restaurant } from "src/entities/restaurant.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RestaurantService } from "src/services/restaurant.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("RestaurantService", () => {
  let service: RestaurantService;
  let repo: Repository<Restaurant>;

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
    const mockRepo = {
      find: () => Promise.resolve(multipleRestaurants),
      findOne: (id: number) => Promise.resolve(singleRestaurant),
      save: (restaurant: Restaurant) => Promise.resolve(restaurant),
      create: (restaurant: Restaurant) => restaurant,
      remove: (restaurant: Restaurant) => Promise.resolve(restaurant),
    };

    const module = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(Restaurant),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(RestaurantService);
    repo = module.get(getRepositoryToken(Restaurant));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all restaurants from database", async () => {
      const restaurants = await service.fetchAll();
      expect(restaurants.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one restaurant from the database", async () => {
      const restaurant = await service.fetchOne(1);
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
    it("should fetch no restaurants from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const restaurant = await service.fetchOne(1);
      expect(restaurant).toBeNull();
    });
  });

  describe("Create restaurant", () => {
    it("should create the restaurant of the specified values", async () => {
      const restaurant = await service.create(singleRestaurant);
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
  });

  describe("Update restaurant", () => {
    it("should return null when restaurant is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const restaurant = await service.update(1, {});
      expect(restaurant).toBeNull();
    });

    it("should update the restaurant of the specified id", async () => {
      const restaurant = await service.update(1, singleRestaurant);
      expect(restaurant.resname).toEqual(singleRestaurant.resname);
      expect(restaurant.resid).toEqual(singleRestaurant.resid);
      expect(restaurant.menu).toEqual(singleRestaurant.menu);
    });
  });

  describe("Delete restaurant", () => {
    it("should return null when restaurant is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const restaurant = await service.delete(1);
      expect(restaurant).toBeNull();
    });

    it("should delete the restaurant of the specified id", async () => {
      const restaurant = await service.delete(1);
      expect(restaurant.id).toEqual(1);
    });
  });
});
