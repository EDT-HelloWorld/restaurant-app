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

  /**
   * @returns {number} Order 번호를 반환한다.
   */
  getOrderNo() {
    return this.#number;
  }

  /**
   * @returns {Food} Order의 음식을 반환한다.
   */
  getFood() {
    return this.#food;
  }

  /**
   * @returns {ORDER_STATE} Order의 상태를 반환한다.
   */
  getState() {
    return this.#state;
  }

  /**
   * @param {ORDER_STATE} state
   */
  setState(state) {
    this.#state = state;
  }
}
