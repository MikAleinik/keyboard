import KeyControl from "./key-control.js";

export default class Control {
  #control = undefined;//Объект контрольной панели
  #items = undefined;//Массив с объектами панели
  /**
   * Выполняет инициализацию контрольной панели
   */
  constructor() {
    if (!this.#createElement()) {
      return false;
    };
    this.#items = new Array();
  }
  /**
   * Возвращает объект контрольной панели
   * @returns {HTMLElement} объект контрольной панели
   */
  getElement() {
    return this.#control;
  }
  /**
   * Добавляет элемент в панель
   * @param {object} element элемент
   */
  add(element){
    this.#items.push(element);
    this.#control.children[0].insertAdjacentElement("beforeend", element.getElement());
  }
  /**
   * Создает разметку контрольной панели
   * Создает DOM объект контрольной панели
   */
  #createElement() {
    this.#control = document.createElement("div");
    this.#control.classList.add("board_control-panel");
    this.#control.insertAdjacentHTML("beforeend", "<div class=\"board_control-item\"></div>");
    this.#control.insertAdjacentHTML("beforeend", "<label class=\"logo\">ХАЙ-ТАК</label>");
    return true;
  }
}