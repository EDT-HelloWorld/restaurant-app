import { ORDER_STATE, CHEF_STATE } from '../utils/constant.js';

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

  findAvailable() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.availableChefs.length > 0) {
          clearInterval(timerId);
          const chef = this.#getAvailableChef();
          resolve(chef);
        }
      }, 500);
    });
  }

  #getAvailableChef() {
    return this.availableChefs.shift();
  }

  returnChef(chef) {
    chef.setState(CHEF_STATE.WAITING);
    chef.setOrder(null);
    this.availableChefs.push(chef);
  }
}
