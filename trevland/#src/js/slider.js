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