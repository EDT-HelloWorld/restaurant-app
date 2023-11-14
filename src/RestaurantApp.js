import { CookController } from "./controller/CookController.js";
import { OrderController } from "./controller/OrderController.js";
import { ServerController } from "./controller/ServerController.js";
import { Restaurant } from "./model/Restaurant.js";
import { View } from "./view/View.js";

export class RestaurantApp {
  #restaurant;
  #name;
  #view;

  constructor(name) {
    this.#name = name;

    this.#view = new View();
    this.#restaurant = new Restaurant();

    this.OrderController = new OrderController(this.#restaurant, this.#view);
    this.CookController = new CookController(this.#restaurant, this.#view);
    this.ServerController = new ServerController(this.#restaurant, this.#view);

    this.controllerArray = [
      this.OrderController,
      this.CookController,
      this.ServerController,
    ];
    this.triggerAllEvents();
  }

  triggerAllEvents() {
    this.controllerArray.map((controller) => controller.setPrepareOpen());
  }

  start() {
    console.log(`Welcome! ${this.#name} RestaurantApp is open!`);

    this.OrderController.getNextOrder().then((order) => {
      this.CookController.findAvailable(order).then((chef) => {
        chef.cook(order).then((food) => {
          this.#view.setUpdateChef(chef);
          this.#view.deleteOrder(order);

          this.ServerController.findAvailable().then((server) => {
            server.serve(food).then(() => {
              this.ServerController.returnServer(server);
              this.CookController.returnChef(chef);
              this.start();
            });
          });
        });
      });
    });
  }
}
