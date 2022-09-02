<template>
    <div class="cart modal-window">
        <ModalHeader class="cart__wrapper" @closeClick="removeModal">Корзина</ModalHeader>
        <CartList class="cart__wrapper modal-window__wrapper"></CartList>
        <div class="cart__wrapper modal-window__wrapper cart__subtotal">
            <h5 class="cart__subtotal-title">Подитог</h5>
            <div class="cart__subtotal-price">{{ cartTotalPrice }} руб.</div>
        </div>
        <div class="cart__wrapper modal-window__wrapper cart__controls">
            <button
                class="button--transparent"
                @click="removeModal('ModalCart')"
            >
                Продолжить покупки
            </button>
            <RouterLink :to="{ name: 'checkout' }" class="button--colored">
                Перейти к заказу
            </RouterLink>
        </div>
    </div>
</template>

<script>
import CartList from "@/components/UI/categories-products/CartList.vue";
import ModalHeader from "@/components/modals/ModalHeader.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "ModalCart",
    components: { CartList, ModalHeader },
    computed: {
        ...mapGetters(["cartTotalPrice"]),
    },
    methods: {
        ...mapMutations(["addModal", "removeModal"]),
    },
};
</script>