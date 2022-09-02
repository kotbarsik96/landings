<template>
    <section class="page-headline">
        <h1 class="page-headline__title">
            <slot name="title"></slot>
        </h1>
        <ul class="page-headline__info">
            <slot></slot>
        </ul>
    </section>
</template>

<script>

export default {
    name: "PageHeadline",
};
</script>