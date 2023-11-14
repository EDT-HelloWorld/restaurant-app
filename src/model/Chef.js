import { CHEF_STATE, ORDER_STATE } from '../utils/constant.js';

export class Chef {
  #id;
  #name;
  #order;
  #state;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
    this.#order = null;
    this.#state = CHEF_STATE.WAITING;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getOrder() {
    return this.#order;
  }

  getState() {
    return this.#state;
  }

  setOrder(order) {
    this.#order = order;
  }

  setState(state) {
    this.#state = state;
  }

  cook(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(order);
      }, order.getFood().getCookTime() * 1000);
    });
  }

  // async cook(order) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       order.setState(ORDER_STATE.COOKED);
  //       this.setState(CHEF_STATE.WAITING);
  //       this.setOrder(null);
  //       resolve(order);
  //     }, order.getFood().getCookTime() * 1000);
  //   });
  // }
}
