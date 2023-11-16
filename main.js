import { Restaurant } from './src/model/Restaurant.js';
import {
  CHEF_STATE,
  MENU_LIST,
  ORDER_STATE,
  SERVER_STATE,
} from './src/utils/constant.js';
import { View } from './src/view/View.js';

class Main {
  #restaurant;
  #view;

  constructor() {
    this.#view = new View();
    this.#restaurant = new Restaurant();
    this.#restaurant.init();
  }

  initializeSimulation() {
    this.#view.setClickOrder(this.handleOrderButtonClick.bind(this));
    this.setPrepareOpen();
  }

  setPrepareOpen() {
    this.setMenuButton();
    this.setChefs();
    this.setServer();
  }

  setChefs() {
    for (let chef of this.#restaurant.getTotalWorkingChefs()) {
      this.#view.setAddChef(chef.getId(), chef.getName());
      this.#restaurant.setAvailableChefs(chef);
    }
  }

  setServer() {
    for (let server of this.#restaurant.getTotalWorkingServers()) {
      this.#restaurant.setAvailableServers(server);
    }
  }

  findAvailableServer() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.#restaurant.isAvailableServer() === true) {
          clearInterval(timerId);
          const server = this.#restaurant.getAvailableServer();
          resolve(server);
        }
      }, 130);
    });
  }

  findAvailableChef() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        if (this.#restaurant.isAvailableChef() === true) {
          clearInterval(timerId);
          const chef = this.#restaurant.getAvailableChef();
          resolve(chef);
        }
      }, 500);
    });
  }

  async startSimulation() {
    const chef = await this.findAvailableChef();
    const order = await this.getNextOrder();
    order.setState(ORDER_STATE.COOKING);
    this.#view.setUpdateOrderList(order);
    chef.setOrder(order);
    chef.setState(CHEF_STATE.COOKING);
    this.#view.setUpdateChef(chef);

    await chef.cook();

    order.setState(ORDER_STATE.COOKED);
    this.#restaurant.returnChef(chef);
    this.#view.setUpdateChef(chef);
    this.#view.setAddServer(order);
    this.#view.deleteOrder(order);
    this.#restaurant.addServe(order);

    const server = await this.findAvailableServer();
    const cookedOrder = await this.#restaurant.getNextServe();

    cookedOrder.setState(ORDER_STATE.SERVING);
    server.setOrder(cookedOrder);
    server.setState(SERVER_STATE.WAITING);
    this.#view.setUpdateServer(server);

    await server.serve();

    cookedOrder.setState(ORDER_STATE.DONE);
    server.setState(SERVER_STATE.WAITING);
    this.#restaurant.returnServer(server);
    this.#view.setUpdateServer(server);
    server.setOrder(null);
    this.#view.doneServer(cookedOrder);
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
