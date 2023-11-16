import { Order } from '../model/Order.js';
import { Server } from '../model/Server.js';
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
   * @description 주문을 할 수 있는 버튼을 추가한다.
   * @param {foodId} key 음식 id
   * @param {foodName} food 음식 이름
   */
  renderAddMenuButton(key, food) {
    const $menu = document.createElement('button');

    $menu.classList.add('order-button');
    $menu.innerHTML = food.name;
    $menu.dataset.menu = key;
    this.#$orderButton.appendChild($menu);
  }

  /**
   * @description chef를 요리사 란에 추가한다.
   * @param {string} id
   * @param {string} name
   */
  renderAddChef(id, name) {
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

  /**
   * @description 주문란에 주문을 추가한다.
   * @param {Order} order
   */
  renderAddOrder(order) {
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

  /**
   * @description 서빙란에 Order를 추가한다.
   * @param {Order} order 서빙할 Order
   */
  renderAddServer(order) {
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

  /**
   * @description Server 상태를 업데이트 한다.
   * @param {Server} server
   */
  renderUpdateServer(server) {
    const $serve = document.querySelector(
      `#serve${server.getOrder().getOrderNo()}`
    );
    const $state = $serve.querySelector('.serve-state');
    const $serverName = $serve.querySelector('.serve-server');

    $state.innerHTML = server.getOrder().getState();
    $serverName.innerHTML = server.getName();
  }

  /**
   * @description Order 상태를 업데이트 한다.
   * @param {Order} order
   */
  renderUpdateOrderList(order) {
    const $order = document.querySelector(`#order${order.getOrderNo()}`);
    const $state = $order.querySelector('.order-state');
    $state.innerHTML = order.getState();
  }

  /**
   * @description Chef 상태를 업데이트 한다.
   * @param {Chef} chef
   */
  renderUpdateChef(chef) {
    const $chef = document.querySelector(`#${chef.getId()}`);
    const $state = $chef.querySelector('.state');
    const $food = $chef.querySelector('.food');

    $state.innerHTML = chef.getState();
    $food.innerHTML = chef.getOrder()?.getFood().getName() ?? '';
  }

  /**
   * @description 요리가 완료된 주문을 삭제한다.
   * @param {Order} order
   */
  renderDeleteOrder(order) {
    const $order = document.querySelector(`#order${order.getOrderNo()}`);
    $order.remove();
  }

  /**
   * @description 서빙이 완료된 주문를 표시한다.
   * @param {Order} order
   */
  renderDoneServer(order) {
    const $serve = document.querySelector(`#serve${order.getOrderNo()}`);

    $serve.querySelector('.serve-server').innerHTML = '';
    $serve.querySelector('.serve-state').innerHTML = order.getState();
  }
}
