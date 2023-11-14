import { MENU_LIST, STATE } from "../utils/constant.js";

export class OrderController {
  constructor(restaurant, view) {
    this.restaurant = restaurant;
    this.view = view;
  }

  triggerEvent() {
    this.view.setClickOrder(this.restaurant.addOrder.bind(this.restaurant));
  }

  setPrepareOpen() {
    for (let [key, menuInfo] of Object.entries(MENU_LIST)) {
      this.view.setAddMenu(key, menuInfo);
    }
    this.triggerEvent();
  }

  getNextOrder() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        const order = this.restaurant.getNextOrder();
        if (order) {
          clearInterval(timerId);
          order.getFood().setState(STATE.COOKING);
          this.view.setUpdataOrderList(order);
          resolve(order);
        }
      }, 100);
    });
  }
}
