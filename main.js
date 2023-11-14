import { CookController } from './src/controller/CookController.js';
import { OrderController } from './src/controller/OrderController.js';
import { ServerController } from './src/controller/ServerController.js';
import { Restaurant } from './src/model/Restaurant.js';
import { CHEF_STATE, ORDER_STATE, SERVER_STATE } from './src/utils/constant.js';
import { View } from './src/view/View.js';

class Main {
  #restaurant;
  #view;

  constructor() {
    this.#view = new View();
    this.#restaurant = new Restaurant();

    this.OrderController = new OrderController(this.#restaurant, this.#view);
    this.CookController = new CookController(this.#restaurant, this.#view);
    this.ServerController = new ServerController(this.#restaurant, this.#view);

    this.controllerArray = [this.OrderController, this.CookController, this.ServerController];
    this.initializeSimulation();
  }

  initializeSimulation() {
    this.#view.setClickOrder(this.handleOrderButtonClick.bind(this));
    this.controllerArray.forEach((controller) => controller.setPrepareOpen());
    this.startSimulation();
  }

  handleOrderButtonClick(menuName) {
    const order = this.#restaurant.addOrder(menuName);
    this.#view.setAddOrder(order);
  }

  startSimulation() {
    setInterval(async () => {
      const order = await this.OrderController.getNextOrder();
      const chef = await this.CookController.findAvailable();
      order.setState(ORDER_STATE.COOKING);
      this.#view.setUpdateOrderList(order);
      chef.setOrder(order);
      chef.setState(CHEF_STATE.COOKING);
      this.#view.setUpdateChef(chef);
      chef.cook(order).then((order) => {
        order.setState(ORDER_STATE.COOKED);
        this.CookController.returnChef(chef);
        this.#view.setUpdateChef(chef);
        this.#view.setAddServer(order);
        this.#view.deleteOrder(order);
        this.#restaurant.addServe(order);
      });
    }, 100);

    setInterval(async () => {
      const order = await this.ServerController.getNextServe();
      const server = await this.ServerController.findAvailable();
      order.setState(ORDER_STATE.SERVING);
      server.setOrder(order);
      server.setState(SERVER_STATE.WAITING);
      this.#view.setUpdateServer(server);
      server.serve(order).then((order) => {
        order.setState(ORDER_STATE.DONE);
        server.setState(SERVER_STATE.WAITING);
        this.ServerController.returnServer(server);
        this.#view.setUpdateServer(server);
        server.setOrder(null);
        this.#view.doneServer(order);
      });
    }, 100);
  }
}

const main = new Main();
