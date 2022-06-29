<template>
   <page-wrapper>
      <router-view v-slot="{ Component }">
         <transition name="page-transition" mode="out-in">
            <component :is="Component" :key="pathKey"></component>
         </transition>
      </router-view>
      <notifications-list></notifications-list>
   </page-wrapper>
</template>

<script>
import "@/assets/scss/styles.scss";
import { mapActions, mapMutations } from "vuex";
import NotificationsList from "@/components/notifications/NotificationsList";

export default {
   components: { NotificationsList },
   methods: {
      ...mapActions(["loadProducts"]),
      ...mapMutations(["localStorageChangeEventListener"]),
   },
   computed: {
      pathKey() {
         // не обновлять страницу в следующих разделах: catalogue
         const exceptions = ["catalogue"];
         const regExps = exceptions.map((str) => new RegExp(`(${str})+`, "g"));
         let path = this.$route.path;
         regExps.forEach((reg) => {
            if (reg.test(path)) path = this.$route.name;
         });
         return path;
      },
   },
   mounted() {
      this.loadProducts();
      this.localStorageChangeEventListener();
   },
};
</script>

<style lang="scss">
   .page-transition{
      &-enter-active{
         animation: appear 1s ease;
      }
      @keyframes appear {
         0% {
            transform: scale(0);
         }
         100% {
            transform: scale(1);
         }
      }
      
      &-leave-active{
         animation: leave 1s ease-in;
      }
      @keyframes leave {
         0% {
            opacity: 1;
            transform: translate(0, 0);
         }
         100% {
            opacity: 0;
            transform: translate(0, -100vh);
         }
      }
   }
</style>