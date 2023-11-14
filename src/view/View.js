import { STATE } from "../utils/constant.js";

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
        const order = addOrder(menuName);
        this.setAddOrderList(order);
      }
    });
  }

  setAddMenu(key, food) {
    const $menu = document.createElement("button");
    $menu.classList.add("order-button");
    $menu.innerHTML = food.name;
    $menu.dataset.menu = key;
    this.#orderButton.appendChild($menu);
  }

  setAddChef(id, name) {
    const $chef = document.createElement("li");
    const $name = document.createElement("span");
    const $state = document.createElement("span");
    const $food = document.createElement("span");
    $chef.id = id;
    $chef.className = "chef";
    $name.className = "name";
    $state.className = "state";
    $food.className = "food";
    $name.innerHTML = name;
    $state.innerHTML = STATE.WAITING;
    $food.innerHTML = null;
    $chef.innerHTML = $name.outerHTML + $state.outerHTML + $food.outerHTML;
    this.#chefState.appendChild($chef);
  }

  setAddOrderList(order) {
    const food = order.getFood();
    const $order = document.createElement("li");
    const $number = document.createElement("span");
    const $name = document.createElement("span");
    const $state = document.createElement("span");
    $order.className = "order";
    $order.id = `order${order.getOrderNo()}`;
    $number.className = "order-number";
    $name.className = "order-name";
    $state.className = "order-state";
    $number.innerHTML = `주문${order.getOrderNo()}`;
    $name.innerHTML = food.getName();
    $state.innerHTML = food.getState();
    $order.innerHTML = $number.outerHTML + $name.outerHTML + $state.outerHTML;
    this.#orderState.appendChild($order);
  }

  setAddServe() {}

  setUpdataOrderList(order) {
    const $order = document.querySelector(`#order${order.getOrderNo()}`);
    const $state = $order.querySelector(".order-state");
    $state.innerHTML = order.getFood().getState();
  }

  setUpdateChef(chef) {
    const $chef = document.querySelector(`#${chef.getId()}`);
    const $state = $chef.querySelector(".state");
    const $food = $chef.querySelector(".food");
    $state.innerHTML = chef.getState();
    $food.innerHTML = chef.getOrder()?.getFood().getName() ?? "";
  }

  deleteOrder(order) {
    const $order = document.querySelector(`#order${order.getOrderNo()}`);
    $order.remove();
  }
}
