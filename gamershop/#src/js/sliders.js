// отложенная загрузка слайдера
const swiperLoad = new Promise(resolve => {
    setTimeout(() => {
        const script = document.createElement("script");
        script.src = "js/swiper-bundle.min.js";
        document.body.append(script);
        resolve();
    }, 100);
});
swiperLoad.then(initSliders);

function initSliders() {
    if (typeof Swiper === "undefined") return setTimeout(initSliders, 100);

    // HERO-SLIDER
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
}