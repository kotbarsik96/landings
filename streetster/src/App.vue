<template>
    <div class="wrapper" ref="pageWrapper">
        <LoadingScreen v-if="isLoadingState"></LoadingScreen>
        <PageHeader
            :routePath="routePath"
            :metaFields="metaFields"
        ></PageHeader>
        <RouterView v-slot="{ Component }">
            <Transition name="page-transition" mode="out-in" @after-enter="onAfterPageEnter">
                <Component
                    :is="Component"
                    :key="routePath"
                    ref="pageComponent"
                />
            </Transition>
        </RouterView>
        <PageFooter :routePath="routePath"></PageFooter>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "@/assets/scss/styles.scss";
import PageHeader from "@/components/page-wrapper/PageHeader.vue";
import PageFooter from "@/components/page-wrapper/PageFooter.vue";
import LoadingScreen from "@/components/page-wrapper/LoadingScreen.vue";

export default {
    components: {
        PageHeader,
        PageFooter,
        LoadingScreen,
    },
    data() {
        return {
            metaFields: {},
            isAppLoading: true,
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
        onAfterPageEnter(){
            this.isAppLoading = false;
        },
    },
    computed: {
        ...mapGetters(["isFetching"]),
        routePath() {
            this.getMetaFields(this.$route.meta);
            return this.$route.path;
        },
        isLoadingState() {
            return this.isAppLoading || this.isFetching;
        },
    },
    mounted() {
        this.loadProducts();
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