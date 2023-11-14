import { ORDER_STATE, SERVER_STATE } from '../utils/constant.js';

export class Server {
  #id;
  #name;
  #runTime;
  #order;
  #state;

  constructor(id, name, runTime) {
    this.#id = id;
    this.#name = name;
    this.#runTime = runTime;
    this.#order = null;
    this.#state = SERVER_STATE.WAITING;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getRunTime() {
    return this.#runTime;
  }

  getState() {
    return this.#state;
  }

  getOrder() {
    return this.#order;
  }

  setOrder(order) {
    this.#order = order;
  }

  setState(state) {
    this.#state = state;
  }

  serve(order) {
    return new Promise((resolve) => {
      this.setState(SERVER_STATE.SERVING);
      setTimeout(() => {
        order.setState(ORDER_STATE.DONE);
        this.setState(SERVER_STATE.WAITING);
        resolve(order);
      }, this.#runTime * 1000);
    });
  }

  // async serve(order) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       order.setState(ORDER_STATE.DONE);
  //       this.setState(SERVER_STATE.WAITING);
  //       resolve(order);
  //     }, this.#runTime * 1000);
  //   });
  // }
}
