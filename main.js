import { ServerController } from "./src/controller/ServerController.js";
import { Restaurant } from "./src/model/Restaurant.js";
import {
  CHEF_STATE,
  MENU_LIST,
  ORDER_STATE,
  SERVER_STATE,
} from "./src/utils/constant.js";
import { View } from "./src/view/View.js";

class Main {
  #restaurant;
  #view;

  constructor() {
    this.#view = new View();
    this.#restaurant = new Restaurant();

    this.ServerController = new ServerController(this.#restaurant, this.#view);

    this.controllerArray = [this.ServerController];
  }

  initializeSimulation() {
    this.#view.setClickOrder(this.handleOrderButtonClick.bind(this));
    this.setPrepareOpen();
    this.controllerArray.forEach((controller) => controller.setPrepareOpen());
  }

  setPrepareOpen() {
    this.setMenuButton();
    this.setChefs();
  }

  setChefs() {
    for (let chef of this.#restaurant.getChefs()) {
      this.#view.setAddChef(chef.getId(), chef.getName());
      this.#restaurant.setAvailableChefs(chef);
    }
  }

  findAvailableChef() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.#restaurant.isAvailableChefs() === false) {
          clearInterval(timerId);
          const chef = this.#restaurant.getAvailableChef();
          resolve(chef);
        }
      }, 500);
    });
  }

  startSimulation() {
    setTimeout(async () => {
      const chef = await this.findAvailableChef();
      const order = await this.getNextOrder();
      order.setState(ORDER_STATE.COOKING);
      this.#view.setUpdateOrderList(order);
      chef.setOrder(order);
      chef.setState(CHEF_STATE.COOKING);
      this.#view.setUpdateChef(chef);

      await chef.cook(order);

      order.setState(ORDER_STATE.COOKED);
      this.#restaurant.returnChef(chef);
      this.#view.setUpdateChef(chef);
      this.#view.setAddServer(order);
      this.#view.deleteOrder(order);
      this.#restaurant.addServe(order);

      const server = await this.ServerController.findAvailable();

      order.setState(ORDER_STATE.SERVING);
      server.setOrder(order);
      server.setState(SERVER_STATE.WAITING);
      this.#view.setUpdateServer(server);

      await server.serve(order);

      order.setState(ORDER_STATE.DONE);
      server.setState(SERVER_STATE.WAITING);
      this.ServerController.returnServer(server);
      this.#view.setUpdateServer(server);
      server.setOrder(null);
      this.#view.doneServer(order);
    }, 100);
  }

  handleOrderButtonClick(menuName) {
    const order = this.#restaurant.addOrder(menuName);
    this.#view.setAddOrder(order);
    this.startSimulation();
  }

  isOrderEmpty() {
    return this.#restaurant.isOrderEmpty();
  }

  setMenuButton() {
    for (let [key, menuInfo] of Object.entries(MENU_LIST)) {
      this.#view.setAddMenu(key, menuInfo);
    }
  }

  getNextOrder() {
    return new Promise((resolve) => {
      const order = this.#restaurant.getNextOrder();
      if (order) {
        resolve(order);
      }
    });
  }
}

const main = new Main();
main.initializeSimulation();
