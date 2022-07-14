<template>
   <Swiper
      class="bike-slider"
      :modules="modules"
      :pagination="{ type: 'bullets', clickable: true, el: '.bike-slider__pagination' }"
      :navigation="{ prevEl: '.bike-slider__button--prev', nextEl: '.bike-slider__button--next', enabled: true }"
      loop
      v-if="bike"
      ref="bikeSlider"
      @swiper="onSwiper"
      @slideChange="bikeSlideChange($event)"
   >
      <div class="bike-slider__pagination"></div>
      <div class="swiper-button-prev bike-slider__button--prev bike-slider__button"></div>
      <div class="swiper-button-next bike-slider__button--next bike-slider__button"></div>

      <SwiperSlide
         class="bike-slider__slide"
         v-for="color in bike.colors.list"
         :key="color.code"
         :data-color-code="color.code"
      >
         <div class="bike-slider__slide-image">
            <img :src="rootPath + color.image" :alt="color.name" />
         </div>
      </SwiperSlide>
   </Swiper>
</template>

<script>
import rootPath from "@/root-path.js";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export default {
   name: "BikeSlider",
   props: {
      bike: {
         type: Object,
         required: true,
      },
      modelValue: String,
   },
   emits: ["update:modelValue"],
   components: {
      Swiper,
      SwiperSlide,
   },
   setup() {
      return {
         modules: [Pagination, Navigation],
      };
   },
   data() {
      return {
         rootPath,
         swiper: null,
         colorCode: "",
      };
   },
   methods: {
      bikeSlideChange(swiper) {
         const index = swiper.activeIndex;
         const slides = Array.from(swiper.slides);
         this.colorCode = slides[index].dataset.colorCode;
         this.$emit("update:modelValue", this.colorCode);
      },
      onSwiper(swiper) {
         this.swiper = swiper;
      },
      setClosestSlideByCode(colorCode) {
         const slides = Array.from(this.swiper.slides);
         const matchedSlide = slides.find(sld => sld.dataset.colorCode === colorCode);
         const slideIndex = parseInt(matchedSlide.dataset.swiperSlideIndex) + 1;

         this.swiper.slideTo(slideIndex);
         this.$emit("update:modelValue", this.colorCode);
      },
   },
   watch: {
      modelValue(newVal) {
         this.colorCode = newVal;
      },
      colorCode(newVal) {
         this.setClosestSlideByCode(newVal);
      },
   },
};
</script>