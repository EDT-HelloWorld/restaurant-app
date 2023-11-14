import { CHEF_LIST, SERVER_LIST, ORDER_STATE } from '../utils/constant.js';
import { Chef } from './Chef.js';
import { Food } from './Food.js';
import { Order } from './Order.js';
import { Server } from './Server.js';

export class Restaurant {
  #number;
  #orders;
  #serveQueue;
  #chefs;
  #servers;

  constructor() {
    this.#number = 0;
    this.#orders = [];
    this.#chefs = [];
    this.#servers = [];
    this.#serveQueue = [];
    this.setChef();
    this.setServer();
  }

  addOrder(foodName) {
    const food = new Food(foodName);
    const order = new Order(this.#number++, food);
    this.#orders.push(order);
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
    return this.#orders.length === 0;
  }

  getNextOrder() {
    return this.#orders.shift();
  }

  setChef() {
    for (let [key, chefInfo] of Object.entries(CHEF_LIST)) {
      const chef = new Chef(key, chefInfo.name);
      this.#chefs.push(chef);
    }
  }

  setServer() {
    for (let [key, ServerInfo] of Object.entries(SERVER_LIST)) {
      const server = new Server(key, ServerInfo.name, ServerInfo.runTime);
      this.#servers.push(server);
    }
  }

  getChefs() {
    return this.#chefs;
  }

  getServers() {
    return this.#servers;
  }
}
