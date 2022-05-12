let swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    keyboard: {
        enabled: true,
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 110,
        slideShadows: false,
    }
});
