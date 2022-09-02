<template>
    <header
        :class="{ header: isDesktop, 'header-mobile': !isDesktop }"
        ref="header"
    >
        <template v-if="isDesktop">
            <div class="header-top" ref="headerTop">
                <div class="header-top__container">
                    <div class="header-top__contacts">
                        <a href="#" class="link header-top__contacts-item"
                            >Написать нам в чат</a
                        >
                        <a
                            href="tel: +78005553535"
                            class="link--uncolored header-top__contacts-item"
                            >+78005553535</a
                        >
                        <span class="header-top__contacts-item">
                            info@freshnese.com
                        </span>
                    </div>
                    <nav class="header-top__nav">
                        <RouterLink
                            :to="{ name: 'blogs' }"
                            class="link header-top__nav-item"
                            >Блог</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'blogs' }"
                            class="link header-top__nav-item"
                            >О нас</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'home' }"
                            class="link header-top__nav-item"
                            >Работа</RouterLink
                        >
                    </nav>
                </div>
            </div>
            <div class="header-main" ref="headerMain">
                <div class="header-main__container">
                    <div class="header-main__logo">
                        <RouterLink :to="{ name: 'home' }"
                            ><img :src="logo" alt="Freshnesecom"
                        /></RouterLink>
                    </div>
                    <SelectSearch
                        class="header-main__input-field"
                        v-bind="searchCompProps"
                        :options="selectSearchOptions"
                        selectFilterKey="category"
                    ></SelectSearch>
                    <div class="header-main__icons">
                        <button
                            class="header-main__icon __icon-actions-user"
                            @click="addModal('ModalAccount')"
                        ></button>
                        <RouterLink
                            :to="{ name: 'wishlist' }"
                            class="header-main__icon icon __icon-actions-heart"
                        >
                            <div class="icon__number" v-if="wishlist.length">
                                {{ wishlist.length }}
                            </div>
                        </RouterLink>
                        <button
                            class="header-main__icon icon __icon-ec-basket"
                            @click="addModal('ModalCart')"
                        >
                            <div class="icon__number" v-if="cart.length">
                                {{ cart.length }}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="header-bottom" ref="headerBottom">
                <nav class="header-bottom__container">
                    <RouterLink
                        v-for="category in categories"
                        :key="category.id"
                        :to="{
                            name: 'category',
                            params: { categoryId: category.id },
                        }"
                        class="header-bottom__link link--uncolored"
                        >{{ category.title }}</RouterLink
                    >
                </nav>
            </div>
        </template>
        <template v-if="!isDesktop">
            <div
                class="header-mobile-main"
                :class="{ '__search-shown': states.isSearchShown }"
            >
                <div class="header-mobile-main__icons-controls">
                    <div
                        class="header-mobile-main__icon menu-btn"
                        @click="toggleState('isMenuShown', 'show')"
                    >
                        <span class="menu-btn__item"></span>
                        <span class="menu-btn__item"></span>
                        <span class="menu-btn__item"></span>
                    </div>
                    <div
                        class="
                            header-mobile-main__icon
                            header-mobile-main__icon-search
                            __icon-actions-search
                        "
                        @click="toggleState('isSearchShown')"
                    ></div>
                    <div class="header-mobile-main__search-block">
                        <SelectSearch
                            class="header-main__input-field"
                            v-bind="searchCompProps"
                            :options="selectSearchOptions"
                            selectFilterKey="category"
                        ></SelectSearch>
                    </div>
                </div>
                <RouterLink
                    :to="{ name: 'home' }"
                    class="header-mobile-main__logo"
                >
                    <img :src="logo" alt="Freshnesecom" />
                </RouterLink>
                <div class="header-mobile-main__icons-ui">
                    <button
                        class="header-mobile-main__icon __icon-actions-user"
                        @click="addModal('ModalAccount')"
                    ></button>
                    <RouterLink
                        :to="{ name: 'wishlist' }"
                        class="
                            header-mobile-main__icon
                            icon
                            __icon-actions-heart
                        "
                    >
                        <div class="icon__number" v-if="wishlist.length">
                            {{ wishlist.length }}
                        </div>
                    </RouterLink>
                    <button
                        class="header-mobile-main__icon icon __icon-ec-basket"
                        @click="addModal('ModalCart')"
                    >
                        <div class="icon__number" v-if="cart.length">
                            {{ cart.length }}
                        </div>
                    </button>
                </div>
            </div>
            <div class="header-menu" :class="{ __shown: states.isMenuShown }">
                <div
                    class="header-menu__backward"
                    @click="toggleState('isMenuShown', 'hide')"
                >
                    <div
                        class="header-menu__backward-icon __icon-chevron-left"
                    ></div>
                </div>
                <ul class="header-menu__list">
                    <li class="header-menu__item-links">
                        <a href="#" class="link header-menu__link"
                            >Написать нам в чат</a
                        >
                        <a
                            href="tel: +78005553535"
                            class="link--uncolored header-menu__link"
                            >+78005553535</a
                        >
                        <span> info@freshnese.com </span>
                    </li>
                    <li class="header-menu__item-links">
                        <RouterLink
                            :to="{ name: 'blogs' }"
                            class="link header-menu__link"
                            >Блог</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'blogs' }"
                            class="link header-menu__link"
                            >О нас</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'home' }"
                            class="link header-menu__link"
                            >Работа</RouterLink
                        >
                    </li>
                    <li
                        class="header-menu__item"
                        v-for="category in categories"
                        :key="category.id"
                    >
                        <RouterLink
                            :to="{
                                name: 'category',
                                params: {
                                    categoryId: category.id,
                                },
                            }"
                            class="header-menu__link-bold link--uncolored"
                        >
                            {{ category.title }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </template>
    </header>
</template>

<script>
import rootPath from "@/root-path.js";
import { mapGetters, mapMutations } from "vuex";
import logo from "@/assets/img/logo/logo.svg";
import { mediaQueriesHandlers } from "@/assets/js/scripts.js";

export default {
    name: "PageHeader",
    props: {
        headerHeight: Number,
        maxMobileQuery: {
            type: Number,
            required: true,
        },
        routePath: String,
    },
    data() {
        return {
            logo,
            searchResults: [],
            lastScrolled: window.pageYOffset,
            mediaQueries: {
                767: false,
            },
            states: {
                isMenuShown: false,
                isSearchShown: false,
            },
        };
    },
    computed: {
        ...mapGetters(["categories", "cart", "wishlist", "products"]),
        selectSearchCommonProps() {
            return {
                placeholder: "Поиск по товарам, категориям...",
                name: "header-search",
            };
        },
        searchCompProps() {
            const products = this.products;
            const props = {
                ...this.selectSearchCommonProps,
                array: products || [],
                keysForSearch: ["title", "id"],
                resultParams: {
                    image: {
                        key: "images.0",
                        keyValuePrefix: `${rootPath}img/products/[category]/[id]/`,
                    },
                    title: { key: "title" },
                    subtitle: {
                        key: "price",
                        keyValueSuffix: " руб.",
                        className: "--bold",
                    },
                    routerTo: {
                        name: "product",
                        params: { productId: "[id]", pageNumber: 1 },
                    },
                },
            };

            return props;
        },
        selectSearchOptions() {
            const allCategories = { title: "Все категории", value: "all" };

            if (this.categories) {
                const options = this.categories.map((ctg) => {
                    return { title: ctg.title, value: ctg.id };
                });
                options.unshift(allCategories);
                return options;
            }
            return [allCategories];
        },
        isDesktop() {
            return !this.mediaQueries[this.maxMobileQuery];
        },
        isBodyLocked() {
            return this.states.isMenuShown;
        },
    },
    methods: {
        ...mapMutations(["addModal"]),
        mediaQueriesHandlers,
        toggleState(stateName, action) {
            const show = () => (this.states[stateName] = true);
            const hide = () => (this.states[stateName] = false);
            switch (action) {
                case "show":
                    show();
                    break;
                case "hide":
                    hide();
                    break;
                default:
                    this.states[stateName] ? hide() : show();
            }
        },
        refreshStates() {
            for (let state in this.states) {
                this.states[state] = false;
            }
            this.toggleScrollHandler();
        },
        toggleScrollHandler() {
            if (!this.lastScrolled) this.lastScrolled = window.pageYOffset;
            if (this.isDesktop) {
                this.$nextTick().then(() => {
                    this.toggleScroll();
                    window.addEventListener("scroll", this.toggleScroll);
                });
            } else {
                this.$nextTick().then(() => {
                    this.toggleScroll(false);
                    window.removeEventListener("scroll", this.toggleScroll);
                });
            }
        },
        toggleScroll(isSetting = true) {
            const header = this.$refs.header;
            const hTop = this.$refs.headerTop;
            const hMain = this.$refs.headerMain;
            const hBottom = this.$refs.headerBottom;
            const currentScrolled = window.pageYOffset;

            if (!isSetting) {
                header.style.removeProperty("top");
                return;
            }

            if (header && hTop && hMain && hBottom) {
                const isScrollDown =
                    currentScrolled >= this.lastScrolled &&
                    currentScrolled !== 0;
                if (isScrollDown) doSet();
                else undoSet();
            }
            this.lastScrolled = currentScrolled;

            function doSet() {
                header.style.top = `-${hTop.offsetHeight}px`;
                hMain.style.padding = "20px 0";
                hBottom.style.marginTop = `-${hBottom.offsetHeight}px`;
            }
            function undoSet() {
                header.style.removeProperty("top");
                hBottom.style.removeProperty("margin-top");
                if (window.pageYOffset === 0)
                    hMain.style.removeProperty("padding");
            }
        },
    },
    watch: {
        isDesktop() {
            this.refreshStates();
        },
        isBodyLocked(bool) {
            const body = document.body;
            bool
                ? body.classList.add("__no-scroll")
                : body.classList.remove("__no-scroll");
        },
        routePath() {
            this.refreshStates();
        },
    },
    mounted() {
        this.mediaQueriesHandlers();
        this.toggleScrollHandler();
    },
};
</script>