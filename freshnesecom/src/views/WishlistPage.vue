<template>
    <main class="wishlist-page">
        <PageHeadline class="container">
            <template #title>Список желаемого</template>
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
                <span class="tag--colored">117</span>
                Товаров
            </PageHeadlineItem>
        </PageHeadline>
        <section class="wishlist-page__content">
            <ProdcardsList
                v-if="wishlistArray && wishlistArray.length > 0"
                class="wishlist-page__container"
                :viewType="viewType"
                :prodIdsList="wishlistArray"
            >
                <div class="wishlist-page__container __empty">
                    Список пуст. Чтобы добавить в желаемое, нажмите
                    соответствующую кнопку с иконкой
                    <span class="__icon-actions-heart"></span>
                </div>
            </ProdcardsList>
        </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import { gsap } from "gsap";

export default {
    name: "WishlistPage",
    data() {
        return {
            viewType: "list",
            pageRouteTitle: "Список желаемого"
        };
    },
    emits: ["breadcrumbs-change"],
    computed: {
        ...mapGetters(["wishlist"]),
        wishlistArray() {
            return this.wishlist.map((prod) => prod.productId);
        },
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        createBreadcrumbs,
        onBeforeEnter(el) {
            gsap.set(el, { opacity: 0 });
        },
        onEnter(el, done) {
            gsap.to(el, { opacity: 1, onComplete: done });
        },
    },
    created(){
        this.loadJsonFile("products");
        this.createBreadcrumbs();
    }
};
</script>