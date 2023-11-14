import Restaurant from "./RestaurantApp.js";

class Main {
  #restaurant = new Restaurant();

  start() {
    this.#restaurant.start();
  }
}
