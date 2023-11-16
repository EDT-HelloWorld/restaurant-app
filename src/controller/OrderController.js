import { MENU_LIST } from "../utils/constant.js";

export class OrderController {
  constructor(restaurant, view) {
    this.restaurant = restaurant;
    this.view = view;
  }

  isOrderEmpty() {
    return this.restaurant.isOrderEmpty();
  }

  setPrepareOpen() {
    for (let [key, menuInfo] of Object.entries(MENU_LIST)) {
      this.view.setAddMenu(key, menuInfo);
    }
  }

  getNextOrder() {
    return new Promise((resolve) => {
      const order = this.restaurant.getNextOrder();
      if (order) {
        resolve(order);
      }
    });
  }
}
