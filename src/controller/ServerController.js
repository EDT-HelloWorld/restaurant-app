import { ORDER_STATE, SERVER_STATE } from '../utils/constant.js';

export class ServerController {
  constructor(restaurant, view) {
    this.restaurant = restaurant;
    this.view = view;
    this.availableServers = [];
  }

  setPrepareOpen() {
    for (let server of this.restaurant.getServers()) {
      this.availableServers.push(server);
    }
  }

  findAvailable(order) {
    order.setState(ORDER_STATE.COOKED);
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        const server = this.#getAvailableServer();
        if (server) {
          clearInterval(timerId);
          order.setState(ORDER_STATE.SERVING);
          server.setState(SERVER_STATE.SERVING);
          server.setOrder(order);
          this.view.setUpdateServer(server);
          resolve(server);
        }
      }, 100);
    });
  }

  // async findAvailable(order) {
  //   order.setState(ORDER_STATE.COOKED);
  //   const server = await this.#getAvailableServer();
  //   if (server) {
  //     order.setState(ORDER_STATE.SERVING);
  //     server.setState(SERVER_STATE.SERVING);
  //     server.setOrder(order);
  //     console.log(server);
  //     this.view.setUpdateServer(server);
  //     await server.serve(order); // ServerController에서 직접 server.serve를 호출
  //   }
  // }

  // async #getAvailableServer() {
  //   return new Promise((resolve) => {
  //     const timerId = setInterval(() => {
  //       const server = this.#getAvailableServerSync();
  //       if (server) {
  //         clearInterval(timerId);
  //         resolve(server);
  //       }
  //     }, 100);
  //   });
  // }

  // #getAvailableServerSync() {
  //   if (this.availableServers.length === 0) {
  //     return null;
  //   }
  //   return this.availableServers.shift();
  // }

  #getAvailableServer() {
    if (this.availableServers.length === 0) {
      return null;
    }

    return this.availableServers.shift();
  }

  returnServer(server) {
    this.availableServers.push(server);
  }
}
