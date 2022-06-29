<template>
   <div class="popup card" ref="popup">
      <div class="popup__bottom card__bottom card__side"></div>
      <div class="popup__container card__container card__side" ref="popupContainer">
         <div class="popup__timeline" ref="timeline"></div>
         <div class="popup__cancel" @click="removeNotification(popupData.id)">
            <div class="popup__cancel-button"></div>
         </div>
         <p
            class="popup__note"
            v-for="(message, index) in popupMessage"
            :key="index"
            :ref="`note-${index}`"
         >{{ insertMessage(message, index) }}</p>
      </div>
   </div>
</template>

<script>
// в state.notifications находятся объекты следующего вида (popupData):
// {
//     message: [
//         'Текстовая строка',
//         '<span>Строка в теге</span>',
//         { node: '<a>Строка в теге. На родителя будет повешен обработчик handler на событие click</a>', handler: () => someHandler(args) }
//         ] || 'Любое значение из массива, только в виде одной строки',
//     timetolive: 3000 || Number
// }

import { mapMutations, mapGetters } from "vuex";
import { gsap } from "gsap";

export default {
   name: "PopupNotification",
   props: {
      popupData: Object,
   },
   data() {
      return {
         timetolive: 3000, // по умолчанию, может быть перезаписано popupData.timetolive
      };
   },
   computed: {
      ...mapGetters(["notificationsList"]),
      popupMessage() {
         if (!Array.isArray(this.popupData.message) && this.popupData.message)
            return [this.popupData.message];
         if (Array.isArray(this.popupData.message))
            return this.popupData.message;
      },
   },
   methods: {
      ...mapMutations(["removeNotification"]),
      insertMessage(message, refIndex) {
         this.$nextTick().then(() => {
            const ref = this.$refs[`note-${refIndex}`][0];
            ref.innerHTML = "";

            // вставить обычную строку
            if (typeof message === "string")
               ref.insertAdjacentHTML("afterbegin", message);
            // встпаить строку и повесить обработчик click на popup__note (т.е. на родителя строки)
            else {
               ref.insertAdjacentHTML("afterbegin", message.node);
               ref.addEventListener("click", () => {
                  message.handler();
                  this.removeNotification(this.popupData.id);
               });
            }
         });
         return "";
      },
      setTimelineAnimation() {
         const tline = this.$refs.timeline;
         if (tline) {
            this.$nextTick().then(() => {
               const timetolive = this.timetolive / 1000;
               const popupWidth = this.$refs.popupContainer.offsetWidth;

               gsap.to(tline, {
                  duration: timetolive,
                  width: popupWidth,
                  ease: "none",
               });
            });
         }
      },
      removeOnTimeout() {
         let timetolive =
            parseInt(this.popupData.timetolive) || this.timetolive;
         setTimeout(() => {
            this.removeNotification(this.popupData.id);
         }, timetolive);
      },
   },
   mounted() {
      this.removeOnTimeout();
      this.setTimelineAnimation();
   },
};
</script>