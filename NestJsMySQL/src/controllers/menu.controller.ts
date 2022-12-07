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
import { Menu } from "src/entities/menu.entity";
import { MenuService } from "src/services/menu.service";

@Controller("/menu")
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get("")
  fetchAll() {
    return this.menuService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const menu = await this.menuService.fetchOne(+id);

    if (!menu) throw new NotFoundException("Menu not found");

    return menu;
  }

  @Post()
  create(@Body() menu: Menu) {
    return this.menuService.create(menu);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() menu: Partial<Menu>) {
    const receivedMenu = await this.menuService.update(+id, menu);

    if (!receivedMenu) throw new NotFoundException("Menu not found");

    return receivedMenu;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedMenu = await this.menuService.delete(+id);

    if (!receivedMenu) throw new NotFoundException("Menu not found");

    return receivedMenu;
  }
}
