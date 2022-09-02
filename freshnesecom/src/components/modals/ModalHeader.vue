<template>
    <div class="modal-window__header">
        <component :is="titleTag" class="modal-window__header-title">
            <slot></slot>
        </component>
        <button
            class="
                modal-window__close-button
                button--transparent
                --small
                __icon-actions-close_simple
            "
            @click="$emit('closeClick')"
        >
            <slot name="button">Закрыть</slot>
        </button>
        <div class="modal-window__subtitle" v-if="$slots.subtitle">
            <slot name="subtitle"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalHeader",
    emits: ["closeClick"],
    props: {
        titleTag: {
            type: String,
            default: "h2",
        },
    },
};
</script>