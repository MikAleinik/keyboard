export default class KeyLanguage {
  COOKIE = "Keyboard";//Куки для сохранения последней раскладки

  #keyLanguage = undefined;//Объект кнопки
  #keys = new Array();//Массив кнопок раскладок
  #language = new Array();//Массив значений раскладок
  /**
   * Выполняет инициализацию кнопки
   * @param {object} param объект с параметрами инициализации
   * @param {Array} param.name названия раскладок кнопки
   * @param {function} param.callback функция вызова при нажатии кнопки
   */
  constructor(param) {
    if (!this.#createElement(param)) {
      return false;
    };
    for (let i = 0; i < this.#keys.length; i++) {
      this.#keys[i].addEventListener("click", this.#keyClicked.bind(this, { index: i, callback: param.callback }));
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
  setLanguage(index) {
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
    for (let i = 0; i < this.#keys.length; i++) {
      this.#keys[i].classList.remove("on");
    }
    this.#keys[param.index].classList.add("on");
    if (param.callback != undefined) {
      param.callback(this.#language[param.index]);
    }
    this.setCookie(this.COOKIE, this.#language[param.index]);
  }
  /**
   * Создает разметку кнопки
   * Создает DOM объект кнопки
   * @param {object} param объект с параметрами инициализации
   * @param {Array} param.name названия раскладок кнопки
   */
  #createElement(param) {
    let lastLanguage = this.getCookie(this.COOKIE);
    if (!lastLanguage) {
      param.start = 0;
    } else {
      param.start = param.name.indexOf(lastLanguage);
    }
    this.#keyLanguage = document.createElement("div");
    this.#keyLanguage.classList.add("control_button");
    this.#keyLanguage.classList.add("group");
    for (let i = 0; i < param.name.length; i++) {
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
  /**
   * Выполняет поиск куки по имени.
   * @param {string} name имя куки 
   * @returns куки в случае успеха или false в случае не удачи
   */
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : false;
  }
  /**
   * Устанавливает куки с заданынми параметрами
   * @param {string} name имя куки
   * @param {string} value значение куки
   * @param {object} options дополнительные параметры куки
   */
  setCookie(name, value, options = {}) {
    options = {
      path: '/',
      ...options
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
}