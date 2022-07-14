<template>
    <div
        class="wrapper"
        ref="pageWrapper"
    >
        <PageHeader
            :routePath="routePath"
            :metaFields="metaFields"
        ></PageHeader>
        <RouterView v-slot="{ Component }">
            <Transition
                name="page-transition"
                mode="out-in"
            >
                <Component
                    :is="Component"
                    :key="routePath"
                />
            </Transition>
        </RouterView>
        <PageFooter :routePath="routePath"></PageFooter>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { createDocumentElement } from "@/assets/js/scripts.js";
import "@/assets/scss/styles.scss";
import PageHeader from "@/components/page-wrapper/PageHeader.vue";
import PageFooter from "@/components/page-wrapper/PageFooter.vue";

export default {
    components: {
        PageHeader,
        PageFooter,
    },
    data() {
        return {
            metaFields: {},
            loadingScreen: null,
        };
    },
    methods: {
        ...mapActions([
            "loadProducts",
            "loadCategories",
            "loadBlogs",
            "addStorageEventEmitters",
            "addStorageArraysHandlers",
        ]),
        getMetaFields(metaFields) {
            if (!metaFields) return (this.metaFields = {});
            this.metaFields = metaFields;
        },
        createLoadingScreen() {
            const loadingScreen = createDocumentElement(
                "div",
                "loading-screen"
            );
            const pLeft = createDocumentElement(
                "div",
                "loading-screen__piece loading-screen__piece--left"
            );
            const pRight = createDocumentElement(
                "div",
                "loading-screen__piece loading-screen__piece--right"
            );

            createSpans(pLeft);
            createSpans(pRight);
            loadingScreen.append(pLeft);
            loadingScreen.append(pRight);

            this.loadingScreen = loadingScreen;

            function createSpans(block) {
                for (let i = 1; i <= 20; i++) {
                    const span = document.createElement("span");
                    span.style.cssText = `--i: ${i};`;
                    block.append(span);
                }
            }
        },
        toggleLoadingScreen() {
            if (!this.loadingScreen) this.createLoadingScreen();

            // если нет pageWrapper - повторить попытку на nextTick
            const pWrapper = this.$refs.pageWrapper;
            if (!pWrapper) {
                this.$nextTick().then(() =>
                    setTimeout(this.toggleLoadingScreen, 10)
                );
                return;
            }

            const children = Array.from(this.$refs.pageWrapper.childNodes);
            const isThreeChildren = children.length === 3;
            const isNoRouterView = children.find((nd) => nd.nodeType === 8);

            if (isThreeChildren && isNoRouterView) {
                this.$refs.pageWrapper.prepend(this.loadingScreen);
            } else this.loadingScreen.remove();
        },
    },
    computed: {
        routePath() {
            this.getMetaFields(this.$route.meta);
            return this.$route.path;
        },
    },
    created() {
        this.toggleLoadingScreen();
    },
    updated() {
        this.toggleLoadingScreen();
    },
    mounted() {
        this.loadProducts("bikes");
        this.loadProducts("accessories");
        this.loadCategories();
        this.loadBlogs();
        this.addStorageEventEmitters().then(this.addStorageArraysHandlers);
    },
};
</script>

<style lang="scss">
.page-transition {
    &-enter-active,
    &-leave-active {
        transition: all 0.75s ease;
    }

    &-enter-to,
    &-leave-from {
        transform: translate(0, 0);
        opacity: 1;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
    &-enter-from {
        transform: translate(-100vw, 0);
    }
    &-leave-to {
        transform: translate(100vw, 0);
    }
}
</style>