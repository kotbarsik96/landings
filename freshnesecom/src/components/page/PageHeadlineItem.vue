<template>
    <li
        class="page-headline__item"
        :class="[
            iconClassName,
            { 'page-headline__item-control': isControl },
            { __active: isActive },
        ]"
    >
        <slot></slot>
    </li>
</template>

<script>
export default {
    name: "PageHeadlineItem",
    props: {
        isActive: Boolean,
        // все возможные варианты после __icon- (т.е. названия иконочных шрифтов)
        iconName: String,
        isControl: Boolean
    },
    computed: {
        iconClassName() {
            if(this.iconName) return `__icon-${this.iconName}`;
            return "";
        },
    },
};
</script>