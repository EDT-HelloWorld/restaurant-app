export class Food {
  #name;
  #cookTime;

  constructor(name, cookTime) {
    this.#name = name;
    this.#cookTime = cookTime;
  }

  /**
   * @returns {string} 음식 이름을 반환한다.
   */
  getName() {
    return this.#name;
  }

  /**
   * @returns {number} 음식 조리 시간을 반환한다.
   */
  getCookTime() {
    return this.#cookTime;
  }
}
