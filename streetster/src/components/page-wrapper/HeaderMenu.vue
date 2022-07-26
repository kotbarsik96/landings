<template>
   <div
      class="menu aside-menu"
      :class="{ '__active': asidesStates.menu }"
      @click="toggleAside($event, 'menu')"
   >
      <div class="menu__wrapper aside-menu__wrapper">
         <div class="menu__container aside-menu__container">
            <div class="menu__icons">
               <div
                  class="icon__cart menu-button"
                  :class="{ '__active': asidesStates.cart }"
                  @click.stop="toggleAside($event, 'cart')"
               >
                  <div class="icon__cart-image __icon-cart"></div>
               </div>
               <div
                  class="icon__menu menu-button"
                  :class="{ '__active': asidesStates.menu }"
                  @click.stop="toggleAside($event, 'menu')"
               >
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </div>
            <div class="menu__series">
               <p>
                  <RouterLink
                     :to="{ name: 'category', params: { categoryTitle: 'road' } }"
                  >ROAD SERIES</RouterLink>
               </p>
               <p>
                  <RouterLink
                     :to="{ name: 'category', params: { categoryTitle: 'street' } }"
                  >STREET SERIES</RouterLink>
               </p>
               <p>
                  <RouterLink
                     :to="{ name: 'category', params: { categoryTitle: 'offroad' } }"
                  >MOUNTAIN SERIES</RouterLink>
               </p>
            </div>
            <div class="menu__nav">
               <p>
                  <RouterLink :to="{ name: 'blog-page' }">Новости</RouterLink>
               </p>
               <p>
                  <RouterLink :to="{ name: 'contacts', params: {} }">О нас</RouterLink>
               </p>
               <p>
                  <RouterLink :to="{ name: 'contacts', params: { 'contacts-reqs': true } }">Контакты</RouterLink>
               </p>
            </div>
            <div class="socials menu__socials">
               <a href="https://www.instagram.com/?hl=ru">
                  <img :src="icons.instIcon" alt />
               </a>
               <a href="http://facebook.com/">
                  <img :src="icons.fbIcon" alt />
               </a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import fbIcon from "@/assets/images/icons/facebook-bl.svg";
import instIcon from "@/assets/images/icons/instagram-bl.svg";
import asidesShared from "@/components/page-wrapper/aside-menus-shared.js";

export default {
   name: "HeaderMenu",
   props: {
      asidesStates: Object,
   },
   emits: ["changeAsideState"],
   data(){
      return {
         icons: {
            fbIcon,
            instIcon
         }
      }
   },
   methods: {
      toggleAside: asidesShared.toggleAside
   },
};
</script>