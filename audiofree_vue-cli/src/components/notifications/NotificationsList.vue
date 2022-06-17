<template>
   <transition-group name="popup-card">
      <popup-notification v-for="popup in notificationsList" :key="popup.id" :popupData="popup"></popup-notification>
   </transition-group>
</template>

<script>
import PopupNotification from "@/components/notifications/PopupNotification";
import { mapGetters } from "vuex";

export default {
   name: "NotificationsList",
   components: { PopupNotification },
   computed: {
      ...mapGetters(["notificationsList"]),
   },
};
</script>

<style>
.popup-card-enter-active,
.popup-card-leave-active {
   transition: all 0.35s;
}

.popup-card-enter-from{
   transform: translate(0, 100vh);
}
.popup-card-enter-to {
   transform: translate(0, var(--popupTranslate));
}
.popup-card-leave-to {
   transform: translate(150%, 0);
}
</style>