<template>
   <div
      class="rating__item __active __icon-star"
      :key="active"
      v-for="active in rating"
   ></div>
   <div class="rating__item __icon-star" :key="inactive" v-for="inactive in maxProductRating - rating"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "ProductRating",
    props: {
        rating: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapGetters(["maxProductRating"]),
    },
};
</script>

<style>
</style>