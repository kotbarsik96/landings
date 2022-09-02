<template>
    <div class="headline">
        <div class="headline__main">
            <component :is="headlineTag" class="headline__title">
                <slot></slot>
            </component>
            <div class="headline__descr">
                <slot name="descr"></slot>
            </div>
        </div>
        <div class="headline__num">
            <slot name="num"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "SimpleHeadline",
    props: {
        headlineTag: {
            type: String,
            default: "h3"
        }
    }
};
</script>