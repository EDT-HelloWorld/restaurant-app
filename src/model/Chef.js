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

  /**
   * @returns {number} Chef에게 부여된 id를 반환한다.
   */
  getId() {
    return this.#id;
  }

  /**
   * @returns {string} Chef의 이름을 반환한다.
   */
  getName() {
    return this.#name;
  }

  /**
   * @returns {Order} Chef가 요리중인 Order를 반환한다.
   */
  getOrder() {
    return this.#order;
  }

  /**
   * @returns {CHEF_STATE} Chef의 상태를 반환한다.
   */
  getState() {
    return this.#state;
  }

  /**
   * @param {Order} order Chef가 요리할 Order를 설정한다.
   */
  setOrder(order) {
    this.#order = order;
  }

  /**
   *
   * @param {CHEF_STATE} state Chef의 상태를 설정한다.
   */
  setState(state) {
    this.#state = state;
  }

  /**
   * @description 배정된 Order를 요리한다.
   * @returns {Promise<Order>} 요리가 완료된 Order를 반환한다.
   */
  cook() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getOrder());
      }, this.getOrder().getFood().getCookTime() * 1000);
    });
  }
}
