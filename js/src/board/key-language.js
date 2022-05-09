export default class KeyLanguage {
  #keyLanguage = undefined;//Объект кнопки
  #keys = new Array();//Массив кнопок раскладок
  #language = new Array();//Массив значений раскладок
  /**
   * Выполняет инициализацию кнопки
   * @param {object} param объект с параметрами инициализации
   * @param {Array} param.name названия раскладок кнопки
   * @param {number} param.start индекс стартовой кнопки с подсветкой
   * @param {function} param.callback функция вызова при нажатии кнопки
   */
  constructor(param) {
    if (!this.#createElement(param)) {
      return false;
    };
    for (let i = 0; i < this.#keys.length; i++) {
      this.#keys[i].addEventListener("click", this.#keyClicked.bind(this, { index: i, callback: param.callback}));
    }
  }
  /**
   * Возвращает объект кнопки
   * @returns {HTMLElement} объект кнопки
   */
  getElement() {
    return this.#keyLanguage;
  }
  /**
   * Устанавливает раскладку
   * @param {number} index индекс раскладки
   */
  setLanguage(index){
    this.#keyClicked({
      index: index
    });
  }
  /**
   * Обработчик события клика по кнопке
   * @param {object} param объект с параметрами
   * @param {number} param.index индекс выбранной раскладки
   * @param {function} param.callback функция вызова при нажатии кнопки
   */
  #keyClicked(param) {
    for (let i = 0; i < this.#keys.length; i++){
      this.#keys[i].classList.remove("on");
    }
    this.#keys[param.index].classList.add("on");
    if (param.callback != undefined) {
      param.callback(this.#language[param.index]);
    }
  }
  /**
   * Создает разметку кнопки
   * Создает DOM объект кнопки
   * @param {object} param объект с параметрами инициализации
   * @param {Array} param.name названия раскладок кнопки
   * @param {number} param.start индекс стартовой кнопки с подсветкой
   */
  #createElement(param) {
    this.#keyLanguage = document.createElement("div");
    this.#keyLanguage.classList.add("control_button");
    this.#keyLanguage.classList.add("group");
    for (let i = 0; i < param.name.length; i++){
      let item = document.createElement("label");
      item.innerText = param.name[i];
      this.#keyLanguage.insertAdjacentElement("beforeend", item);
      if (i == param.start) {
        item.classList.add("on");
      }
      this.#keys.push(item);
    }
    this.#language = param.name;
    return true;
  }
}