

// через конструктор робимо перемикач стану кнопки та меню
class Header {
    constructor() {
        this.toggleButton = document.querySelector('.header__button--toggle');
        this.menuWrapper = document.querySelector('.header__wrapper');
// обробник евента по клику
        this.toggleButton.addEventListener('click', this.toggleMenu.bind(this));
    }
// метод що плавно змінює висоту menuWrapper від 0 до 145пкс
    toggleMenu() {
        this.menuWrapper.style.transition = 'height 0.7s';
// перевірка актуального стану та зміна стану кнопки
        if (this.menuWrapper.style.height === '' || this.menuWrapper.style.height === '0px') {
            this.menuWrapper.style.height = '145px';
            this.toggleButton.classList.remove('header__button--open');
            this.toggleButton.classList.add('header__button--close');
        } else {
            this.menuWrapper.style.height = '0';
            this.toggleButton.classList.remove('header__button--close');
            this.toggleButton.classList.add('header__button--open');
        }
    }
// метод для ініціаціі меню з нульовою висотою
    init() {
        this.menuWrapper.style.height = '0';
    }
}
// тільки після повного завантаженя сторінки скрипт  спрацює
document.addEventListener('DOMContentLoaded', () => {
    const header = new Header();
    header.init();
});


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
  const offsetWidth = this.#content.offsetWidth;
  const scrollLeft = this.#content.scrollLeft;
  const scrollWidth = this.#content.scrollWidth;

  let scroll = 0;

  if (side === 'left') {
    if (this.#count === 1 || scrollLeft === 0) {
      this.#count = this.#max;
      scroll = (this.#count - 1) * offsetWidth;
    } else {
      this.#count -= 1;
      scroll = (this.#count - 1) * offsetWidth;
    }
  }

  if (side === 'right') {
    if (this.#count === this.#max || scrollLeft === scrollWidth - offsetWidth) {
      this.#count = 1;
      scroll = 0;
    } else {
      this.#count += 1;
      scroll = (this.#count - 1) * offsetWidth;
    }
  }

  this.#content.scrollTo({
    top: 0,
    left: scroll,
    behavior: 'smooth',
  });

  this.updateButtonsVisibility();
}

// Приховаємо кнопку прокрутки якщо у тому напрямку це не можливо зробити
  static updateButtonsVisibility() {
    this.#left.classList.toggle('hidden', this.#count === 1);
    this.#right.classList.toggle('hidden', this.#count === this.#max);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    Slider.init();
});






