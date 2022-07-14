<template>
    <header
        class="header"
        :class="{ 'header--black': metaFields.isBlackHeader, '__fixed': isFixHeader }"
        ref="header"
    >
        <div class="header__container container">
            <RouterLink
                :to="{ name: 'home' }"
                class="header__logo"
            ></RouterLink>
            <SearchField :searchAmong="[
                  { 
                     object: blogs,
                     keys: ['title', 'date', 'preview-text'], 
                     resultLayoutData: { imagePath: '[image]', title: 'Новости', text: '[title]' },
                     route: { name: 'blog-item', params: { key: 'blogId', value: '[id]' } }
                  },
                  {
                     object: bikes,
                     keys: ['title', 'price'],
                     resultLayoutData: { imagePath: '[image]', title: '[title]', text: { string: '[price]', concat: currency } },
                     route: { name: 'bike-page', params: { key: 'bikeId', value: '[id]' } }
                  },
                  {
                    object: categories,
                    keys: ['title'],
                    resultLayoutData: { imagePath: '[image]', title: 'Категории', text: '[title]' },
                    route: { name: 'category', params: { key: 'categoryTitle', value: '[title]' } }
                  }
               ]"></SearchField>
            <div class="header__icons">
                <div
                    class="menu-button"
                    :class="{ '__active': asidesStates.cart }"
                    @click="toggleAside('cart')"
                >
                    <div class="icon-cart-image __icon-cart"></div>
                </div>
                <div
                    class="icon__menu menu-button"
                    :class="{ '__active': asidesStates.menu }"
                    @click="toggleAside('menu')"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <HeaderCart
            :asidesStates="asidesStates"
            @changeAsideState="(asideTitle) => toggleAside(asideTitle)"
        ></HeaderCart>
        <HeaderMenu
            :asidesStates="asidesStates"
            @changeAsideState="(asideTitle) => toggleAside(asideTitle)"
        ></HeaderMenu>
    </header>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderCart from "@/components/page-wrapper/HeaderCart.vue";
import HeaderMenu from "@/components/page-wrapper/HeaderMenu.vue";
import SearchField from "@/components/UI/SearchField.vue";

export default {
    name: "PageHeader",
    components: {
        HeaderCart,
        HeaderMenu,
        SearchField,
    },
    props: {
        routePath: String,
        metaFields: Object,
    },
    data() {
        return {
            isPaddingSet: false,
            isFixHeader: false,
            asidesStates: {
                cart: false,
                menu: false,
            },
        };
    },
    computed: {
        ...mapGetters(["categories", "bikes", "blogs", "currency"]),
        headerEl() {
            return this.$refs.header;
        },
        searchEl() {
            return this.$refs.search;
        },
        headerHeight() {
            return this.$refs.header.offsetHeight + 15;
        },
    },
    methods: {
        toggleAside(asideTitle) {
            const condition = this.asidesStates[asideTitle];
            this.asidesStates[asideTitle] = !condition;
        },
        scrollHandler() {
            const headerHeight = this.headerEl.offsetHeight;

            const onScroll = () => {
                if (window.pageYOffset > headerHeight) this.isFixHeader = true;
                else this.isFixHeader = false;
            };

            onScroll();
            window.addEventListener("scroll", onScroll);
        },
        refreshStates() {
            this.asidesStates.cart = false;
            this.asidesStates.menu = false;
        },
    },
    watch: {
        routePath() {
            this.refreshStates();
        },
    },
    mounted() {
        this.scrollHandler();
    },
};
</script>