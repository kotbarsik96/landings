<template>
   <header class="header" ref="header">
      <div class="header__mobile" v-if="platform === 'mobile'" v-cloak>
         <div class="header-main">
            <div class="header-main__icons">
               <div class="menu-button" @click="toggleElCondition('isMenuOpened', true)">
                  <div class="menu-button__item menu-button__item-1"></div>
                  <div class="menu-button__item menu-button__item-2"></div>
                  <div class="menu-button__item menu-button__item-3"></div>
               </div>
               <search-field :platform="platform" :isHideable="true" class="header-main__search"></search-field>
            </div>
            <router-link :to="{ name: 'home' }" class="header-main__logo">AudioFree</router-link>
            <div class="header-main__icons">
               <div class="icon-circle __mobile-adapt">
                  <a href="tel: +71111111111" class="icon-circle__item __icon-phone"></a>
               </div>
               <div class="icon-circle icon-circle--cart-icon __mobile-adapt">
                  <router-link :to="{ name: 'cart' }" class="icon-circle__item __icon-cart"></router-link>
                  <div class="icon-circle__number" v-if="inCart > 0">{{ inCart }}</div>
               </div>
               <div class="icon-circle icon-circle--favorites-icon __mobile-adapt">
                  <router-link :to="{ name: 'favorites' }" class="icon-circle__item __icon-heart"></router-link>
                  <div class="icon-circle__number" v-if="inFavorites > 0">{{ inFavorites }}</div>
               </div>
            </div>
         </div>
         <div
            class="header-menu"
            :class="{
            '__active': elemsConditions.mobile.isMenuOpened
        }"
         >
            <div
               class="header-menu__item header-menu__item--menu"
               @click="toggleElCondition('isMenuOpened', true)"
            >
               <span class="__icon-back-arrow"></span>
               <p>Меню</p>
            </div>
            <router-link :to="{ name: 'home' }" class="header-menu__item header-menu__item--bold">
               <span class="__icon-logo"></span>
               <p>Главная</p>
            </router-link>
            <router-link
               :to="{ name: 'catalogue' }"
               class="header-menu__item header-menu__item--bold"
            >
               <div class="menu-button">
                  <div class="menu-button__item menu-button__item-1"></div>
                  <div class="menu-button__item menu-button__item-2"></div>
                  <div class="menu-button__item menu-button__item-3"></div>
               </div>
               <p>Каталог</p>
            </router-link>
            <a href="#" class="header-menu__item header-menu__item--bold">
               <span class="__icon-percent"></span>
               <p>Акции</p>
            </a>
            <a href="#" class="header-menu__item header-menu__item--bold">
               <span class="__icon-account-2"></span>
               <p>Вход/Регистрация</p>
            </a>
            <router-link
               :to="{ name: 'delivery-payment' }"
               class="header-menu__item"
            >Доставка и оплата</router-link>
            <router-link :to="{ name: 'guarantees' }" class="header-menu__item">Гарантия и возврат</router-link>
            <router-link :to="{ name: 'contacts' }" class="header-menu__item">Контакты</router-link>
            <a href="#" class="header-menu__item">Новинки</a>
            <a href="#" class="header-menu__item">Акции</a>
            <a href="#" class="header-menu__item">Блог</a>
            <div class="contacts-block">
               <div class="contacts-block__text">
                  <div class="contacts-block__title">Бесплатный звонок по РФ</div>
                  <div class="contacts-block__info">
                     <a href="tel: +71111111111">8 111 111-11-11</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="header__desktop" v-if="platform === 'desktop'" ref="headerDesktop" v-cloak>
         <div class="header-top" ref="headerTop">
            <div class="header-top__container container">
               <router-link :to="{ name: 'home' }" class="header-top__logo">
                  <span class="bold-text __icon-logo">AudioFree |</span>
                  Интернет магазин беспроводных наушников по РФ
               </router-link>
               <div class="header-top__nav">
                  <router-link
                     :to="{ name: 'delivery-payment' }"
                     class="header-top__nav-item"
                  >Доставка и оплата</router-link>
                  <router-link
                     :to="{ name: 'guarantees' }"
                     class="header-top__nav-item"
                  >Гарантия и возврат</router-link>
                  <router-link :to="{ name: 'contacts' }" class="header-top__nav-item">Контакты</router-link>
               </div>
            </div>
         </div>
         <div class="header-main">
            <div class="header-main__container container">
               <div class="header-main__contacts-block contacts-block">
                  <div class="contacts-block__circle icon-circle">
                     <a href="tel: +71111111111" class="icon-circle__item __icon-phone"></a>
                  </div>
                  <div class="contacts-block__text">
                     <div class="contacts-block__title">Бесплатный звонок по РФ</div>
                     <div class="contacts-block__info">8 111 111-11-11</div>
                  </div>
               </div>
               <search-field :platform="platform" :isHideable="false" class="header-main__search"></search-field>
               <div class="header-main__icons">
                  <div class="header-main__icon icon-circle">
                     <div class="icon-circle__item __icon-judge"></div>
                  </div>
                  <router-link :to="{ name: 'favorites' }" class="header-main__icon icon-circle icon-circle--favorites-icon">
                     <div class="icon-circle__item __icon-heart"></div>
                     <div class="icon-circle__number" v-if="inFavorites > 0">{{ inFavorites }}</div>
                  </router-link>
                  <router-link :to="{ name: 'cart' }" class="header-main__icon icon-circle icon-circle--cart-icon">
                     <div class="icon-circle__item __icon-cart"></div>
                     <div class="icon-circle__number" v-if="inCart > 0">{{ inCart }}</div>
                  </router-link>
               </div>
            </div>
         </div>
         <div class="header-bottom" ref="headerBottom">
            <div class="header-bottom__container container">
               <div class="header-bottom__side header-bottom__catalogue">
                  <div class="menu-button" @click="toggleElCondition('isCatalogueOpened')">
                     <div class="menu-button__item menu-button__item-1"></div>
                     <div class="menu-button__item menu-button__item-2"></div>
                     <div class="menu-button__item menu-button__item-3"></div>
                  </div>
                  <router-link
                     :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                  >Каталог товаров</router-link>
                  <ul
                     class="header-catalogue"
                     :class="{
                        '__active': elemsConditions.desktop.isCatalogueOpened
                    }"
                  >
                     <li class="header-catalogue__item">
                        <router-link
                           :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                        >TRUE WIRELESS</router-link>
                     </li>
                     <li class="header-catalogue__item">
                        <router-link
                           :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                        >Гарнитуры</router-link>
                     </li>
                     <li class="header-catalogue__item">
                        <router-link
                           :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                        >Накладные</router-link>
                     </li>
                     <li class="header-catalogue__item">
                        <router-link
                           :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                        >Полноразмерные</router-link>
                     </li>
                     <li class="header-catalogue__item">
                        <router-link
                           :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                        >С проводом</router-link>
                     </li>
                     <li class="header-catalogue__item">
                        <router-link
                           :to="{ name: 'catalogue', params: { pageNumber: 1 } }"
                        >С шейным ободком</router-link>
                     </li>
                  </ul>
               </div>
               <ul class="header-bottom__nav">
                  <li class="header-bottom__nav-item __active">
                     <router-link :to="{ name: 'home' }">Главная</router-link>
                  </li>
                  <li class="header-bottom__nav-item">
                     <a href="#">Скидки</a>
                  </li>
                  <li class="header-bottom__nav-item">
                     <a href="#">Новинки</a>
                  </li>
                  <li class="header-bottom__nav-item">
                     <a href="#">Бренды</a>
                  </li>
                  <li class="header-bottom__nav-item">
                     <a href="#">Блог</a>
                  </li>
                  <li class="header-bottom__nav-item">
                     <a href="#">Акции</a>
                  </li>
               </ul>
               <a href="#" class="header-bottom__side header-bottom__login">
                  <div class="c __icon-account">Вход/Регистрация</div>
               </a>
            </div>
         </div>
      </div>
   </header>
