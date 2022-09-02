<template>
    <button
        class="__icon-actions-heart"
        :class="{
            [inactiveClass]: !isInWishList,
            [activeClass]: isInWishList,
        }"
        @click="$emit('wishlistToggle')"
    >
        {{ isInWishList ? "Убрать из желаемого" : "Добавить в желаемое" }}
    </button>
</template>

<script>
export default {
    name: "WishlistButton",
    props: {
        isInWishList: {
            type: Boolean,
            required: true,
        },
        activeClass: {
            type: String,
            default: "button--colored"
        },
        inactiveClass: {
            type: String,
            default: "button--transparent"
        }
    },
    emits: ["wishlistToggle"],
};
</script>