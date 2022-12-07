import { Menu } from "src/entities/menu.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MenuService } from "src/services/menu.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("MenuService", () => {
  let service: MenuService;
  let repo: Repository<Menu>;

  const singleMenu = {
    id: 1,
    item: 81,
    itemid: "rapidx",
    itemprice: "rapidx",
  } as Menu;

  const multipleMenus = [
    {
      id: 1,
      item: 81,
      itemid: "rapidx",
      itemprice: "rapidx",
    },
  ] as Menu[];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multipleMenus),
      findOne: (id: number) => Promise.resolve(singleMenu),
      save: (menu: Menu) => Promise.resolve(menu),
      create: (menu: Menu) => menu,
      remove: (menu: Menu) => Promise.resolve(menu),
    };

    const module = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: getRepositoryToken(Menu),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(MenuService);
    repo = module.get(getRepositoryToken(Menu));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all menus from database", async () => {
      const menus = await service.fetchAll();
      expect(menus.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one menu from the database", async () => {
      const menu = await service.fetchOne(1);
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
    it("should fetch no menus from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const menu = await service.fetchOne(1);
      expect(menu).toBeNull();
    });
  });

  describe("Create menu", () => {
    it("should create the menu of the specified values", async () => {
      const menu = await service.create(singleMenu);
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
  });

  describe("Update menu", () => {
    it("should return null when menu is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const menu = await service.update(1, {});
      expect(menu).toBeNull();
    });

    it("should update the menu of the specified id", async () => {
      const menu = await service.update(1, singleMenu);
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
  });

  describe("Delete menu", () => {
    it("should return null when menu is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const menu = await service.delete(1);
      expect(menu).toBeNull();
    });

    it("should delete the menu of the specified id", async () => {
      const menu = await service.delete(1);
      expect(menu.id).toEqual(1);
    });
  });
});
