export default class KeyControl {
  #keyControl = undefined;//Объект кнопки
  #typeKey = new Map([
    ["power", {
      src: "./image/power.png",
      alt: "power"
    }],
    ["light", {
      src: "./image/light.png",
      alt: "light",
      class: "small"
    }]
  ]);//Типы кнопок

  /**
   * Выполняет инициализацию кнопки
   * @param {object} param объект с параметрами инициализации
   * @param {string} param.type тип кнопки
   * @param {boolean} param.start начальная подсветка кнопки
   * @param {function} param.callback функция вызова при нажатии кнопки
   */
  constructor(param) {
    if (!this.#createElement(param)) {
      return false;
    };
    this.#keyControl.addEventListener("click", this.#keyClicked.bind(this, param.callback));
  }
  /**
   * Возвращает объект кнопки
   * @returns {HTMLElement} объект кнопки
   */
  getElement() {
    return this.#keyControl;
  }
  /**
   * Обработчик события клика по кнопке
   * @param {function} функция вызова при нажатии кнопки
   */
  #keyClicked(callback) {
    this.#keyControl.classList.toggle("on");
    if (callback != undefined) {
      callback();
    }
  }
  /**
   * Создает разметку кнопки
   * Создает DOM объект кнопки
   * @param {object} param объект с параметрами инициализации
   * @param {string} param.type тип кнопки
   * @param {boolean} param.start начальная подсветка кнопки
   */
  #createElement(param) {
    this.#keyControl = document.createElement("div");
    this.#keyControl.classList.add("control_button");
    let image = document.createElement("img");
    image.classList.add("control_button-img");
    image.src = this.#typeKey.get(param.type).src;
    image.setAttribute("alt", this.#typeKey.get(param.type).alt);
    this.#keyControl.insertAdjacentElement("beforeend", image);
    if (this.#typeKey.get(param.type).class != undefined) {
      this.#keyControl.classList.add(this.#typeKey.get(param.type).class);
      image.classList.add(this.#typeKey.get(param.type).class);
    }
    if (param.start) {
      this.#keyControl.classList.add("on");
    }
    return true;
  }
}