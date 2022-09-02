<template>
    <div class="input-wrapper">
        <div class="input-wrapper__text-label" v-if="$slots.label">
            <slot name="label"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "InputWrapper"
}
</script>