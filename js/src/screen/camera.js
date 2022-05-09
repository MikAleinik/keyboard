export default class Camera {
  #WORK_TIME_INDICATOR = 5000;//Время работы индикатора камеры

  #camera = undefined;//Объект камера
  #cameraPower = undefined;//Объект индикации камеры
  /**
   * Выполняет инициализацию камера
   */
  constructor() {
    if (!this.#createElement()) {
      return false;
    };
  }
  /**
   * Возвращает объект камера
   * @returns {HTMLElement} объект камера
   */
  getElement() {
    return this.#camera;
  }
  /**
   * Включает индикацию камеры
   */
  on() {
    this.#cameraPower.classList.add("on");
    setTimeout(() => {
      this.#cameraPower.classList.remove("on");
    }, this.#WORK_TIME_INDICATOR);
  }
  /**
   * Создает разметку камера
   * Создает DOM объект камера
   */
  #createElement() {
    this.#camera = document.createElement("div");
    this.#camera.classList.add("camera_control-item");
    this.#camera.insertAdjacentHTML("beforeend", "<img class=\"camera\" src=\"./image/camera.png\" alt=\"camera\">");
    this.#cameraPower = document.createElement("div");
    this.#cameraPower.classList.add("camera-power");
    this.#camera.insertAdjacentElement("beforeend", this.#cameraPower);
    return true;
  }
}