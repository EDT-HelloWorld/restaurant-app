import { ORDER_STATE } from '../utils/constant.js';

export class Order {
  #number;
  #food;
  #state;

  constructor(number, food) {
    this.#number = number;
    this.#food = food;
    this.#state = ORDER_STATE.WAITING;
  }

  getOrderNo() {
    return this.#number;
  }

  getFood() {
    return this.#food;
  }

  getState() {
    return this.#state;
  }

  setState(state) {
    this.#state = state;
  }
}
