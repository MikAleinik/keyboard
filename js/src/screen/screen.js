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
    document.addEventListener("changeText", (event) => {
      console.log(event.detail.action);
      console.log(this.#textArea.selectionStart);
      switch (event.detail.action) {
        case "Backspace": {
          this.delete();
          break;
        }
        case "ArrowLeft": {
          this.setCursorLeft();
          break;
        }
        case "ArrowRight": {
          this.setCursorRight();
          break;
        }
        default: { }
      }
    });
    this.#textArea.value = this.getStartText();
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
    let currentPos = this.#textArea.selectionStart;
    console.log(this.#textArea.value.substring(0, currentPos));
    console.log(this.#textArea.value.substring(currentPos + 1));
    this.#textArea.value = this.#textArea.value.substring(0, currentPos) + symbol + this.#textArea.value.substring(currentPos);
    this.#textArea.selectionStart = currentPos + 1;
    this.#textArea.selectionEnd = currentPos + 1;
    this.#camera.on();
  }
  /**
   * Удаляет символ в текущей позиции курсора
   */
  delete() {
    let currentPos = this.#textArea.selectionStart;
    this.#textArea.value = this.#textArea.value.substring(0, currentPos - 1) + this.#textArea.value.substring(currentPos);
    this.#textArea.selectionStart = currentPos - 1;
    this.#textArea.selectionEnd = currentPos - 1;
  }
  /**
   * Перемещает курсор на один симовол влево от текущей позиции курсора
   */
  setCursorLeft() {
    let currentPos = this.#textArea.selectionStart;
    this.#textArea.selectionStart = currentPos - 1;
    this.#textArea.selectionEnd = currentPos - 1;
  }
  /**
   * Перемещает курсор на один симовол влево от текущей позиции курсора
   */
  setCursorRight() {
    let currentPos = this.#textArea.selectionStart;
    this.#textArea.selectionStart = currentPos + 1;
    this.#textArea.selectionEnd = currentPos + 1;
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
  /**
   * Выводит стартовый текст
   */
  getStartText(){
    let result = "Добрый день уважаемый проверяющий.\r\n";
    result += "Переключение раскладки Shift + Alt\r\n";
    result += "Подсветка клавиатуры вкл/выкл кнопкой на панели\r\n";
    result += "Могут быть некорректности отображения при разных разрешениях\r\n";
    result += "Спасибо, что уделили время. Всего наилучшего!";
    return result;
  }
}