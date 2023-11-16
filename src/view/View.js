import { CHEF_STATE } from '../utils/constant.js';

export class View {
  #$orderButton;
  #$orderState;
  #$chefState;
  #$serverState;

  constructor() {
    this.#$chefState;
    this.#$serverState;
    this.#$orderButton;
    this.#$orderState;

    this.#addElements();
  }

  /**
   * @description DOM에 필요한 요소들을 추가
   */
  #addElements() {
    this.#$orderButton = document.querySelector('#group-order-buttons');
    this.#$orderState = document.querySelector('#order-state');
    this.#$chefState = document.querySelector('#chef-state');
    this.#$serverState = document.querySelector('#server-state');
  }

  /**
   * @description 주문 버튼을 클릭했을 때 발생하는 이벤트 등록
   * @param {*} handleOrder
   */
  setClickOrder(handleOrder) {
    this.#$orderButton.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('order-button')) {
        const menuName = target.dataset.menu;
        handleOrder(menuName);
      }
    });
  }

  /**
   * @description 주문을 할 수 있는 버튼을 추가
   * @param {foodId} key 음식 id
   * @param {foodName} food 음식 이름
   */
  setAddMenu(key, food) {
    const $menu = document.createElement('button');

    $menu.classList.add('order-button');
    $menu.innerHTML = food.name;
    $menu.dataset.menu = key;
    this.#$orderButton.appendChild($menu);
  }

  setAddChef(id, name) {
    const $chef = document.createElement('li');
    const $name = document.createElement('span');
    const $state = document.createElement('span');
    const $food = document.createElement('span');

    $chef.id = id;
    $chef.className = 'chef';
    $name.className = 'name';
    $state.className = 'state';
    $food.className = 'food';
    $name.innerHTML = name;
    $state.innerHTML = CHEF_STATE.WAITING;
    $food.innerHTML = null;
    $chef.innerHTML = $name.outerHTML + $state.outerHTML + $food.outerHTML;
    this.#$chefState.appendChild($chef);
  }

  setAddOrder(order) {
    const $order = document.createElement('li');
    const $number = document.createElement('span');
    const $name = document.createElement('span');
    const $state = document.createElement('span');

    $order.className = 'order';
    $order.id = `order${order.getOrderNo()}`;
    $number.className = 'order-number';
    $name.className = 'order-name';
    $state.className = 'order-state';
    $number.innerHTML = `주문${order.getOrderNo()}`;
    $name.innerHTML = order.getFood().getName();
    $state.innerHTML = order.getState();
    $order.innerHTML = $number.outerHTML + $name.outerHTML + $state.outerHTML;
    this.#$orderState.appendChild($order);
  }

  setAddServer(order) {
    const $serve = document.createElement('li');
    const $number = document.createElement('span');
    const $name = document.createElement('span');
    const $state = document.createElement('span');
    const $serverName = document.createElement('span');

    $serve.className = 'serve';
    $serve.id = `serve${order.getOrderNo()}`;
    $number.className = 'serve-number';
    $name.className = 'serve-name';
    $state.className = 'serve-state';
    $serverName.className = 'serve-server';
    $number.innerHTML = `주문${order.getOrderNo()}`;
    $name.innerHTML = order.getFood().getName();
    $state.innerHTML = order.getState();
    $serverName.innerHTML = '';
    $serve.innerHTML =
      $number.outerHTML +
      $name.outerHTML +
      $state.outerHTML +
      $serverName.outerHTML;
    this.#$serverState.appendChild($serve);
  }

  setUpdateServer(server) {
    const $serve = document.querySelector(
      `#serve${server.getOrder().getOrderNo()}`
    );
    const $state = $serve.querySelector('.serve-state');
    const $serverName = $serve.querySelector('.serve-server');

    $state.innerHTML = server.getOrder().getState();
    $serverName.innerHTML = server.getName();
  }

  setUpdateOrderList(order) {
    const $order = document.querySelector(`#order${order.getOrderNo()}`);
    const $state = $order.querySelector('.order-state');
    $state.innerHTML = order.getState();
  }

  setUpdateChef(chef) {
    const $chef = document.querySelector(`#${chef.getId()}`);
    const $state = $chef.querySelector('.state');
    const $food = $chef.querySelector('.food');

    $state.innerHTML = chef.getState();
    $food.innerHTML = chef.getOrder()?.getFood().getName() ?? '';
  }

  deleteOrder(order) {
    const $order = document.querySelector(`#order${order.getOrderNo()}`);
    $order.remove();
  }

  doneServer(order) {
    const $serve = document.querySelector(`#serve${order.getOrderNo()}`);

    $serve.querySelector('.serve-server').innerHTML = '';
    $serve.querySelector('.serve-state').innerHTML = order.getState();
  }
}
