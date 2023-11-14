import { STATE, MENU_LIST } from "../utils/constant.js";

export class Food {
  #name;
  #cookTime;
  #state;
  #Timer;

  constructor(menuName) {
    this.#name = MENU_LIST[menuName].name;
    this.#cookTime = MENU_LIST[menuName].cookTime;
    this.#state = STATE.WAITING;
  }

  getName() {
    return this.#name;
  }

  getState() {
    return this.#state;
  }

  getCookTime() {
    return this.#cookTime * 1000;
  }

  setState(state) {
    this.#state = state;
  }

  startCooking() {
    console.log(`${this.#name} 요리를 시작합니다.`);
    this.#state = STATE.COOKING;
    this.#Timer = setTimeout(() => {
      console.log(`${this.#name} 요리가 끝났습니다.`);
    }, this.#cookTime * 1000);
  }

  stopCooking() {
    clearTimeout(this.#Timer);
    this.#state = STATE.DONE;
  }
}
