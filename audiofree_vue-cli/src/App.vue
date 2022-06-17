<template>
   <page-wrapper>
      <router-view :key="$route.path"></router-view>
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
   mounted() {
      this.loadProducts();
      this.localStorageChangeEventListener();
   },
};
</script>