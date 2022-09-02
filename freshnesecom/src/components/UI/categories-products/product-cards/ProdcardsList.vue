<template>
    <TransitionGroup
        :css="false"
        tag="div"
        class="prodcards"
        :class="{
            'prodcards--grid-view': productCardComponent === 'ProductCard',
            'prodcards--list-view': productCardComponent === 'ProductCardBig',
            'prodcards--empty': !isProdIdsArray,
        }"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
        <component
            :is="productCardComponent"
            class="prodcards__item"
            :class="prodcardClassName"
            v-for="(prodId, index) in prodIdsList"
            :key="`${viewType}-${prodId}-${index}`"
            :id="prodId"
        ></component>
        <slot v-if="!isProdIdsArray">
            <div class="prodcards__empty-text" v-if="!isProdIdsArray">
                <div class="__icon-actions-closed_view"></div>
                К сожалению, ничего не найдено
            </div>
        </slot>
    </TransitionGroup>
</template>

<script>
import { pageListItems } from "@/assets/js/transition-anims.js";

export default {
    name: "ProdcardsList",
    props: {
        prodIdsList: Array,
        viewType: {
            type: String,
            default: "list",
        },
        prodcardClassName: String,
    },
    data() {
        return {
            productCardComponent: "ProductCardBig",
            duration: 0.3,
        };
    },
    computed: {
        isProdIdsArray() {
            const list = this.prodIdsList;
            return list ? list.length > 0 : false;
        },
    },
    methods: {
        changeCardComponent() {
            switch (this.viewType) {
                case "list":
                default:
                    this.productCardComponent = "ProductCardBig";
                    break;
                case "grid":
                    this.productCardComponent = "ProductCard";
                    break;
            }
        },
        ...pageListItems,
    },
    mounted() {
        this.changeCardComponent();
    },
};
</script>