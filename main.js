import { RestaurantApp } from "./src/RestaurantApp.js";

class Main {
  #koreanRestaurant;

  constructor() {
    this.#koreanRestaurant = new RestaurantApp("Korean");
  }

  start() {
    this.#koreanRestaurant.start();
  }
}

const main = new Main();
main.start();
