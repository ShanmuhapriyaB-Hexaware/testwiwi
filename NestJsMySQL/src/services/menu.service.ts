import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Menu } from "src/entities/menu.entity";
import { Repository } from "typeorm";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
  ) {}

  fetchAll() {
    return this.menuRepo.find();
  }

  fetchOne(id: number) {
    return this.menuRepo.findOne({
      where: { id },
    });
  }

  create(menu: Menu) {
    const newMenu = this.menuRepo.create(menu);
    return this.menuRepo.save(newMenu);
  }

  async update(id: number, attrs: Partial<Menu>) {
    const menu = await this.fetchOne(id);

    if (!menu) {
      return null;
    }

    Object.assign(menu, attrs);
    return this.menuRepo.save(menu);
  }

  async delete(id: number) {
    const menu = await this.fetchOne(id);

    if (!menu) {
      return null;
    }

    return this.menuRepo.remove(menu);
  }
}
