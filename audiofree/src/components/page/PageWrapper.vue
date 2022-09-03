<template>
    <div class="wrapper">
        <loading-screen v-if="isLoadingState"></loading-screen>
        <page-header></page-header>
        <slot></slot>
        <page-footer></page-footer>
    </div>
</template>

<script>
import PageHeader from "@/components/page/PageHeader";
import PageFooter from "@/components/page/PageFooter";
import LoadingScreen from "@/components/page/LoadingScreen";
import { mapGetters } from "vuex";

export default {
    name: "PageWrapper",
    components: {
        PageHeader,
        PageFooter,
        LoadingScreen,
    },
    data() {
        return {
            isAppLoading: false,
        };
    },
    computed: {
        ...mapGetters(["isFetching", "isProductsLoadError"]),
        isLoadingState() {
            return this.isFetching || this.isAppLoading;
        },
    },
    created() {
        this.isAppLoading = true;
    },
    mounted() {
        this.isAppLoading = false;
        this.$watch(
            () => this.isProductsLoadError,
            (isError) => {
                // выполнится в случае возникновения ошибок при загрузке products.json
                if (isError) {
                    this.$router.push({ name: "not-found" });
                    this.$watch(
                        () => this.$route.path,
                        () => {
                            if (this.isProductsLoadError) {
                                this.$router.push({ name: "not-found" });
                            }
                        }
                    );
                }
            }
        );
    },
};
</script>

<style>
</style>