import Camera from "./camera.js";

export default class Screen {
  #screen = undefined;//Объект экран
  #camera = undefined;//Объект камера
  #textArea = undefined;//Объект поля ввода

  /**
   * Выполняет инициализацию экрана
   */
  constructor() {
    if (!this.#createElement()) {
      return false;
    };
    this.#textArea.addEventListener("click", this.#textAreaClicked.bind(this));
  }
  /**
   * Возвращает объект экрана
   * @returns {HTMLElement} объект экрана
   */
  getElement() {
    return this.#screen;
  }
  /**
   * Добавляет символ в текущей позиции курсора
   * @param {string} symbol
   */
  add(symbol) {
    if (document.activeElement != this.#textArea) {
      this.#textArea.value += symbol;
      this.#camera.on();
    }
  }
  /**
   * Обработчик события клика по текстовому полю
   */
  #textAreaClicked() {
    this.#camera.on();
  }
  /**
   * Создает разметку экрана
   * Создает DOM объект экрана
   */
  #createElement() {
    this.#screen = document.createElement("div");
    this.#screen.classList.add("screen_container");
    this.#camera = new Camera();
    this.#screen.insertAdjacentElement("beforeend", this.#camera.getElement());
    this.#screen.insertAdjacentHTML("beforeend", "<div class=\"screen\"></div>");
    this.#textArea = document.createElement("textarea");
    this.#textArea.classList.add("screen_item");
    this.#screen.children[1].insertAdjacentElement("beforeend", this.#textArea);
    return true;
  }
}