<template>
    <div class="banner">
        <div class="banner__text">
            <div class="banner__subfocus" v-if="bannerData.subtitle">{{ bannerData.subtitle }}</div>
            <h3 class="banner__title title">{{ bannerData.title }}</h3>
        </div>
        <slot name="button"></slot>
    </div>
</template>

<script>
export default {
    name: "InfoBanner",
    props: {
        bannerData: {
            type: Object,
            required: true
        } 
    },
};
</script>