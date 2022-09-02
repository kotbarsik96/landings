<template>
    <div class="input-field input-field--combined">
        <slot name="left"></slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
export default {
    name: "InputCombined"
}
</script>