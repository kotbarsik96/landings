<template>
    <component :is="tag" class="blogcard" v-if="blogData">
        <div class="blogcard__image">
            <RouterLink
                :to="{ name: 'blog-item', params: { blogId: blogData.id } }"
            >
                <img
                    :src="`${rootPath}img/blogs/${blogData.id}/${blogData.image}`"
                    :alt="blogData.title"
                />
            </RouterLink>
        </div>
        <div class="blogcard__tag tag--colored">{{ blogData.category }}</div>
        <h4 class="blogcard__title">
            <RouterLink
                :to="{ name: 'blog-item', params: { blogId: blogData.id } }"
            >
                {{ blogData.title }}
            </RouterLink>
        </h4>
        <div class="blogcard__info">
            <div class="blogcard__info-author">{{ blogAuthor.name }}</div>
            <div class="blogcard__info-date">{{ blogData.date }}</div>
        </div>
    </component>
</template>

<script>
import shared from "./shared.js";
import { injectShared } from "@/assets/js/scripts.js";

export default injectShared("BlogCard", shared);
</script>