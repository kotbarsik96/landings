<template>
   <page-wrapper>
      <router-view v-slot="{ Component }">
         <transition name="page-transition" :mode="transitionMode">
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
   computed: {
      pathKey() {
         // не обновлять страницу в следующих разделах: catalogue
         const exceptions = ["catalogue"];
         let path = this.$route.path;
         if (this.handleExceptions(exceptions, path)) path = this.$route.name;
         return path;
      },
      transitionMode() {
         // убрать mode="out-in", если в pathKey встречено исключение из списка
         const exceptions = ["products"];
         if(this.handleExceptions(exceptions, this.pathKey)) return "out-in";
         return "";
      },
   },
   methods: {
      ...mapActions(["loadProducts"]),
      ...mapMutations(["localStorageChangeEventListener"]),
      handleExceptions(exceptionsArr, strToTest) {
         const regExps = exceptionsArr.map((str) => new RegExp(`${str}+`, "g"));
         let isException = false;
         regExps.forEach((reg) => {
            if (reg.test(strToTest)) isException = true;
         });

         return isException;
      },
   },
   mounted() {
      this.loadProducts();
      this.localStorageChangeEventListener();
   },
};
</script>

<style lang="scss">
.page-transition {
   &-enter-active {
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

   &-leave-active {
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