<template>
    <section class="list-controls">
        <div class="list-controls__pages">
            <div class="list-controls__pages-name">
                <slot name="title">Страница:</slot>
            </div>
            <div class="list-controls__pages-list">
                <div
                    class="list-controls__pages-item link--uncolored"
                    :class="{ __active: pageNumber == num }"
                    v-for="num in pagesAmount"
                    :key="num"
                    @click="onLinkClick(num)"
                >
                    {{ num }}
                </div>
            </div>
        </div>
        <button
            v-if="!isInactive"
            class="list-controls__button button--colored"
            :class="{
                '--right': isNextPage,
                '--left': isPrevPage,
                'button--inactive': isInactive,
            }"
            @click="onButtonClick"
        >
            {{ this.isNextPage ? "Следующая страница" : "Предыдущая страница" }}
        </button>
        <div class="list-controls__amount tagged-info">
            <span> <slot name="pcs-title"></slot>: </span>
            <span class="tag--colored">{{ list.length }}</span>
        </div>
    </section>
</template>

<script>
export default {
    name: "PaginationControls",
    props: {
        list: {
            type: Array,
            required: true,
        },
        pagesAmount: {
            type: Number,
            required: true,
        },
        pageNumber: {
            type: Number,
            required: true,
        },
    },
    emits: ["page-number-click", "next-button-click", "prev-button-click"],
    computed: {
        isNextPage() {
            return this.pageNumber < this.pagesAmount;
        },
        isPrevPage() {
            return this.pageNumber > 1 && !this.isNextPage;
        },
        isInactive() {
            return !this.isNextPage && !this.isPrevPage;
        },
    },
    methods: {
        onLinkClick(num) {
            this.$emit("page-number-click", num);
        },
        onButtonClick() {
            if (this.isNextPage) this.$emit("next-button-click");
            if (this.isPrevPage) this.$emit("prev-button-click");
        },
    },
};
</script>