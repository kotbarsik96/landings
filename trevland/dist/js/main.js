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
const offersSlider = new Swiper('.offers-slider', {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,

    pagination: {
        el: '.offers-slider__pagination',
        clickable: true
    },
    navigation: {
        prevEl: '.offers-slider__prev',
        nextEl: '.offers-slider__next'
    },
    breakpoints: {
        600: {
            slidesPerView: 2
        },
        880: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 4
        },
        1520: {
            slidesPerView: 5
        },
        2500: {
            slidesPerView: 6
        },
    }
});
// BURGER //
const burger = document.querySelector('.burger');
const body = document.querySelector('body');
body.classList.remove('__no-scroll');
burger.addEventListener('click', function (){
    const header = document.querySelector('.header');
    burger.classList.toggle('__active');
    header.classList.toggle('__active');
    body.classList.toggle('__no-scroll');
});

