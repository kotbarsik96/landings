<template>
    <main class="product-page">
        <template v-if="product">
            <div class="product-page__container">
                <div class="product-page__headline">
                    <h1 class="product-page__title">{{ product.title }}</h1>
                    <div class="product-page__rating">
                        <StarRating
                            class="product-page__rating-items"
                            :starsAmount="product.rating.value"
                        ></StarRating>
                        <div class="product-page__rating-text">
                            Оценок: {{ product.rating.amount }}
                        </div>
                    </div>
                    <p class="product-page__descr">
                        {{ product.subtitle }}
                    </p>
                </div>
                <div class="product-page__images-block">
                    <div
                        class="product-page__image"
                        v-for="(imgName, index) in product.images"
                        :key="imgName"
                    >
                        <div
                            class="product-page__image-tags-block"
                            v-if="index === 0"
                        >
                            <div class="tag--colored" v-if="discount">
                                -{{ discount }}%
                            </div>
                        </div>
                        <img
                            :src="
                                productCategory.id
                                    ? `${rootPath}img/products/${productCategory.id}/${productId}/${imgName}`
                                    : ''
                            "
                            :alt="product.title + ' ' + index"
                        />
                    </div>
                </div>
                <div class="product-page__info">
                    <table class="product-page__info-table info-table">
                        <tr class="info-table__item">
                            <td class="info-table__name">Номер:</td>
                            <td class="info-table__value">{{ product.id }}</td>
                        </tr>
                        <tr class="info-table__item">
                            <td class="info-table__name">Категория:</td>
                            <td class="info-table__value --underlined">
                                {{ productCategory.title }}
                            </td>
                        </tr>
                        <tr class="info-table__item">
                            <td class="info-table__name">В наличии:</td>
                            <td
                                class="info-table__value --underlined"
                                :style="{
                                    color: isInStock
                                        ? 'var(--clr-2_A)'
                                        : 'var(--clr-4_A)',
                                }"
                            >
                                {{ isInStock ? "Есть" : "Нет" }}
                            </td>
                        </tr>
                    </table>
                    <div class="product-page__bordered-block bordered-block">
                        <div class="bordered-block__prices price-block">
                            <div class="price-block__current">
                                {{ product.price }} руб.
                            </div>
                            <div class="price-block__old">
                                {{ product.oldPrice }}
                            </div>
                        </div>
                        <div class="bordered-block__controls">
                            <InputNumbers
                                v-if="product.stock"
                                :min="1"
                                :max="100"
                                v-model="amount"
                                name="product-amount"
                            ></InputNumbers>
                            <button
                                class="
                                    bordered-block__control
                                    button--colored
                                    __icon-actions-add_simple
                                "
                                :class="{ 'button--inactive': !product.stock }"
                                @click="
                                    () => (product.stock ? addToCart() : false)
                                "
                            >
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                    <div class="product-page__controls">
                        <WishlistButton
                            class="product-page__control"
                            :isInWishList="isInWishList"
                            @wishlistToggle="toggleWishList"
                        ></WishlistButton>
                    </div>
                    <InfoTab
                        class="product-page__product-info"
                        :product="product"
                    ></InfoTab>
                </div>
            </div>
            <HeadlinedSection>
                Похожие товары
                <template #button>
                    <RouterLink
                        :to="{
                            name: 'category',
                            params: { categoryId: product.category },
                        }"
                        class="button--transparent"
                    >
                        Больше товаров
                    </RouterLink>
                </template>
                <template #content>
                    <div class="cards-list">
                        <ProductCard
                            v-for="prod in similarProducts"
                            :key="prod.id"
                            :id="prod.id"
                        ></ProductCard>
                    </div>
                </template>
            </HeadlinedSection>
        </template>
    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { calcDiscount, getRouteParamOrNotFound } from "@/assets/js/scripts.js";
import {
    toggleWishList,
    isInWishList,
    addToCart,
} from "@/assets/js/product-cards.js";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import rootPath from "@/root-path.js";
import StarRating from "@/components/UI/categories-products/StarRating.vue";
import InfoTab from "@/components/UI/misc/InfoTab.vue";

export default {
    name: "ProductDetail",
    components: {
        StarRating,
        InfoTab,
    },
    data() {
        return {
            rootPath,
            amount: 1,
        };
    },
    computed: {
        ...mapGetters(["products", "wishlist", "categories"]),
        productId() {
            return this.$route.params.productId;
        },
        product() {
            if (this.$route.name === "product") {
                return this.getRouteParamOrNotFound(
                    this.productId,
                    this.products,
                    "id"
                );
            }
        },
        productCategory() {
            if (this.product) {
                const category = this.categories.find(
                    (ct) => ct.id === this.product.category
                );
                return category
                    ? {
                          id: category.id,
                          title: category.title,
                      }
                    : {};
            }
            return {};
        },
        isInStock() {
            return this.product.stock;
        },
        discount() {
            const oldPrice = this.product.oldPrice;
            const price = this.product.price;
            return calcDiscount(oldPrice, price);
        },
        isInWishList,
        similarProducts() {
            if (this.product) {
                const amount = 4;
                const similarProductsList = this.products
                    .filter((prod) => {
                        return prod.category === this.product.category;
                    })
                    .filter((prod, index) => {
                        return index < amount;
                    });
                return similarProductsList;
            }
            return null;
        },
        pageRouteTitle() {
            if (this.product) return this.product.title;
            return "";
        },
        previousBreadcrumbs() {
            const categoryTitle = this.productCategory.title || "title";
            const categoryId = this.productCategory.id || "categoryId";
            return {
                title: categoryTitle,
                routeTo: {
                    name: "category",
                    params: { categoryId },
                },
            };
        },
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        getRouteParamOrNotFound,
        toggleWishList,
        createBreadcrumbs,
        addToCart() {
            addToCart(this.productId, this.amount);
        },
    },
    watch: {
        pageRouteTitle() {
            this.createBreadcrumbs();
        },
    },
    created() {
        this.loadJsonFile("products");
        this.createBreadcrumbs();
    },
};
</script>