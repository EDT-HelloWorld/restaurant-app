export class View {
  #orderButton;
  #orderState;
  #chefState;
  #serverState;

  constructor() {
    this.#chefState;
    this.#serverState;
    this.#orderButton;
    this.#orderState;
    this.addElements();
  }

  addElements() {
    this.#orderButton = document.querySelector("#group-order-buttons");
    this.#orderState = document.querySelector("#order-state");
    this.#chefState = document.querySelector("#chef-state");
    this.#serverState = document.querySelector("#server-state");
  }

  setClickOrder(addOrder) {
    this.#orderButton.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("order-button")) {
        const menuName = target.dataset.menu;
        addOrder(menuName);
      }
    });
  }
}
