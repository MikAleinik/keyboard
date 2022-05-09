import Screen from "../screen/screen";

export default class Key {
  #TYPE_DEFAULT = "small";//Дефолтный тип кнопки
  #KEY_CODE = "CODE";//Ключ кодов клавиш в объекте языков

  #key = undefined;//Объект кнопка
  #screen = undefined;//Объект экрана

  #keyType = new Map([
    ["small", {
      img: "./image/btn-sm.png",
      class: "small"
    }],
    ["medium", {
      img: "./image/btn-ctrl-sm.png",
      class: "tab"
    }],
    ["space", {
      img: "./image/btn-lg.png",
      class: "space"
    }],
    ["ArrowUp", {
      img: "./image/btn-mini.png",
      class: "mini",
      control: true
    }],
    ["ArrowDown", {
      img: "./image/btn-mini.png",
      class: "mini",
      control: true
    }],
    ["ArrowLeft", {
      img: "./image/btn-sm.png",
      class: "small",
      control: true
    }],
    ["ArrowRight", {
      img: "./image/btn-sm.png",
      class: "small",
      control: true
    }],
    ["Tab", {
      img: "./image/btn-ctrl-sm.png",
      class: "tab",
      control: true
    }],
    ["CapsLock", {
      img: "./image/btn-ctrl.png",
      class: "caps",
      indicator: true,
      control: true
    }],
    ["Backspace", {
      img: "./image/btn-ctrl.png",
      class: "caps",
      control: true
    }],
    ["Enter", {
      img: "./image/btn-md.png",
      class: "enter",
      control: true
    }],
    ["ShiftLeft", {
      img: "./image/btn-md.png",
      class: "shift",
      control: true
    }],
    ["ShiftRight", {
      img: "./image/btn-md.png",
      class: "shift-right",
      control: true
    }],
    ["ControlLeft", {
      img: "./image/btn-ctrl-sm.png",
      class: "tab",
      control: true
    }],
    ["ControlRight", {
      img: "./image/btn-ctrl-sm.png",
      class: "tab",
      control: true
    }],
    ["AltLeft", {
      img: "./image/btn-ctrl-sm.png",
      class: "tab",
      control: true
    }],
    ["AltRight", {
      img: "./image/btn-ctrl-sm.png",
      class: "tab",
      control: true
    }]
  ]);//Типы кнопок
  #type = undefined;//Текущий тип кнопки
  #language = new Map();//Значения кнопок при разных раскладках
  #languageCurrent = undefined;//Значение текущей раскладки
  #indicatorCurrent = false;//Состояние подсветки индикатора
  #shiftCurrent = 0;//Текущий индекс выбора символа из массива
  #altCurrent = 0;//Текущий индекс выбора Alt
  /**
   * Выполняет инициализацию кнопка
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
    document.addEventListener("keydown", this.#keyPressed.bind(this));
    document.addEventListener("keyup", this.#keyUnpressed.bind(this));

    this.#key.addEventListener("mousedown", this.#keyClicked.bind(this));
    this.#key.addEventListener("mouseup", this.#keyUnclicked.bind(this));

    document.addEventListener("setRegistry", (event) => {
      this.#shiftCurrent = event.detail.index;
      this.setLanguage(this.#languageCurrent);
      // console.log(event.detail.index);
    });
  }
  /**
   * Возвращает объект кнопка
   * @returns {HTMLElement} объект кнопка
   */
  getElement() {
    return this.#key;
  }
  /**
   * Изменяет тип кнопка
   * @param {string} type тип кнопки
   */
  setType(type) {
    if (this.#keyType.get(type) != undefined) {
      this.#type = type;
      this.#key.classList.add(this.#keyType.get(type).class);
      this.#key.children[0].src = this.#keyType.get(type).img;
      if (this.#keyType.get(type).indicator) {
        this.#key.insertAdjacentHTML("beforeend", "<div class=\"key-light\"></div>");
        this.#indicatorCurrent = false;
      } else {
        if (this.#key.children[2] != undefined) {
          this.#key.children[2].remove();
        }
      }
    }
  }
  /**
   * Устанавливает значение текущей раскладки
   * @param {string} language название раскладки
   */
  setLanguage(value) {
    if (this.#language.get(value) == undefined) {
      return false;
    }
    this.#languageCurrent = value;
    this.#key.children[1].innerHTML = this.#language.get(value)[this.#shiftCurrent];
    this.#setExclusionKeyName(this.#key.children[1]);
  }
  /**
   * Устанавливает значения кнопки для раскладки
   * @param {object} param объект с параметрами
   * @param {string} param.language название раскладки
   * @param {Array} param.value значения раскладки
   */
  setValue(param) {
    this.#language.set(param.language, param.value);
  }
  /**
   * Изменяет текущее состояние подсветки кнопка 
   */
  lightToggle() {
    this.#key.classList.toggle("on");
  }
  /**
   * Создает разметку кнопка
   * Создает DOM объект кнопка
   */
  #createElement() {
    this.#key = document.createElement("div");
    this.#key.classList.add("key");
    this.#key.insertAdjacentHTML("beforeend", "<img src=\"" + this.#keyType.get(this.#TYPE_DEFAULT).img + "\" alt=\"key\">");
    this.#key.insertAdjacentHTML("beforeend", "<label></label>");
    if (this.#keyType.get(this.#TYPE_DEFAULT).indicator) {
      this.#key.insertAdjacentHTML("beforeend", "<div class=\"key-light\"></div>");
      this.#indicatorCurrent = false;
    }
    this.#type = this.#TYPE_DEFAULT;
    return true;
  }
  /**
   * Обработчик нажатия кнопки на клавиатуре
   * @param {Event} event событие нажатия
   */
  #keyPressed(event) {
    if (event.keyCode == this.#language.get(this.#KEY_CODE)[0]) {
      if (event.code != this.#type && this.#keyType.get(event.code) != undefined) {
        return;
      }
      event.preventDefault();

      if (this.#keyType.get(event.code) == undefined) {
        this.#screen.add(this.#language.get(this.#languageCurrent)[this.#shiftCurrent]);
      } else {
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight": {
            if (this.#shiftCurrent != 1) {
              this.#shiftCurrent = 1;
              document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 1 } }));
            }
            break;
          }
          case "CapsLock": {
            if (this.#indicatorCurrent) {
              this.#indicatorCurrent = false;
              this.#key.children[2].classList.remove("on");
              document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 0 } }));
            } else {
              this.#indicatorCurrent = true;
              this.#key.children[2].classList.add("on");
              document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 1 } }));
            }
            break;
          }
          case "AltLeft":
          case "AltRight": {
            this.#altCurrent = 1;
            break;
          }
          case "Tab": {
            this.#screen.add("\t");
            break;
          }
          case "Enter": {
            this.#screen.add("\r\n");
            break;
          }
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Backspace": {
            document.dispatchEvent(new CustomEvent("changeText", { detail: { action: event.code } }));
            break;
          }
          default: { }
        }
      }
      this.#key.classList.add("pressed");

      if (this.#altCurrent + this.#shiftCurrent > 1) {
        document.dispatchEvent(new CustomEvent("changeLanguage", { detail: { current: this.#languageCurrent } }));
      }
    }
  }
  /**
   * Обработчик отпускания кнопки на клавиатуре
   * @param {Event} event событие нажатия
   */
  #keyUnpressed(event) {
    if (event.keyCode == this.#language.get(this.#KEY_CODE)[0]) {
      event.preventDefault();
      if (this.#keyType.get(event.code) != undefined) {
        switch (event.code) {
          case "ShiftLeft":
          case "ShiftRight": {
            if (this.#shiftCurrent == 1) {
              this.#shiftCurrent = 0;
              document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 0 } }));
            }
            break;
          }
          case "AltLeft":
          case "AltRight": {
            this.#altCurrent = 0;
            break;
          }
          default: { }
        }
      }
      this.#key.classList.remove("pressed");
    }
  }
  /**
   * Обработчик клика мыши на кнопке
   * @param {Event} event событие клика
   */
  #keyClicked(event) {
    event.preventDefault();
    if (this.#keyType.get(this.#type).control == undefined) {
      this.#screen.add(this.#language.get(this.#languageCurrent)[this.#shiftCurrent]);
    } else {
      switch (this.#type) {
        case "ShiftLeft":
        case "ShiftRight": {
          if (this.#shiftCurrent != 1) {
            this.#shiftCurrent = 1;
            document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 1 } }));
          }
          break;
        }
        case "CapsLock": {
          if (this.#indicatorCurrent) {
            this.#indicatorCurrent = false;
            this.#key.children[2].classList.remove("on");
            document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 0 } }));
          } else {
            this.#indicatorCurrent = true;
            this.#key.children[2].classList.add("on");
            document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 1 } }));
          }
          break;
        }
        case "Tab": {
          this.#screen.add("    ");
          break;
        }
        case "Enter": {
          this.#screen.add("\r\n");
          break;
        }
        default: { }
      }
    }
    this.#key.classList.add("pressed");
  }
  /**
   * Обработчик клика мыши на кнопке
   * @param {Event} event событие клика
   */
  #keyUnclicked(event) {
    event.preventDefault();
    if (this.#keyType.get(this.#type) != undefined) {
      switch (this.#type) {
        case "ShiftLeft":
        case "ShiftRight": {
          if (this.#shiftCurrent == 1) {
            this.#shiftCurrent = 0;
            document.dispatchEvent(new CustomEvent("setRegistry", { detail: { index: 0 } }));
          }
          break;
        }
        default: { }
      }
    }
    this.#key.classList.remove("pressed");
    // event.preventDefault();
    // this.#key.classList.remove("pressed");
  }
  /**
   * Обрабатывает исключения различий видимого текста с предуставноленным
   * @param {HTMLElement} element элемент
   */
  #setExclusionKeyName(element) {
    if (element.innerHTML == "CapsLock") {
      element.innerHTML = element.innerHTML.slice(0, 4);
    }
  }
}