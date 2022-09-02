<template>
    <li class="cart-item">
        <div class="cart-item__image-controls">
            <div class="cart-item__image">
                <RouterLink
                    :to="{
                        name: 'product',
                        params: { productId: product.id },
                    }"
                >
                    <img
                        :src="`${rootPath}img/products/${product.category}/${product.id}/${product.images[0]}`"
                        :alt="product.title"
                    />
                </RouterLink>
            </div>
            <div class="cart-item__controls">
                <button
                    class="cart-item__button --small __icon-actions-heart"
                    :class="{
                        'button--transparent': !isInWishList,
                        'button--colored': isInWishList,
                    }"
                    @click="toggleWishList"
                >
                    {{ isInWishList ? "В желаемом" : "В желаемое" }}
                </button>
                <button
                    class="
                        cart-item__button
                        button--transparent
                        --colored-icon
                        --small
                        __icon-actions-close_simple
                    "
                    @click="removeFromCart"
                >
                    Убрать
                </button>
            </div>
        </div>
        <div class="cart-item__main">
            <h5 class="cart-item__title">
                <RouterLink
                    :to="{
                        name: 'product',
                        params: { productId: product.id },
                    }"
                >
                    {{ product.title }}
                </RouterLink>
            </h5>
            <table class="cart-item__info-table info-table">
                <tr class="info-table__item">
                    <td class="info-table__name">Производитель:</td>
                    <td class="info-table__value">
                        {{ product.info.manufacturer }}
                    </td>
                </tr>
                <tr class="info-table__item" v-if="freshness">
                    <td class="info-table__name">Свежесть:</td>
                    <td class="info-table__value">
                        {{ freshness.title }}
                    </td>
                </tr>
            </table>
            <StarRating
                class="cart-item__rating --colored"
                :starsAmount="product.rating.value"
            ></StarRating>
            <div class="cart-item__price-amount price-block">
                <div class="cart-item__prices price-block">
                    <div class="price-block__current --colored">
                        {{ totalPrice.current }} руб.
                    </div>
                    <div class="price-block__old" v-if="totalPrice.old">
                        {{ totalPrice.old }} руб.
                    </div>
                </div>
                <InputNumbers
                    class="cart-item__amount"
                    :min="1"
                    :max="100"
                    v-model="amount"
                ></InputNumbers>
            </div>
        </div>
    </li>
</template>

<script>
import { lStorage } from "@/assets/js/scripts.js";
import {
    findInWishlist,
    toggleWishList,
    removeFromCart,
    freshness,
} from "@/assets/js/product-cards.js";
import { mapGetters } from "vuex";
import rootPath from "@/root-path.js";
import StarRating from "@/components/UI/categories-products/StarRating.vue";

export default {
    name: "CartItem",
    components: { StarRating },
    props: {
        cartData: {
            type: Object,
            required: true,
        },
        product: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            rootPath,
            amount: this.cartData.amount,
        };
    },
    computed: {
        ...mapGetters(["wishlist"]),
        totalPrice() {
            return {
                current: this.product.price * this.amount,
                old: this.product.oldPrice * this.amount,
            };
        },
        isInWishList() {
            return findInWishlist(this.product.id, this.wishlist || [])
                ? true
                : false;
        },
        freshness,
    },
    methods: {
        changeAmount(val) {
            const cart = lStorage.getItem("cart");
            const prod = cart.map((el) => {
                if (el.orderId == this.cartData.orderId) el.amount = val;
                return el;
            });
            prod.amount = this.val;
            lStorage.setItem("cart", cart);
        },
        removeFromCart() {
            removeFromCart(this.cartData.orderDate);
        },
        toggleWishList,
    },
    watch: {
        amount(newVal) {
            this.changeAmount(newVal);
        },
    },
};
</script>