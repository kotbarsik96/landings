<template>
    <component :is="tag" class="blogcard-small" v-if="blogData">
        <div class="blogcard-small__info">
            <h5 class="blogcard-small__info-title">
                <RouterLink
                    :to="{ name: 'blog-item', params: { blogId: blogData.id } }"
                >
                    {{ blogData.title }}
                </RouterLink>
            </h5>
            <div class="blogcard-small__info-author">
                <div class="blogcard-small__info-name">
                    {{ blogAuthor.name }}
                </div>
                <div class="blogcard-small__info-date">{{ blogData.date }}</div>
            </div>
        </div>
        <div class="blogcard-small__image">
            <RouterLink
                :to="{ name: 'blog-item', params: { blogId: blogData.id } }"
            >
                <img
                    :src="`${rootPath}img/blogs/${blogData.id}/${blogData.image}`"
                    :alt="blogData.title"
                />
            </RouterLink>
        </div>
    </component>
</template>

<script>
import shared from "./shared.js";
import { injectShared } from "@/assets/js/scripts.js";

export default injectShared("BlogCardSmall", shared);
</script>