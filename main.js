import { Restaurant } from "./src/model/Restaurant.js";

class Main {
  #koreanRestaurant = new Restaurant("Korean");

  start() {
    this.#koreanRestaurant.start();
  }
}

const main = new Main();
main.start();
