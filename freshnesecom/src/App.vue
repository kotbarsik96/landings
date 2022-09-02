<template>
    <div class="wrapper">
        <LoadingSection v-if="isLoadingState || !isAppLoaded"></LoadingSection>

        <PageHeader :maxMobileQuery="767" :routePath="routePath"></PageHeader>
        <PageBreadcrumbs :breadcrumbs="breadcrumbs"></PageBreadcrumbs>
        <ModalsWrapper :routePath="routePath"></ModalsWrapper>

        <RouterView
            v-slot="{ Component }"
            @breadcrumbs-change="(bcs) => getBreadcrumbs(bcs)"
        >
            <Transition
                :css="true"
                mode="out-in"
                @beforeEnter="onBeforeEnter"
                @enter="onEnter"
                @leave="onLeave"
            >
                <Component :is="Component" :key="routePath"></Component>
            </Transition>
        </RouterView>

        <PageFooter :isOnlyCopyright="footerCopyright"></PageFooter>
    </div>
</template>

<script>
// !если нужно, чтобы в компоненте выполнялся функционал только после окончания анимации страницы, добавить обработчик события pageAnimationEnd на document, не забыв удалить его в хуке unmounted()!

import { gsap } from "gsap";
import { mapActions, mapGetters } from "vuex";
import "@/assets/styles/styles.scss";
import ModalsWrapper from "@/components/modals/ModalsWrapper.vue";
import PageHeader from "@/components/page/PageHeader.vue";
import PageFooter from "@/components/page/PageFooter.vue";
import PageBreadcrumbs from "@/components/page/PageBreadcrumbs.vue";

export default {
    components: {
        ModalsWrapper,
        PageHeader,
        PageFooter,
        PageBreadcrumbs,
    },
    data() {
        return {
            pageTransDur: 0.8,
            breadcrumbs: [],
            isAppLoaded: false,
        };
    },
    computed: {
        ...mapGetters(["isLoadingState"]),
        routePath() {
            if (this.$route.path.includes("category")) {
                return this.$route.name + this.$route.params.categoryId;
            }
            if (this.$route.path.includes("blog")) {
                return this.$route.name;
            }
            return this.$route.path;
        },
        footerCopyright() {
            return this.$route.meta.footerCopyright;
        },
    },
    methods: {
        ...mapActions([
            "loadJsonFile",
            "getLocalStorageToState"
        ]),
        createLoadingSections() {},
        addLocalStorageListeners() {
            const methods = ["setItem", "removeItem", "clear"];
            for (let method of methods) {
                const srcMethod = localStorage[method];
                localStorage[method] = function () {
                    const changeEvent = new Event("lStorageChange");
                    srcMethod.call(this, ...arguments);
                    document.dispatchEvent(changeEvent);
                };
            }
        },
        onBeforeEnter(el) {
            gsap.set(el, {
                x: "100vw",
                scale: 0.8,
            });
        },
        onEnter(el, done) {
            gsap.to(el, {
                duration: this.pageTransDur,
                scale: 1,
                x: 0,
                ease: "sine",
                onComplete: () => {
                    const event = new Event("pageAnimationEnd");
                    document.dispatchEvent(event);
                    setTimeout(() => {
                        document.dispatchEvent(event);
                    }, 500);
                    done();
                },
            });
        },
        onLeave(el, done) {
            gsap.to(el, {
                duration: this.pageTransDur,
                x: "-100vw",
                scale: 0.8,
                ease: "sine",
                onComplete: done,
            });
        },
        getBreadcrumbs(breadcrumbs) {
            this.breadcrumbs = breadcrumbs;
        },
    },
    watch: {
        routePath() {
            this.loadJsonFile("categories");
        },
    },
    created() {
        this.addLocalStorageListeners();
        this.getLocalStorageToState();
        this.loadJsonFile("products");
    },
    mounted() {
        this.isAppLoaded = true;
    },
};
</script>

<style lang="scss">
.wrapper {
    padding-top: 270px;
    @media (max-width: 992px) {
        padding-top: 310px;
    }

    // maxMobileQuery
    @media (max-width: 767px) {
        padding-top: 80px;
    }
}

.route-transition {
    &-enter-active,
    &-leave-active {
        transition: all 0.8s;
    }

    &-enter-from {
        transform: translate(100vw, 0) scale(0.8);
    }
    &-leave-to {
        transform: translate(-100vw, 0) scale(0.8);
    }

    &-leave-from,
    &-enter-to {
        transform: translate(0, 0) scale(1);
    }
}
</style>