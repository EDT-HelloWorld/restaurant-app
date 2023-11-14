import { CHEF_LIST, SERVER_LIST, STATE } from "../utils/constant.js";
import { Chef } from "./Chef.js";
import { Food } from "./Food.js";
import { Order } from "./Order.js";
import { Server } from "./Server.js";

export class Restaurant {
  #number;
  #orders;
  #chefs;
  #servers;

  constructor() {
    this.#number = 0;
    this.#orders = [];
    this.#chefs = [];
    this.#servers = [];
    this.setChef();
    this.setServer();
  }

  addOrder(foodName) {
    const food = new Food(foodName);
    const order = new Order(this.#number++, food);
    this.#orders.push(order);
    return order;
  }

  getNextOrder() {
    return this.#orders.find(
      (order) => order.getFood().getState() === STATE.WAITING
    );
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
