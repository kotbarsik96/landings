<template>
    <div class="info-tab">
        <div class="info-tab__controls">
            <div
                class="info-tab__controls-item"
                :class="{ __active: currentContent === 'description' }"
                @click="currentContent = 'description'"
            >
                <span class="info-tab__controls-title">Описание</span>
                <div class="tag--colored">122</div>
            </div>
            <div
                class="info-tab__controls-item"
                :class="{ __active: currentContent === 'reviews' }"
                @click="currentContent = 'reviews'"
            >
                <span class="info-tab__controls-title">Отзывы</span>
                <div class="tag--colored">15</div>
            </div>
            <div
                class="info-tab__controls-item"
                :class="{ __active: currentContent === 'questions' }"
                @click="currentContent = 'questions'"
            >
                <span class="info-tab__controls-title">Вопросы</span>
                <div class="tag--colored">4</div>
            </div>
        </div>
        <div class="info-tab__content">
            <TransitionGroup name="prodinfo-content" mode="out-in">
                <component
                    :is="currentComponent"
                    :key="currentContent"
                    :product="product"
                ></component>
            </TransitionGroup>
        </div>
    </div>
</template>

<script>
import ProdInfoDescription from "@/components/UI/categories-products/product-info/ProdInfoDescription.vue";
import ProdInfoReviews from "@/components/UI/categories-products/product-info/ProdInfoReviews.vue";
import ProdInfoQuestions from "@/components/UI/categories-products/product-info/ProdInfoQuestions.vue";

export default {
    name: "ProductInfo",
    components: {
        ProdInfoDescription,
        ProdInfoReviews,
        ProdInfoQuestions,
    },
    props: {
        product: Object
    },
    data() {
        return {
            currentContent: "description", // должно совпадать с названием отрисовываемого компонента
        };
    },
    computed: {
        currentComponent() {
            const content = this.currentContent;
            switch (content) {
                case "reviews":
                    return "ProdInfoReviews";
                case "questions":
                    return "ProdInfoQuestions";
                default:
                    return "ProdInfoDescription";
            }
        },
    },
};
</script>

<style lang="scss">
.prodinfo-content {
    &-enter-active,
    &-leave-active {
        transition: all 0.3s;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
    }
}
</style>