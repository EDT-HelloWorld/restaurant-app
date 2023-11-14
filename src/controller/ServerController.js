import { STATE } from "../utils/constant.js";

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

  findAvailable() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        const server = this.#getAvailableServer();
        if (server) {
          clearInterval(timerId);
          server.setState(STATE.SERVING);
          resolve(server);
        }
      }, 100);
    });
  }

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
