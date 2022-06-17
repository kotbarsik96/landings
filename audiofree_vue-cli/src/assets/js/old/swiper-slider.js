function swiperSlidersInit() {
  // product-page-slider
  const productPageSlider = new Swiper('.prodpage-slider', {
    wrapperClass: 'prodpage-slider__wrapper',
    slideClass: 'prodpage-slider__slide',
    slidesPerView: 1,

    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    on: {
      observerUpdate(sld) {
        sld.update();
      },
    }
  });
}