<template>
    <component :is="tag" class="prodcard-big" v-if="product">
        <RouterLink
            :to="{ name: 'product', params: { productId: id } }"
            class="prodcard-big__image"
        >
            <div class="prodcard__discount tag--colored" v-if="discount">
                -{{ discount }}%
            </div>
            <img
                :src="`${rootPath}img/products/${product.category}/${id}/${product.images[0]}`"
                alt=""
            />
        </RouterLink>
        <h4 class="prodcard-big__title">
            <RouterLink :to="{ name: 'product', params: { productId: id } }">
                {{ product.title }}
            </RouterLink>
        </h4>
        <div class="prodcard-big__description" v-if="prodSubtitle">
            {{ prodSubtitle }}
        </div>
        <div class="prodcard-big__rating">
            <StarRating
                isColored
                showValue
                :starsAmount="product.rating.value"
            ></StarRating>
        </div>
        <table class="prodcard-big__table info-table">
            <tr class="info-table__item" v-if="freshness && product.stock">
                <td class="info-table__name">Свежесть</td>
                <td class="info-table__value">
                    <span :style="{ color: `var(${freshness.color})` }">{{
                        freshness.title + " "
                    }}</span>
                    <span v-if="freshness.extra">{{ freshness.extra }}</span>
                </td>
            </tr>
            <tr class="info-table__item">
                <td class="info-table__name">Ферма</td>
                <td class="info-table__value">
                    {{ product.info.manufacturer }}
                </td>
            </tr>
            <tr class="info-table__item">
                <td class="info-table__name">Доставка</td>
                <td class="info-table__value">{{ product.info.shipping }}</td>
            </tr>
            <tr class="info-table__item">
                <td class="info-table__name">В наличии</td>
                <td class="info-table__value">
                    <span
                        :style="{
                            color: isInStock
                                ? 'var(--clr-2_A)'
                                : 'var(--clr-4_A)',
                        }"
                        >{{ isInStock ? "Есть" : "Нет" }}</span
                    >
                </td>
            </tr>
        </table>
        <div class="prodcard-big__price-block price-block">
            <div class="price-block__current">{{ product.price }} руб.</div>
            <div class="price-block__old" v-if="product.oldPrice">
                {{ product.oldPrice }} руб.
            </div>
        </div>
        <div class="prodcard-big__devlivery-block">
            <div class="prodcard-big__delivery-price">Бесплатная доставка</div>
            <div class="prodcard-big__delivery-date">Доставим за 1 день</div>
        </div>
        <div class="prodcard-big__btns">
            <RouterLink
                :to="{
                    name: 'product',
                    params: { productId: id },
                }"
                class="
                    prodcard-big__button
                    button--colored
                    __icon-chevron-right
                    --right
                "
            >
                Подробнее
            </RouterLink>
            <WishlistButton
                class="prodcard-big__button"
                inactiveClass="button"
                :isInWishList="isInWishList"
                @wishlistToggle="toggleWishList"
            ></WishlistButton>
        </div>
    </component>
</template>

<script>
import shared from "./shared.js";
import { injectShared } from "@/assets/js/scripts.js";

export default injectShared("ProductCardBig", shared);
</script>