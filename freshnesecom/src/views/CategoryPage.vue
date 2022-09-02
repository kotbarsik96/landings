<template>
    <main class="category-page">
        <template v-if="category">
            <PageHeadline class="container">
                <template #title>{{ category.title }}</template>
                <PageHeadlineItem
                    iconName="layout-sections"
                    :isActive="viewType === 'list'"
                    isControl
                    @click="viewType = 'list'"
                    >Список</PageHeadlineItem
                >
                <PageHeadlineItem
                    iconName="layout-square_grid"
                    :isActive="viewType === 'grid'"
                    isControl
                    @click="viewType = 'grid'"
                    >Сетка</PageHeadlineItem
                >
                <PageHeadlineItem>
                    Продуктов:
                    <span class="tag--colored">{{
                        filteredProducts.length
                    }}</span>
                </PageHeadlineItem>
            </PageHeadline>
            <section class="category-page__content">
                <div
                    class="category-page__container"
                    :class="{
                        'category-page__content--list-view':
                            viewType === 'list',
                        'category-page__content--grid-view':
                            viewType === 'grid',
                    }"
                >
                    <ListFilter
                        class="category-page__filter"
                        :isHideable="isFilterHideable"
                        :array="categoryProducts"
                        v-model="filteredProducts"
                        :fields="filterFields"
                    ></ListFilter>
                    <RouterView
                        class="category-page__cards"
                        prodcardClassName="category-page__cards-item"
                        :viewType="viewType"
                        :prodIdsList="pagesArray[pageNumber - 1]"
                    ></RouterView>
                </div>
            </section>
            <PaginationControls
                class="container"
                :list="filteredProducts"
                :pagesAmount="pagesAmount"
                :pageNumber="pageNumber"
                @page-number-click="setPage($event)"
                @next-button-click="setPage(pageNumber + 1)"
                @prev-button-click="setPage(pageNumber - 1)"
            >
                <template #title>Страница:</template>
                <template #pcs-title>Продуктов</template>
            </PaginationControls>
        </template>
    </main>
</template>

<script>
import ListFilter from "@/components/UI/filter/ListFilter.vue";
import {
    mediaQueriesHandlers,
    getRouteParamOrNotFound,
    getObjectValue,
} from "@/assets/js/scripts.js";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import pageControls from "@/assets/js/page-controls.js";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "CategoryPage",
    components: { ListFilter },
    data() {
        return {
            viewType: "list",
            filterFields: [],
            filteredProducts: [],
            pageRouteName: "category-pagenumber",
            mediaQueries: {
                889: false,
                1129: false,
            },
        };
    },
    emits: ["breadcrumbs-change"],
    computed: {
        ...mapGetters(["categories", "products"]),
        categoryId() {
            return this.$route.params.categoryId;
        },
        category() {
            if (this.$route.name.includes("category")) {
                return this.getRouteParamOrNotFound(
                    this.categoryId,
                    this.categories,
                    "id"
                );
            }
        },
        productCardComponent() {
            if (this.viewType === "grid") return "ProductCard";
            if (this.viewType === "list") return "ProductCardBig";
        },
        maxCardsOnPage() {
            switch (this.viewType) {
                case "list":
                default:
                    return 3;
                case "grid":
                    return 6;
            }
        },
        pageRouteTitle() {
            if (this.category) return this.category.title;
            return "";
        },
        categoryProducts() {
            return this.products.filter(
                (prod) => prod.category === this.categoryId
            );
        },
        isFilterHideable() {
            const gridHideable = this.mediaQueries[889];
            const listHideable = this.mediaQueries[1129];

            if (this.viewType === "grid" && gridHideable) return true;
            if (this.viewType === "list" && listHideable) return true;
            return false;
        },
        // постраничная навигация
        pagesArray() {
            // для получения нужной страницы: pagesArray[pageNumber - 1]
            const productsId = this.filteredProducts.map((prod) => prod.id);
            const maxCards = this.maxCardsOnPage;
            return pageControls.computed.createPagesArray(productsId, maxCards);
        },
        pagesAmount: pageControls.computed.pagesAmount,
        pageNumber: pageControls.computed.pageNumber,
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        mediaQueriesHandlers,
        getRouteParamOrNotFound,
        createBreadcrumbs,
        stateFilterFields() {
            const rangeBlockLimits = {
                price: {},
                "rating.value": {},
            };
            for (let key in rangeBlockLimits) {
                const values = this.categoryProducts
                    .map((prod) => {
                        const value = getObjectValue(key, prod);
                        return typeof value === "number" ? value : null;
                    })
                    .filter((num) => num);

                rangeBlockLimits[key].min = 0;
                rangeBlockLimits[key].max = Math.ceil(Math.max(...values));
            }

            this.filterFields = [
                {
                    title: "Категория",
                    key: "subcategory",
                    type: "checkbox",
                },
                {
                    title: "Рейтинг",
                    key: "rating.value",
                    type: "range",
                    rangeValues: rangeBlockLimits["rating.value"],
                },
                {
                    title: "В наличии",
                    key: "stock",
                    type: "radio",
                    booleanTitles: {
                        forTrue: "В наличии",
                        forFalse: "Нет в наличии",
                    },
                },
                {
                    title: "Скидка",
                    key: "oldPrice",
                    type: "radio",
                    booleanOnly: true,
                    booleanTitles: { forTrue: "Есть" },
                },
                {
                    title: "Цена",
                    key: "price",
                    type: "range",
                    rangeValues: rangeBlockLimits["price"],
                },
            ];
        },
        // постраничная навигация
        checkRoutePageNumber() {
            if (this.categoryId) {
                pageControls.methods.checkRoutePageNumber.call(this);
            }
        },
        setPage: pageControls.methods.setPage,
    },
    watch: {
        categoryProducts() {
            this.stateFilterFields();
        },
        pageRouteTitle() {
            this.createBreadcrumbs();
        },
        // постраничная навигация
        pageNumber: pageControls.watch.pageNumber,
        pagesArray: pageControls.watch.pagesArray,
    },
    created() {
        this.loadJsonFile("products");
        this.createBreadcrumbs();
    },
    mounted() {
        this.mediaQueriesHandlers();
    },
};
</script>