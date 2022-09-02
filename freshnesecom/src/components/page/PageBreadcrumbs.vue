<template>
    <div class="page-breadcrumbs">
        <div class="container" v-if="isBreadcrumbs">
            <TransitionGroup name="breadcrubms-list">
                <RouterLink
                    v-for="(bc, bcIndex) in breadcrumbs"
                    :key="bc.title"
                    :to="bc.routeTo"
                    class="page-breadcrumbs__link link--uncolored"
                    :class="[
                        isCurrentPage(bcIndex)
                            ? 'page-breadcrumbs__current'
                            : 'page-breadcrumbs__prev',
                    ]"
                >
                    {{ bc.title }}
                    <span
                        class="page-breadcrumbs__delimiter"
                        v-if="!isCurrentPage(bcIndex)"
                    >
                        /
                    </span>
                </RouterLink>
            </TransitionGroup>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageBreadcrumbs",
    props: {
        breadcrumbs: Array,
    },
    computed: {
        isBreadcrumbs() {
            if (this.breadcrumbs) return this.breadcrumbs.length > 0;
            return false;
        },
    },
    methods: {
        isCurrentPage(bcIndex) {
            return bcIndex === this.breadcrumbs.length - 1;
        },
    },
};
</script>

<style lang="scss">
.breadcrubms-list {
    $bcslist_duration: 0.3s;
    &-enter-active,
    &-leave-active {
        transition: all $bcslist_duration;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
    }
    &-enter-to {
        transition-delay: $bcslist_duration;
    }
}
</style>