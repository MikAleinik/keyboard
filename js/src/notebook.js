import Screen from "./screen/screen.js";
import KeyBoard from "./board/keyboard.js";

export default class Notebook {
  #notebook = undefined;
  #screen = undefined;
  #keyboard = undefined;

  /**
   * Выполняет инициализацию ноутбука
   */
  constructor() {
    if (!this.#createElement()) {
      return false;
    };
    this.#screen = new Screen();
    this.#notebook.insertAdjacentElement("beforeend", this.#screen.getElement());

    this.#keyboard = new KeyBoard(this.#screen);
    this.#notebook.insertAdjacentElement("beforeend", this.#keyboard.getElement());
  }
  /**
   * Возвращает объект ноутбука
   * @returns {HTMLElement} объект ноутбука
   */
  getElement() {
    return this.#notebook;
  }
  /**
   * Создает разметку ноутбука
   * Создает DOM объект ноутбука
   */
  #createElement() {
    this.#notebook = document.createElement("div");
    this.#notebook.classList.add("keyboard");
    let body = document.getElementsByTagName("body")[0];
    if (body == undefined) {
      return false;
    }
    body.insertAdjacentElement("afterbegin", this.#notebook);

    return true;
  }
}