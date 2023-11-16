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
    this.renderMenuButton();
    this.setChefs();
    this.setServer();
  }

  /**
   * @description 레스토랑 시뮬레이션을 시작한다.
   */
  async startSimulation() {
    const chef = await this.findAvailableChef();
    let order = await this.getNextOrder();

    this.onCooking(chef, order);
    order = await chef.cook();
    this.cooked(chef, order);

    const server = await this.findAvailableServer();
    order = this.#restaurant.getNextServe();

    this.onServe(server, order);
    await server.serve();
    this.served(server, order);
  }

  /**
   * @description 레스토랑에서 일하는 전체 chef를 렌더링 및 셋팅한다.
   */
  setChefs() {
    for (let chef of this.#restaurant.getTotalWorkingChefs()) {
      this.#view.renderAddChef(chef.getId(), chef.getName());
      this.#restaurant.setAvailableChefs(chef);
    }
  }

  /**
   * @description 레스토랑에서 일하는 전체 server를 셋팅한다.
   */
  setServer() {
    for (let server of this.#restaurant.getTotalWorkingServers()) {
      this.#restaurant.setAvailableServers(server);
    }
  }

  /**
   * @returns {Promise<Server>} 놀고 있는 server 1명을 반환할 때까지 기다린다.
   */
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
   * @returns {Promise<Chef>} 놀고 있는 chef 1명을 반환할 때까지 기다린다.
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
    this.renderUpdateOrderList(order);
    this.renderUpdateChef(chef);
  }

  /**
   * @description 요리가 완료되었을 때의 후처리 작업
   * @param {Chef} chef
   * @param {Order} order
   */
  cooked(chef, order) {
    order.setState(ORDER_STATE.COOKED);
    this.#restaurant.returnChef(chef);
    this.#view.renderUpdateChef(chef);
    this.#view.renderAddServer(order);
    this.#view.renderDeleteOrder(order);
    this.#restaurant.addServeQueue(order);
  }

  /**
   * @description 서빙을 시작하기 위한 전처리 작업
   * @param {Server} server
   * @param {Order} order
   */
  onServe(server, order) {
    order.setState(ORDER_STATE.SERVING);
    server.setOrder(order);
    server.setState(SERVER_STATE.SERVING);
    this.#view.renderUpdateServer(server);
  }

  /**
   * @description 서빙이 완료되었을 때의 후처리 작업
   * @param {Server} server
   * @param {Order} order
   */
  served(server, order) {
    order.setState(ORDER_STATE.DONE);
    this.#view.renderUpdateServer(server);
    this.#view.renderDoneServer(order);
    this.#restaurant.returnServer(server);
    server.setState(SERVER_STATE.WAITING);
    server.setOrder(null);
  }

  /**
   * @param {Order} order order list 상태를 렌더링한다.
   */
  renderUpdateOrderList(order) {
    this.#view.renderUpdateOrderList(order);
  }

  /**
   * @param {Chef} chef chef 상태를 렌더링한다.
   */
  renderUpdateChef(chef) {
    this.#view.renderUpdateChef(chef);
  }

  /**
   * @description 메뉴 버튼 클릭시 호출되는 메서드
   * @param {string} foodName 메뉴 이름
   */
  handleOrderButtonClick(foodName) {
    if (this.#restaurant.isValidateFood(foodName) == false) {
      return;
    }
    const order = this.#restaurant.addOrder(foodName);
    this.#view.renderAddOrder(order);
    this.startSimulation();
  }

  /**
   * @description 메뉴 버튼을 렌더링한다.
   */
  renderMenuButton() {
    for (let [key, menuInfo] of Object.entries(MENU_LIST)) {
      this.#view.renderAddMenuButton(key, menuInfo);
    }
  }

  /**
   * @description 주문테이블에 있는 주문이 있는지 확인한다.
   * @returns {Promise<Order>} 주문테이블에 있는 주문을 반환한다.
   */
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
