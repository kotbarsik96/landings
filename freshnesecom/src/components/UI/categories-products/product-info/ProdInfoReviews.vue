<template>
    <div>
        <h4 v-if="!reviews" class="title">
            Отзывов к этому товару еще никто не оставлял
        </h4>
        <CommentsBlock v-if="reviews" :comments="reviews"></CommentsBlock>
    </div>
</template>

<script>
import rootPath from "@/root-path.js";
import CommentsBlock from "@/components/UI/misc/CommentsBlock.vue";

export default {
    name: "ProdInfoReviews",
    components: { CommentsBlock },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        reviews() {
            return this.product.reviews;
        }
    },
    data() {
        return {
            rootPath,
        };
    },
};
</script>