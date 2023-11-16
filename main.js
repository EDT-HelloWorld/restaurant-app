import { Chef } from './src/model/Chef.js';
import { Order } from './src/model/Order.js';
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

  init() {
    this.#view.setClickOrder(this.handleOrderButtonClick.bind(this));
    this.setPrepareOpen();
  }

  setPrepareOpen() {
    this.setMenuButton();
    this.setChefs();
    this.setServer();
  }

  async startSimulation() {
    const chef = await this.findAvailableChef();
    let order = await this.getNextOrder();

    this.onCooking(chef, order);

    this.randerUpdateOrderList(order);
    this.randerUpdateChef(chef);

    order = await chef.cook();

    order.setState(ORDER_STATE.COOKED);
    this.#restaurant.returnChef(chef);
    this.#view.setUpdateChef(chef);
    this.#view.setAddServer(order);
    this.#view.deleteOrder(order);

    this.#restaurant.addServeQueue(order);

    const server = await this.findAvailableServer();
    order = await this.#restaurant.getNextServe();

    order.setState(ORDER_STATE.SERVING);
    server.setOrder(order);
    server.setState(SERVER_STATE.SERVING);
    this.#view.setUpdateServer(server);

    await server.serve();

    order.setState(ORDER_STATE.DONE);
    this.#view.setUpdateServer(server);
    this.#view.doneServer(order);

    this.#restaurant.returnServer(server);
    server.setState(SERVER_STATE.WAITING);
    server.setOrder(null);
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

  /**
   * @returns {Promise<Chef>} 놀고 있는 chef 1명을 반환한다.
   */
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

  /**
   * @description 요리를 시작하기 위한 전처리 작업
   * @param {Chef} chef 요리를 시작할 Chef
   * @param {Order} order 요리를 시작할 Order
   */
  onCooking(chef, order) {
    chef.setState(CHEF_STATE.COOKING);
    order.setState(ORDER_STATE.COOKING);
    chef.setOrder(order);
  }

  /**
   * @param {Order} order order list 상태를 렌더링한다.
   */
  randerUpdateOrderList(order) {
    this.#view.setUpdateOrderList(order);
  }

  /**
   * @param {Chef} chef chef 상태를 렌더링한다.
   */
  randerUpdateChef(chef) {
    this.#view.setUpdateChef(chef);
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
main.init();
