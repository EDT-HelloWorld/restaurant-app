import { MENU_LIST, ORDER_STATE } from '../utils/constant.js';

export class OrderController {
  constructor(restaurant, view) {
    this.restaurant = restaurant;
    this.view = view;
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
        order.setState(ORDER_STATE.COOKING);
        this.view.setUpdateOrderList(order);
        resolve(order);
      }
    });
  }

  // async getNextOrder() {
  //   const order = await this.restaurant.getNextOrder();
  //   if (order) {
  //     order.setState(ORDER_STATE.COOKING);
  //     this.view.setUpdateOrderList(order);

  //     const chef = await this.CookController.findAvailable(order);
  //     await chef.cook(order);

  //     this.view.setUpdateOrderList(order);
  //     const server = await this.ServerController.findAvailable(order);
  //     await server.serve(order);

  //     this.view.doneServer(order);
  //   }
  // }
}
