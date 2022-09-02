<template>
    <div class="links-list" :class="{ '--uncolored': isNoColor }">
        <h4 class="links-list__title title" v-if="$slots.title">
            <slot name="title"></slot>
        </h4>
        <div class="links-list__list">
            <slot></slot>
            <TransitionGroup name="links-list" v-if="$slots.hidden">
                <slot name="hidden" v-if="showHidden"></slot>
            </TransitionGroup>
        </div>
        <button
            class="links-list__more"
            :class="[showHidden ? 'button--left' : 'button--right']"
            v-if="$slots.button"
            @click="showHidden = !showHidden"
        >
            <span>
                <slot name="button"></slot>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: "LinksList",
    props: {
        isNoColor: {
            type: [Boolean, String],
            default: false
        }
    },
    data() {
        return {
            showHidden: false,
        };
    },
    mounted() {
        if (!this.$slots.button) this.showHidden = true;
    },
};
</script>

<style lang="scss">
.links-list {
    &-enter-active,
    &-leave-active {
        transition: all 0.3s !important;
    }
    &-enter-to,
    &-leave-from {
        opacity: 1;
        transform: translate(0, 0);
        max-height: 5em;
    }
    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translate(-50px, 0);
        max-height: 0;
        margin: 0 0 0 0;
    }
}
</style>