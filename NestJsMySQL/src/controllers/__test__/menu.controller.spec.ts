import { Test } from "@nestjs/testing";
import { MenuService } from "src/services/menu.service";
import { MenuController } from "src/controllers/menu.controller";
import { Menu } from "src/entities/menu.entity";

describe("MenuController", () => {
  let controller: MenuController;
  let service: MenuService;

  const singleMenu = {
    id: 1,
    item: 24,
    itemid: "rapidx",
    itemprice: "rapidx",
  } as Menu;

  const multipleMenus = [
    {
      id: 1,
      item: 24,
      itemid: "rapidx",
      itemprice: "rapidx",
    },
  ] as Menu[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleMenus),
      fetchOne: (id: number) => Promise.resolve(singleMenu),
      create: (menu: Menu) => Promise.resolve(menu),
      delete: (id: number) => Promise.resolve(singleMenu),
      update: (id: number, menu: Partial<Menu>) => Promise.resolve(menu),
    };

    const module = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        {
          provide: MenuService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(MenuController);
    service = module.get(MenuService);
  });

  describe("fetchAll", () => {
    it("should fetch all menus", async () => {
      const menus = await controller.fetchAll();
      expect(menus.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one menu for the given id", async () => {
      const menu = await controller.fetchOne("1");
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
  });

  describe("Create menu", () => {
    it("should create a menu", async () => {
      const menu = await controller.create(singleMenu);
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
  });

  describe("Update menu", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, menu: Partial<Menu>) => Promise.resolve(null);
      await expect(controller.update("1", singleMenu)).rejects.toThrow();
    });

    it("should return one menu for the given id", async () => {
      const menu = await controller.update("1", singleMenu);
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
  });

  describe("Delete menu", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one menu for the given id", async () => {
      const menu = await controller.delete("1");
      expect(menu.item).toEqual(singleMenu.item);
      expect(menu.itemid).toEqual(singleMenu.itemid);
      expect(menu.itemprice).toEqual(singleMenu.itemprice);
    });
  });
});
