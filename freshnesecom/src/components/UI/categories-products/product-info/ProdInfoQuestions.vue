<template>
    <div>
        <h4 v-if="!questions" class="title">
            Вопросы к этому товару отсутствуют
        </h4>
        <CommentsBlock v-if="questions" :comments="questions"></CommentsBlock>
    </div>
</template>

<script>
import rootPath from "@/root-path.js";
import CommentsBlock from "@/components/UI/misc/CommentsBlock.vue";

export default {
    name: "ProdInfoQuestions",
    components: { CommentsBlock },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        questions() {
            return this.product.questions;
        },
    },
    data() {
        return {
            rootPath,
        };
    },
};
</script>