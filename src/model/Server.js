import { STATE } from "../utils/constant.js";

export class Server {
  #id;
  #name;
  #runTime;
  #state;

  constructor(id, name, runTime) {
    this.#id = id;
    this.#name = name;
    this.#runTime = runTime;
    this.#state = STATE.WAITING;
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

  setState(state) {
    this.#state = state;
  }

  serve(food) {
    return new Promise((resolve) => {
      this.setState(STATE.SERVING);
      setTimeout(() => {
        food.setState(STATE.DONE);
        this.setState(STATE.WAITING);
        resolve(food);
      }, this.#runTime * 1000);
    });
  }
}
