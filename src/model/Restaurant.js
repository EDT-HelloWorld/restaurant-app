import {
  CHEF_LIST,
  CHEF_STATE,
  MENU_LIST,
  SERVER_LIST,
} from '../utils/constant.js';
import { Chef } from './Chef.js';
import { Food } from './Food.js';
import { Order } from './Order.js';
import { Server } from './Server.js';

export class Restaurant {
  #number;
  #ordersQueue;
  #serveQueue;
  #availableChefs;
  #availableServers;

  #workChefs;
  #workServers;

  constructor() {
    this.#number = 1;
    this.#ordersQueue = [];
    this.#serveQueue = [];
    this.#availableChefs = [];
    this.#availableServers = [];
    this.#workChefs = [];
    this.#workServers = [];
  }

  /**
   * @description chef, server를 셋팅해준다.
   */
  init() {
    this.#initWorkChef();
    this.#initWorkServer();
  }

  /**
   * @description 놀고 있는 chef 1명을 반환한다.
   * @returns {Chef}
   */
  getAvailableChef() {
    return this.#availableChefs.shift();
  }

  /**
   * @param {Chef} chef 요리를 마친 chef를 돌려받는다.
   */
  returnChef(chef) {
    chef.setState(CHEF_STATE.WAITING);
    chef.setOrder(null);
    this.setAvailableChefs(chef);
  }

  /**
   * @returns {boolean} 놀고 있는 chef가 있는지 여부를 반환한다.
   */
  isAvailableChef() {
    return this.#availableChefs.length > 0;
  }

  /**
   * @param {Chef} chef 놀고 있는 chef 테이블에 chef를 추가한다.
   */
  setAvailableChefs(chef) {
    this.#availableChefs.push(chef);
  }

  /**
   * @param {Server} server 놀고 있는 server 테이블에 server를 추가한다.
   */
  setAvailableServers(server) {
    this.#availableServers.push(server);
  }

  /**
   * @returns {boolean} 놀고 있는 server가 있는지 여부를 반환한다.
   */
  isAvailableServer() {
    return this.#availableServers.length > 0;
  }

  /**
   * @returns {Server} 놀고 있는 server 1명을 반환한다.
   */
  getAvailableServer() {
    return this.#availableServers.shift();
  }

  /**
   * @param {Server} server 서빙을 마친 server를 돌려받는다.
   */
  returnServer(server) {
    this.#availableServers.push(server);
  }

  /**
   * @param {Order} order 서빙테이블에 서빙할 주문을 추가한다.
   */
  addServeQueue(order) {
    this.#serveQueue.push(order);
  }

  /**
   * @returns {Order} 서빙테이블에 있는 주문을 반환한다.
   */
  getNextServe() {
    return this.#serveQueue.shift();
  }

  /**
   * @returns {boolean} 서빙테이블이 비어있는지 여부를 반환한다.
   */
  isServeQueueEmpty() {
    return this.#serveQueue.length === 0;
  }

  /**
   * @param {string} menuName 음식 이름 (key)
   * @returns {Order} 주문을 추가한다.
   */
  addOrder(menuName) {
    const name = MENU_LIST[menuName].name;
    const cookTime = MENU_LIST[menuName].cookTime;

    const food = new Food(name, cookTime);
    const order = new Order(this.#number++, food);

    this.#ordersQueue.push(order);
    return order;
  }

  /**
   *
   * @param {string} foodName 음식 이름 (key)
   * @returns {boolean} 레스토랑에 있는 주문 가능한 음식인지 여부를 반환한다.
   */
  isValidateFood(foodName) {
    return MENU_LIST[foodName] !== undefined;
  }

  /**
   * @returns {boolean} 주문테이블이 비어있는지 여부를 반환한다.
   */
  isOrderEmpty() {
    return this.#ordersQueue.length === 0;
  }

  /**
   * @returns {Order} 주문테이블에 있는 주문을 반환한다.
   */
  getNextOrder() {
    return this.#ordersQueue.shift();
  }

  /**
   * @description workChefs를 초기화한다.
   */
  #initWorkChef() {
    for (let [key, chefInfo] of Object.entries(CHEF_LIST)) {
      const chef = new Chef(key, chefInfo.name);
      this.#workChefs.push(chef);
    }
  }

  /**
   * @description workServers를 초기화한다.
   */
  #initWorkServer() {
    for (let [key, ServerInfo] of Object.entries(SERVER_LIST)) {
      const server = new Server(key, ServerInfo.name, ServerInfo.runTime);
      this.#workServers.push(server);
    }
  }

  /**
   * @returns {Chef[]} 레스토랑에서 일하는 전체 Chef 리스트를 반환한다.
   */
  getTotalWorkingChefs() {
    return this.#workChefs;
  }

  /**
   * @returns {Server[]} 레스토랑에서 일하는 전체 Server 리스트를 반환한다.
   */
  getTotalWorkingServers() {
    return this.#workServers;
  }
}
