import { STATE } from "../utils/constant.js";
import { Food } from "./Food.js";

export class Order {
  #number;
  #food;

  constructor(number, food) {
    this.#number = number;
    this.#food = food;
  }

  getOrderNo() {
    return this.#number;
  }

  getFood() {
    return this.#food;
  }
}
