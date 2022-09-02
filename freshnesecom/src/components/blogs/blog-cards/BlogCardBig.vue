<template>
    <component :is="tag" class="blogcard-big" v-if="blogData">
        <div class="blogcard-big__image">
            <img
                :src="`${rootPath}img/blogs/${blogData.id}/${blogData.image}`"
                :alt="blogData.title"
            />
        </div>
        <div class="blogcard-big__content">
            <div class="blogcard-big__tag tag--colored">
                {{ blogData.category }}
            </div>
            <div class="blogcard-big__info">
                <h3 class="blogcard-big__info-title">
                    <RouterLink
                        :to="{
                            name: 'blog-item',
                            params: { blogId: blogData.id },
                        }"
                    >
                        {{ blogData.title }}
                    </RouterLink>
                </h3>
                <div class="blogcard-big__info-author">
                    <div class="blogcard-big__info-image">
                        <img
                            :src="rootPath + 'img/users/' + blogAuthor.image"
                            alt=""
                        />
                    </div>
                    <div class="blogcard-big__info-author-name">
                        {{ blogAuthor.name }}
                    </div>
                    <div class="blogcard-big__info-date">
                        {{ blogData.date }}
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>

<script>
import shared from "./shared.js";
import { injectShared } from "@/assets/js/scripts.js";

export default injectShared("BlogCardBig", shared);
</script>