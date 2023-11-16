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

  isServeQueueEmpty() {
    return this.restaurant.isServeQueueEmpty();
  }

  findAvailable() {
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        const server = this.#getAvailableServer();
        if (server) {
          clearInterval(timerId);
          resolve(server);
        }
      }, 130);
    });
  }

  getNextServe() {
    return new Promise((resolve) => {
      const order = this.restaurant.getNextServe();
      if (order) {
        resolve(order);
      }
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
