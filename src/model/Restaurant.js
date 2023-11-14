import { OrderController } from "../controller/OrderController.js";
import { View } from "../view/View.js";

export class Restaurant {
  #name;

  constructor(name) {
    this.#name = name;
    this.view = new View();
    this.OrderController = new OrderController();
    this.triggerEvent();
  }

  getName() {
    return this.#name;
  }

  triggerEvent() {
    this.view.setClickOrder(this.addOrder.bind(this));
  }

  addOrder(menuName) {
    console.log(menuName);
  }

  start() {
    console.log(`${this.#name} RestaurantApp is started`);
  }
}
