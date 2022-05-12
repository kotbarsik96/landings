function checkWebpSupport() {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            resolve(document.querySelector('body').classList.add('webp'));
        }
        img.onerror = function () {
            reject(document.querySelector('body').classList.remove('webp'));
        }
        img.src = 'img/check-webp/check.webp';
    })
}

checkWebpSupport();
// ПРИСВОИТЬ ACTIVE ЭЛЕМЕНТУ //
function toggleActiveClass(elem, nextElem = null) {
    elem.classList.toggle('__active');
    if (nextElem) {
        elem.classList.contains('__active') ? nextElem.classList.add('__active') : nextElem.classList.remove('__active');
    }
}

// HEADER //
class Header {
    constructor() {
        this.header = document.querySelector('.header');

        this.toggleMenu();
        this.setPagePadding();
    }
    toggleMenu() {
        const button = this.header.querySelector('.header__nav-button');
        button.addEventListener('click', function () {
            toggleActiveClass(this);
        });
    }
    setPagePadding() {
        const header = this.header;
        const main = document.querySelector('.main');
        set();
        window.addEventListener('resize', set);

        function set() {
            const height = header.offsetHeight;
            main.style.paddingTop = `${height}px`;
        }
    }
}
new Header();

// SLIDER //
const personSlider = new Swiper('.person-slider', {
    wrapperClass: 'person-slider__wrapper',
    slideClass: 'person-slider__slide',
    effect: 'coverflow',
    coverflowEffect: {
        slideShadows: false,
        rotate: 90
    },
    pagination: {
        el: '.person-slider__pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true
      },
});