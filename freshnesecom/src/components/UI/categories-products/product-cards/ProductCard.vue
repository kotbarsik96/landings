<template>
    <component :is="tag" class="prodcard" v-if="product">
        <RouterLink
            :to="{
                name: 'product',
                params: { productId: id },
            }"
            class="prodcard__image"
        >
            <div class="prodcard__discount tag--colored" v-if="discount">
                -{{ discount }}%
            </div>
            <img
                :src="`${rootPath}img/products/${product.category}/${id}/${product.images[0]}`"
                :alt="product.title"
            />
        </RouterLink>
        <h5 class="prodcard__title title">
            <RouterLink
                :to="{
                    name: 'product',
                    params: { productId: id },
                }"
            >
                {{ product.title }}
            </RouterLink>
        </h5>
        <div class="prodcard__description">{{ prodSubtitle }}</div>
        <div class="prodcard__rating">
            <StarRating
                v-if="showRating"
                :starsAmount="product.rating.value"
            ></StarRating>
        </div>
        <div class="prodcard__sale-info">
            <div class="prodcard__price-block price-block">
                <div class="price-block__current">{{ product.price }} руб.</div>
                <div class="price-block__old" v-if="product.oldPrice">{{ product.oldPrice }} руб.</div>
            </div>
            <RouterLink
                :to="{
                    name: 'product',
                    params: { productId: id },
                }"
                class="prodcard__button button--colored button--small"
            >
                Купить
            </RouterLink>
        </div>
    </component>
</template>

<script>
import shared from "./shared.js";
import { injectShared } from "@/assets/js/scripts.js";

export default injectShared("ProductCard", shared);
</script>