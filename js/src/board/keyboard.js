import Control from "./control.js";
import BoardItem from "./board-item.js";
import KeyControl from "./key-control.js";
import KeyLanguage from "./key-language.js"
import Screen from "../screen/screen.js";

export default class KeyBoard {
  #keyboard = undefined;//Объект клавиатуры
  #control = undefined;//Объект контрольной панели
  #board = undefined;//Объект панели кнопок
  #screen = undefined;//Объект экрана
  /**
   * Выполняет инициализацию клавиатуры
   * @param {Screen} screen объект экрана
   */
  constructor(screen) {
    if (screen == undefined || !(screen instanceof Screen)) {
      return false;
    }
    this.#screen = screen;
    if (!this.#createElement()) {
      return false;
    };
  }
  /**
   * Возвращает объект клавиатуры
   * @returns {HTMLElement} объект клавиатуры
   */
  getElement() {
    return this.#keyboard;
  }
  /**
   * Создает разметку клавиатуры
   * Создает DOM объект клавиатуры
   */
  #createElement() {
    this.#keyboard = document.createElement("div");
    this.#keyboard.classList.add("board_container");
    this.#board = new BoardItem(this.#screen);
    this.#control = new Control();
    this.#control.add(new KeyControl({
      type: "power",
      start: true,
    }));
    this.#control.add(new KeyControl({
      type: "light",
      start: true,
      callback: this.#board.lightToggle.bind(this.#board)
    }));
    let languageKey = new KeyLanguage({
      name: this.#board.getLanguage(),
      start: 0,
      callback: this.#board.setLanguage.bind(this.#board)
    });
    this.#board.setControl(languageKey);
    this.#control.add(languageKey);

    this.#keyboard.insertAdjacentElement("beforeend", this.#control.getElement());
    this.#keyboard.insertAdjacentElement("beforeend", this.#board.getElement());
    return true;
  }
}