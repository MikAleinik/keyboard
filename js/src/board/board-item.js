import Key from "./key.js";
import Screen from "../screen/screen.js";
import KeyLanguage from "./key-language.js";

export default class BoardItem {
  #KEY_CODE = "CODE";//Ключ кодов клавиш в объекте языков

  #boardItem = undefined;//Объект панели с кнопками и лого
  #keyPanel = undefined;//Объект панели кнопок
  #keys = new Array();//Массив с объектами кнопок
  #countKeyInLine = new Array(14, 14, 13, 12, 9);//Количество кнопок в ряду
  #language = new Map([
    [this.#KEY_CODE,
    [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 17, 18, 32, 18, 17, 37, 38, 40, 39]
    ],
    ["RU",
      [["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "&#8592;", "&#8596;", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "&#8657;", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#8657;", "Ctrl", "Alt", " ", "Alt", "Ctrl", "&#8592;", "&#8593;", "&#8595;", "&#8594;"],
      ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "&#8592;", "&#8596;", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "&#8657;", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "&#8657;", "Ctrl", "Alt", " ", "Alt", "Ctrl", "&#8592;", "&#8593;", "&#8595;", "&#8594;"]]
    ],
    ["EN",
      [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "&#8592;", "&#8596;", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "&#8657;", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#8657;", "Ctrl", "Alt", " ", "Alt", "Ctrl", "&#8592;", "&#8593;", "&#8595;", "&#8594;"],
      ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "=", "&#8592;", "&#8596;", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "&#8657;", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "&#8657;", "Ctrl", "Alt", " ", "Alt", "Ctrl", "&#8592;", "&#8593;", "&#8595;", "&#8594;"]]
    ]
  ]);//Значения кнопок при разных раскладках
  #countLanguage = 2;//Количество доступных раскладок

  #screen = undefined;//Объект экрана
  #controlLanguage = undefined;//Объект выбора раскладки на панели
  /**
   * Выполняет инициализацию панели
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

    document.addEventListener("changeLanguage", (event) => {
      let indexCurrent = 0;
      for (let item of this.#language) {
        if (item[0] != this.#KEY_CODE && item[0] == event.detail.current) {
          break;
        }
        indexCurrent++;
      }
      indexCurrent++;
      if (indexCurrent > this.#countLanguage) {
        indexCurrent = 1;
      }
      let counter = 0;
      for (let item of this.#language) {
        if (item[0] != this.#KEY_CODE && counter == indexCurrent) {
          this.#controlLanguage.setLanguage(counter - 1);
          this.setLanguage(item[0]);
          break;
        }
        counter++;
      }
    });
  }
  /**
   * Возвращает объект контрольной панели
   * @returns {HTMLElement} объект контрольной панели
   */
  getElement() {
    return this.#boardItem;
  }
  /**
   * Изменяет текущее состояние подсветки клавиш 
   */
  lightToggle() {
    this.#keyPanel.classList.toggle("on");
    for (let i = 0; i < this.#keys.length; i++) {
      this.#keys[i].lightToggle();
    }
  }
  /**
   * Устанавливает язык раскладки
   * @param {string} name название раскладки
   */
  setLanguage(name) {
    for (let i = 0; i < this.#keys.length; i++) {
      this.#keys[i].setLanguage(name);
    }
  }
  /**
   * Возвращает символы доступных языковых раскладок
   * @returns {Array} массив символов раскладок
   */
  getLanguage() {
    let result = new Array();
    for (let item of this.#language) {
      if (item[0] != this.#KEY_CODE) {
        result.push(item[0]);
      }
    }
    return result;
  }
  /**
   * Устанавливает объект контрольной панели раскладки
   * @param {KeyLanguage} controlLanguage объект раскладки
   */
  setControl(controlLanguage) {
    this.#controlLanguage = controlLanguage;
  }
  /**
   * Создает разметку панели
   * Создает DOM объект панели
   */
  #createElement() {
    this.#boardItem = document.createElement("div");
    this.#boardItem.classList.add("board_item");
    let element = "<div class=\"board-item_logo\"><a href=\"https://rollingscopes.com/\" target=\"_blank\">";
    element += "<img src=\"https://rollingscopes.com/images/logo_rs_text.svg\" alt=\"logo\"></a></div>";
    this.#boardItem.insertAdjacentHTML("beforeend", element);
    this.#keyPanel = document.createElement("div");
    this.#keyPanel.classList.add("board-item_key");
    this.#keyPanel.classList.add("on");
    for (let i = 0; i < this.#countKeyInLine.length; i++) {
      this.#keyPanel.insertAdjacentElement("beforeend", this.#createLineKey(i));
    }
    this.#modifyKeys();
    this.#boardItem.insertAdjacentElement("beforeend", this.#keyPanel);
    return true;
  }
  /**
   * Создает разметку линии кнопок клавиатуры
   * Переопределяет необходимые кнопки
   * @param {number} number номер линии
   * @returns {HTMLElement} объект линии кнопок
   */
  #createLineKey(number) {
    let lineKeys = document.createElement("div");
    lineKeys.classList.add("item-key_line");
    for (let i = 0; i < this.#countKeyInLine[number]; i++) {
      let key = new Key(this.#screen);
      this.#keys.push(key);
      lineKeys.insertAdjacentElement("beforeend", key.getElement());
      key.lightToggle();
    }
    return lineKeys;
  }
  /**
   * Модифицирует кнопки под расположение на клавиатуре
   */
  #modifyKeys() {
    this.#keys[13].setType("Backspace");
    this.#keys[14].setType("Tab");
    this.#keys[27].setType("medium");
    this.#keys[28].setType("CapsLock");
    this.#keys[40].setType("Enter");
    this.#keys[41].setType("ShiftLeft");
    this.#keys[52].setType("ShiftRight");
    this.#keys[53].setType("ControlLeft");
    this.#keys[54].setType("AltLeft");
    this.#keys[55].setType("space");
    this.#keys[56].setType("AltRight");
    this.#keys[57].setType("ControlRight");
    this.#keys[59].setType("mini");
    this.#keys[60].setType("mini");

    let defaultLanguage = undefined;
    for (let key of this.#language.keys()) {
      if (key != this.#KEY_CODE) {
        defaultLanguage = key;
        break;
      }
    }
    for (let i = 0; i < this.#keys.length; i++) {
      for (let item of this.#language) {
        let value = new Array();
        if (item[0] != this.#KEY_CODE) {
          for (let j = 0; j < item[1].length; j++) {
            value.push(item[1][j][i]);
          }
        } else {
          value.push(item[1][i]);
        }
        this.#keys[i].setValue({
          language: item[0],
          value: value
        });
      }
      this.#keys[i].setLanguage(defaultLanguage);
    }

    this.#union(58, 61);
  }
  /**
   * Выполняет объединение четырех кнопок в один контейнер
   * @param {number} indexFirst индекс первой кнопки
   * @param {number} indexLast индекс последней кнопки
   */
  #union(indexFirst, indexLast) {
    let containerRow = document.createElement("div");
    containerRow.classList.add("key_container-row");
    let containerColumn = document.createElement("div");
    containerColumn.classList.add("key_container-column");
    containerColumn.appendChild(this.#keys[indexFirst + 1].getElement());
    containerColumn.appendChild(this.#keys[indexLast - 1].getElement());
    this.#keys[indexFirst].getElement().insertAdjacentElement("beforebegin", containerRow);
    containerRow.appendChild(this.#keys[indexFirst].getElement());
    containerRow.appendChild(containerColumn);
    containerRow.appendChild(this.#keys[indexLast].getElement());
  }
}