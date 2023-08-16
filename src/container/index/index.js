




class Header {
  static #height = null   // инфо про висоту меню, яку треба сховати
  static #wrapper = null   //  для визначення потрібного розміру для показу меню
  static #button = null    // кнопка раскривного меню, зміна іконки

  static #isOpen = false   // чи откріте вікно?



  static init () {
    this.#height = document.querySelector('.header__bottom').offsetHeight;

    this.#wrapper = document.querySelector('.header__wrapper');
    this.#button = document.querySelector('.header__button--open');

    // Начальное состояние кнопки - открытое меню
    this.#button.classList.add('header__button--open');
    
    this.#button.onclick = () => this.#toggle();
  }

  static init () {
    this.#height = document.querySelector(
      '.header__bottom',
    ).offsetHeight

    this.#wrapper = document.querySelector(
      '.header__wrapper',)
    this.#button = document.querySelector(
      '.header__button--open')
    this.#button.onclick = this.#toggle
  }
  // для зміни висоти врапера від х до 0, призначаємо зворотне значеня для isOpen

  static #toggle = () => {
    if (this.#isOpen) {
      this.#button.classList.replace(
        'header__button--close',
        'header__button--open', )       // якщо відкрите - заміна на протилежне
this.#wrapper.style.height = 0
    } else {
      this.#button.classList.replace(
      'header__button--open',
       'header__button--close',)      // якщо закрите - заміна на відкрите
this.#wrapper.style.height = `${this.#height}px`
    }
    this.#isOpen = !this.#isOpen
  }

}

class Slider {
  static #content = null // посилання на slider__content
  static #left = null
  static #right = null // кнопки листання

  static #count = 1 // поточна картинка, яка показується в слайдері
  static #max = null // кіль-ть всіх картинок
  // Публічний метод для підключення нашіх статичних
  static init = () => {
    this.#content = document.querySelector('.slider__content',)
    this.#left = document.querySelector('.slider__button--left',)
    this.#right = document.querySelector('.slider__button--right',)

    this.#max = this.#content.childElementCount
    if (this.#content !== null) {
        this.#max = this.#content.childElementCount;
} else {
      console.error("Element .slider__content not found.");
}


    this.#left.onclick = () => this.#slide('left')     // підключаемо метод слайда вліва та вправо
    this.#right.onclick = () => this.#slide('right')

    this.updateButtonsVisibility(); // Добавляем вызов этой функции при инициализации
   
  }

  // для прокрутки визначаемо де ми знаходимося скрол влево и на яку ширину можемо прокрутити
  static #slide = (side) => {
    const offsetWidth = this.#content.offsetWidth // актуальна ширина, навіть при меньшенні шир екрану
    const scrollLeft = this.#content.scrollLeft // скільки вже покручено
    const scrollWidth = this.#content.scrollWidth // яка доступна ширина ще

    let scroll = 0

    if (side === 'left') {
      if (this.#count === 1 || scrollLeft === 0) {
        this.#count = this.#max
        scroll = (this.#count - 1) * offsetWidth
      } else {
        this.#count -= 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }

    if (side === 'right') {
       if (
        this.#count === this.#max ||
        scrollLeft === scrollWidth - offsetWidth)
         {
        this.#count = 1
        scroll = 0
      } else {
        this.#count += 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }

    this.#content.scrollTo({
      top: 0,
      left: scroll,
      behavior: 'smooth',
    })
  }

}

Slider.init()