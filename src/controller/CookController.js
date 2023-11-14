import { STATE } from "../utils/constant.js";

export class CookController {
  constructor(restaurant, view) {
    this.restaurant = restaurant;
    this.view = view;
    this.availableChefs = [];
  }

  setPrepareOpen() {
    for (let chef of this.restaurant.getChefs()) {
      this.view.setAddChef(chef.getId(), chef.getName());
      this.availableChefs.push(chef);
    }
  }

  findAvailable(order) {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.availableChefs.length > 0) {
          clearInterval(timerId);
          const chef = this.#getAvailableChef();
          chef.setState(STATE.COOKING);
          chef.setOrder(order);
          this.view.setUpdateChef(chef);
          resolve(chef);
        }
      }, 100);
    });
  }

  #getAvailableChef() {
    return this.availableChefs.shift();
  }

  returnChef(chef) {
    this.availableChefs.push(chef);
  }
}
