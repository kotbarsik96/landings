<template>
   <footer class="footer">
      <div class="footer__container container">
         <div class="footer__content">
            <div class="footer__icon streetster-icon">
               <div class="icon__container">
                  <img :src="logo" alt="streetster" />
               </div>
            </div>
            <div class="footer__items">
               <div class="items__container">
                  <FooterCategories
                     :isShown="shownFooterItem === 1"
                     ref="footerItem1"
                     @toggleFooterItem="toggleFooterItem(1)"
                  ></FooterCategories>
                  <FooterInfo
                     :isShown="shownFooterItem === 2"
                     ref="footerItem2"
                     @toggleFooterItem="toggleFooterItem(2)"
                  ></FooterInfo>
                  <FooterCategories
                     :isShown="shownFooterItem === 3"
                     ref="footerItem3"
                     @toggleFooterItem="toggleFooterItem(3)"
                  ></FooterCategories>
                  <FooterInfo
                     :isShown="shownFooterItem === 4"
                     ref="footerItem4"
                     @toggleFooterItem="toggleFooterItem(4)"
                  ></FooterInfo>
               </div>
            </div>
            <div class="socials footer__socials">
               <a href="https://www.instagram.com/?hl=ru">
                  <img :src="icons.instIcon" alt />
               </a>
               <a href="http://facebook.com/">
                  <img :src="icons.fbIcon" alt />
               </a>
            </div>
         </div>
         <div class="footer__copyright">
            <div class="copyright__text">&copy; STREETSTER — Все права защищены</div>
         </div>
      </div>
   </footer>
</template>

<script>
import FooterInfo from "@/components/page-wrapper/FooterInfo.vue";
import FooterCategories from "@/components/page-wrapper/FooterCategories.vue";
import logo from "@/assets/images/icons/logo-2.png";
import fbIcon from "@/assets/images/icons/facebook.svg";
import instIcon from "@/assets/images/icons/instagram.svg";

export default {
   name: "PageFooter",
   components: {
      FooterInfo,
      FooterCategories,
   },
   props: {
      routePath: String
   },
   data() {
      return {
         logo,
         shownFooterItem: null,
         icons: {
            fbIcon,
            instIcon
         }
      };
   },
   methods: {
      toggleFooterItem(num) {
         this.shownFooterItem = this.shownFooterItem === num ? 0 : num;
      },
      refreshStates(){
         this.shownFooterItem = 0;
      }
   },
   watch: {
      routePath(){
         this.refreshStates();
      }
   }
};
</script>