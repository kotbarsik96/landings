<template>
    <TransitionGroup
        tag="ul"
        name="cards-anim"
        class="blogs-page__list"
        v-if="blogsList"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
        <component
            v-for="(blog, blogIndex) in blogsList"
            :key="`${blogCardComponent}-${blog.id}-${blogIndex}`"
            :is="component"
            tag="li"
            :blogData="blog"
        ></component>
        <div class="blogs-page__list--empty" v-if="blogsList.length < 1">
            <span class="__icon-actions-closed_view"></span>
            <p>К сожалению, ничего не найдено</p>
        </div>
    </TransitionGroup>
</template>

<script>
import {
    BlogCard,
    BlogCardBig,
    BlogCardSmall,
} from "@/components/blogs/blog-cards/index.js";
import { pageListItems } from "@/assets/js/transition-anims.js";

// для корректной смены компонентов нужно, чтобы component обновлялся с задержкой, равной длине анимации TransitionGroup
export default {
    name: "BlogsPageList",
    components: {
        BlogCard,
        BlogCardBig,
        BlogCardSmall,
    },
    props: {
        blogsList: {
            type: Array,
            required: true,
        },
        blogCardComponent: {
            type: String,
            default: "BlogCardSmall",
        },
    },
    data() {
        return {
            duration: 0.3,
            component: "BlogCard"
        }
    },
    methods: {
        ...pageListItems,
        changeCardComponent() {
            this.component = this.blogCardComponent;
        }
    },
};
</script>