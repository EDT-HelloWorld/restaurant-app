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

  /**
   * @returns {number} Server에게 부여된 id를 반환한다.
   */
  getId() {
    return this.#id;
  }

  /**
   * @returns {string} Server의 이름을 반환한다.
   */
  getName() {
    return this.#name;
  }

  /**
   * @returns {number} Server가 서빙 하는데 걸리는 시간을 반환한다.
   */
  getRunTime() {
    return this.#runTime;
  }

  /**
   * @returns {SERVER_STATE} Server가 서빙 상태를 반환한다.
   */
  getState() {
    return this.#state;
  }

  /**
   * @returns {Order} Server가 서빙중인 Order를 반환한다.
   */
  getOrder() {
    return this.#order;
  }

  /**
   * @param {Order} order Server가 서빙할 Order를 설정한다.
   */
  setOrder(order) {
    this.#order = order;
  }

  /**
   * @param {SERVER_STATE} state
   */
  setState(state) {
    this.#state = state;
  }

  /**
   * @description 배정된 Order를 서빙한다.
   * @returns {Promise<Order>} 서빙이 완료된 Order를 반환한다.
   */
  serve() {
    return new Promise((resolve) => {
      this.setState(SERVER_STATE.SERVING);
      setTimeout(() => {
        const order = this.getOrder();
        order.setState(ORDER_STATE.DONE);
        this.setState(SERVER_STATE.WAITING);
        resolve(order);
      }, this.#runTime * 1000);
    });
  }
}
