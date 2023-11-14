import { MENU_LIST } from '../utils/constant.js';

export class Food {
  #name;
  #cookTime;

  constructor(menuName) {
    this.#name = MENU_LIST[menuName].name;
    this.#cookTime = MENU_LIST[menuName].cookTime;
  }

  getName() {
    return this.#name;
  }

  getCookTime() {
    return this.#cookTime;
  }
}
