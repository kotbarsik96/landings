<template>
   <div class="devices-toggle">
      <div class="card product-card page-reference__devices-list devices-list">
         <div
            v-for="(device, devKey) in devices"
            :key="devKey"
            @click="selectedDeviceName = devKey"
            class="devices-list__item devices-toggle__title"
            :class="{ '__active': selectedDeviceName === devKey }"
         >
            <div :class="`devices-list__text __icon-${device.icon}`">{{ device.title }}</div>
         </div>
         <router-link to="/catalogue" class="devices-list__item devices-list__item--more">
            <div class="devices-list__text">Смотреть больше моделей</div>
         </router-link>
      </div>
      <mobile-slider class="page-reference__devices" v-if="isMobileSlider" :slideClassName="slideClassName">
         <template
            v-for="(vendorCode, index) in selectedDeviceInfo.vendorCodes"
            :key="vendorCode + index"
            #[vendorCode]
         >
            <component :is="productCardComponent" :vendorCode="vendorCode"></component>
         </template>
      </mobile-slider>
      <div class="cards-list page-reference__devices" v-else>
         <template
            v-for="(vendorCode, index) in selectedDeviceInfo.vendorCodes"
            :key="vendorCode + index"
         >
            <component :is="productCardComponent" :vendorCode="vendorCode"></component>
         </template>
      </div>
   </div>
</template>

<script>
import MobileSlider from "@/components/mobile-slider/MobileSlider";

export default {
   name: "DevicesToggle",
   components: {
      MobileSlider,
   },
   props: {
      isMobileSlider: {
         type: Boolean,
         default: false,
      },
      devices: {
         type: Object,
         required: true,
         // пример: iPhone: { title: 'Для iPhone', icon: 'apple', vendorCodes: ['400511', '400513', '400514'] },
      },
      productCardType: {
         type: String,
         default: "1",
      },
      slideClassName: {
         type: String,
         default: "card-wrapper"
      }
   },
   data() {
      return {
         selectedDeviceName: null,
      };
   },
   computed: {
      selectedDeviceInfo() {
         return this.devices[this.selectedDeviceName];
      },
      productCardComponent() {
         let template = "product-card-";
         return (template += this.selectedDeviceInfo.productCardType
            ? this.selectedDeviceInfo.productCardType
            : this.productCardType);
      },
   },
   created() {
      this.selectedDeviceName = Object.keys(this.devices)[0];
   },
};
</script>