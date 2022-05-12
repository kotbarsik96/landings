const heroSlider = new Swiper('.choose-hero', {
    slidesPerView: 1,

    pagination: {
        el: '.choose-hero-pag',
        bulletClass: 'choose-hero-pag__bullet',
        bulletActiveClass: 'choose-hero-pag__bullet--active',
        type: 'bullets'
    },

    breakpoints: {
        370: {
            slidesPerView: 2
        },
        450: {
            slidesPerView: 3
        }
    }
});