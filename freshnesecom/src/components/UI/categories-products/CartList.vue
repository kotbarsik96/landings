<template>
    <TransitionGroup
        v-if="products.length > 0"
        tag="ul"
        name="cartlist-anim"
        class="cart-list"
        :class="{ __empty: cart.length < 1 }"
    >
        <template v-if="cart.length > 0">
            <CartItem
                v-for="item in cart"
                :key="item.orderDate"
                :cartData="item"
                :product="findProduct(item.productId)"
            ></CartItem>
        </template>
        <h3 class="title cartlist-anim__title" v-else>Корзина пуста</h3>
    </TransitionGroup>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "@/components/UI/categories-products/CartItem.vue";

export default {
    name: "CartList",
    components: {
        CartItem,
    },
    computed: {
        ...mapGetters(["cart", "products"]),
    },
    methods: {
        findProduct(productId) {
            return this.products.find((pr) => pr.id == productId);
        },
    }
};
</script>

<style lang="scss">
:root {
    --cartlist_transition_dur: 0.4s;
}

.cartlist-anim {
    &__title {
        transition-delay: var(--cartlist_transition_dur);
    }

    &-enter-active,
    &-leave-active {
        transition: all var(--cartlist_transition_dur);
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        max-height: 0;
        margin: 0;
        padding: 0;
        transform: scale(0);
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
        max-height: 1000px;
        transform: scale(1);
    }
}
</style>