import { CHEF_LIST, CHEF_STATE, SERVER_LIST } from "../utils/constant.js";
import { Chef } from "./Chef.js";
import { Food } from "./Food.js";
import { Order } from "./Order.js";
import { Server } from "./Server.js";

export class Restaurant {
  #number;
  #orders;
  #serveQueue;
  #workChefs;
  #workServers;
  #availableChefs;
  #availableServers;

  constructor() {
    this.#number = 1;
    this.#orders = [];
    this.#workChefs = [];
    this.#workServers = [];
    this.#serveQueue = [];
    this.#availableChefs = [];
    this.#availableServers = [];
    this.#init();
  }

  #init() {
    this.setChef();
    this.setServer();
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
      this.#workChefs.push(chef);
    }
  }

  setServer() {
    for (let [key, ServerInfo] of Object.entries(SERVER_LIST)) {
      const server = new Server(key, ServerInfo.name, ServerInfo.runTime);
      this.#workServers.push(server);
    }
  }

  getChefs() {
    return this.#workChefs;
  }

  getServers() {
    return this.#workServers;
  }
}
