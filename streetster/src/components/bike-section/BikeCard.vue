<template>
   <router-link
      :to="{ name: 'bike-page', params: { bikeId: modelId } }"
      class="other-models__item"
   >
      <div class="other-models__image">
         <img :src="rootPath + bike.image" :alt="bike.id" />
      </div>
      <div class="other-models__info">
         <div class="models-info__container">
            <div class="models-info__name-price">
               <div class="models-info__name h2">{{ bike.title }}</div>
               <div class="models-info__price">{{ bike.price }} {{ currency }}</div>
            </div>
            <div class="models-info__colors">
               <div class="colors__circles params__figures">
                  <div
                     class="colors__wrapper param__wrapper"
                     v-for="color in bike.colors.list"
                     :key="color.code"
                  >
                     <div class="colors__circle-big param__item">
                        <div
                           class="colors__circle-small param__subitem"
                           :style="'background-color:' + color.code"
                        ></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </router-link>
</template>

<script>
import { mapGetters } from "vuex";
import rootPath from "@/root-path.js";

export default {
   name: "BikeCard",
   props: {
      modelId: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         rootPath,
      };
   },
   computed: {
      ...mapGetters(["bikes", "currency"]),
      bike() {
         return this.bikes.find((item) => item.id === this.modelId);
      },
   },
};
</script>