<template>
    <div class="star-rating" :class="{ '--colored': isColorClass }">
        <div class="star-rating__wrapper">
            <div
                class="star-rating__active"
                :style="{ width: `${activeBarWidth}%` }"
            ></div>
            <div class="star-rating__stars">
                <div
                    class="star-rating__star __icon-actions-star"
                    v-for="star in totalStars"
                    :key="star"
                ></div>
            </div>
        </div>
        <div class="star-rating__value" v-if="showValue">
                Рейтинг: {{ starsAmount }}
            </div>
    </div>
</template>

<script>
export default {
    name: "StarRating",
    props: {
        starsAmount: {
            type: Number,
            required: true,
        },
        totalStars: {
            type: Number,
            default: 5,
        },
        isColored: Boolean,
        showValue: Boolean,
    },
    computed: {
        activeBarWidth() {
            return this.starsAmount / (this.totalStars / 100);
        },
        isColorClass() {
            return this.isColored === true || this.isColored === "true";
        },
    },
};
</script>