</template>

<script>
import { nextTick } from "vue";
import { mapGetters } from "vuex";

export default {
   name: "PageHeader",
   data() {
      return {
         lockBodyClass: "__no-scroll",
         mobileMedia: window.matchMedia(`(max-width: ${899}px)`),
         platform: "desktop",
         elemsConditions: {
            mobile: {
               isMenuOpened: false,
               isSearchOpened: false,
            },
            desktop: {
               isCatalogueOpened: false,
            },
         },
      };
   },
   methods: {
      definePlatform() {
         const setPlatform = () =>
            (this.platform = this.mobileMedia.matches ? "mobile" : "desktop");

         setPlatform();
         this.mobileMedia.addEventListener("change", setPlatform);
      },
      toggleElCondition(condKey, doBodyLock = false) {
         const cond = this.elemsConditions[this.platform][condKey];
         this.elemsConditions[this.platform][condKey] = !cond;
         if (doBodyLock)
            !cond === true
               ? document.body.classList.add(this.lockBodyClass)
               : document.body.classList.remove(this.lockBodyClass);
      },
      calcWrapperPading() {
         const header = this.$refs.header;

         const setPadding = () => {
            setTimeout(() => {
               const wrapper = document.querySelector(".wrapper");
               wrapper.style.paddingTop = `${header.offsetHeight}px`;
            }, 0);
         };
         
         setPadding();

         nextTick().then(() => {
            setPadding();
            window.addEventListener("resize", setPadding);
         });
      },
      scrollHandler() {
         let handlerIsSet = false;
         let oldScrollPos = window.pageYOffset;
         let header = this.$refs.header;
         let headerTop = this.$refs.headerTop;
         let headerBottom = this.$refs.headerBottom;

         const onScroll = () => {
            const newScrollPos = window.pageYOffset;
            newScrollPos > oldScrollPos ? doShort() : doDefault();
            oldScrollPos = newScrollPos;
         };
         const doShort = () => {
            header.style.top = `-${headerTop.offsetHeight + 1}px`;
            headerBottom.style.top = `50%`;
         };
         const doDefault = () => {
            header.style.top = "0px";
            headerBottom.style.top = "99%";
         };
         const toggleHandler = () => {
            if (!handlerIsSet && !this.mobileMedia.matches) {
               header = this.$refs.header;
               headerTop = this.$refs.headerTop;
               headerBottom = this.$refs.headerBottom;

               window.addEventListener("scroll", onScroll);
               handlerIsSet = true;
            } else if (handlerIsSet && this.mobileMedia.matches) {
               window.removeEventListener("scroll", onScroll);
               handlerIsSet = false;
            }
         };

         onScroll();
         toggleHandler();
         // на мобильной версии - убрать обработчик, на десктоп - поставить
         this.mobileMedia.addEventListener("change", toggleHandler);
      },
      closeMenuOnPageChange() {
         this.$watch(
            () => this.$route,
            () => {
               this.refresh();
            }
         );
      },
      // возврат состояний элементов и самой шапки по умолчанию, например при переходе с одной платформы на другую
      refresh() {
         document.body.classList.remove("__no-scroll");
         // сброс состояний элементов
         const obj = this.elemsConditions;
         for (let key in obj) {
            for (let subKey in obj[key]) {
               obj[key][subKey] = false;
            }
         }
         // сброс состояний шапки
         this.$refs.header.style.top = "0px";
         if (this.$refs.headerBottom)
            this.$refs.headerBottom.style.top = "99%";
      },
   },
   computed: {
      ...mapGetters(["storageProductsAmount", "products"]),
      inCart() {
         return this.storageProductsAmount.inCart;
      },
      inFavorites() {
         return this.storageProductsAmount.inFavorites;
      },
   },
   watch: {
      platform(newVal, oldVal) {
         // убрать запрет прокрутки при переходе с mobile на desktop
         if (newVal === "desktop" && oldVal === "mobile")
            document.body.classList.remove(this.lockBodyClass);
      },
   },
   mounted() {
      this.definePlatform();
      this.calcWrapperPading();
      this.scrollHandler();
      this.closeMenuOnPageChange();
      this.mobileMedia.addEventListener("change", () => {
         this.refresh();
      });
   },
};
</script>