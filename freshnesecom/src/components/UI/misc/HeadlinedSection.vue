<template>
    <section class="headlined-section">
        <div class="headlined-section__container">
            <div class="headlined-section__top">
                <h4 class="headlined-section__top-title">
                    <slot></slot>
                </h4>
                <div class="headlined-section__top-btn">
                    <slot name="button"></slot>
                </div>
            </div>
            <slot name="content"></slot>
        </div>
    </section>
</template>

<script>
export default {
    name: "HeadlinedSection",
};
</script>