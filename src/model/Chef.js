import { STATE } from "../utils/constant.js";

export class Chef {
  #id;
  #name;
  #order;
  #state;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
    this.#order = null;
    this.#state = STATE.WAITING;
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
      this.setState(STATE.COOKING);
      setTimeout(() => {
        order.getFood().setState(STATE.COOKED);
        this.setState(STATE.WAITING);
        this.setOrder(null);
        resolve(order.getFood());
      }, order.getFood().getCookTime());
    });
  }
}
