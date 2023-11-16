export class Food {
  #name;
  #cookTime;

  constructor(name, cookTime) {
    this.#name = name;
    this.#cookTime = cookTime;
  }

  getName() {
    return this.#name;
  }

  getCookTime() {
    return this.#cookTime;
  }
}
