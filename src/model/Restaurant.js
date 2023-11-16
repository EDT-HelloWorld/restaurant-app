import { CHEF_LIST, CHEF_STATE, SERVER_LIST } from '../utils/constant.js';
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

  init() {
    this.setWorkChef();
    this.setWorkServer();
  }

  getAvailableChef() {
    return this.#availableChefs.shift();
  }

  returnChef(chef) {
    chef.setState(CHEF_STATE.WAITING);
    chef.setOrder(null);
    this.setAvailableChefs(chef);
  }

  getAvailableChefs() {
    return this.#availableChefs;
  }

  isAvailableChef() {
    return this.#availableChefs.length > 0;
  }

  setAvailableChefs(chef) {
    this.#availableChefs.push(chef);
  }

  setAvailableServers(server) {
    this.#availableServers.push(server);
  }

  isAvailableServer() {
    return this.#availableServers.length > 0;
  }

  getAvailableServer() {
    return this.#availableServers.shift();
  }

  returnServer(server) {
    this.#availableServers.push(server);
  }

  addOrder(foodName) {
    const food = new Food(foodName);
    const order = new Order(this.#number++, food);

    this.#ordersQueue.push(order);
    return order;
  }

  addServe(order) {
    this.#serveQueue.push(order);
  }

  getNextServe() {
    return this.#serveQueue.shift();
  }

  isServeQueueEmpty() {
    return this.#serveQueue.length === 0;
  }

  isOrderEmpty() {
    return this.#ordersQueue.length === 0;
  }

  getNextOrder() {
    return this.#ordersQueue.shift();
  }

  setWorkChef() {
    for (let [key, chefInfo] of Object.entries(CHEF_LIST)) {
      const chef = new Chef(key, chefInfo.name);
      this.#workChefs.push(chef);
    }
  }

  setWorkServer() {
    for (let [key, ServerInfo] of Object.entries(SERVER_LIST)) {
      const server = new Server(key, ServerInfo.name, ServerInfo.runTime);
      this.#workServers.push(server);
    }
  }

  getTotalWorkingChefs() {
    return this.#workChefs;
  }

  getTotalWorkingServers() {
    return this.#workServers;
  }
}
