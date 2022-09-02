<template>
    <main class="blogitem-page" v-if="blog">
        <section class="blogitem-page__head">
            <div
                class="blogitem-page__head-container"
                :style="{
                    backgroundImage: `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${rootPath}img/blogs/${blog.id}/${blog.image})`,
                }"
            >
                <div class="blogitem-page__head-wrapper blog-wrapper">
                    <table
                        class="
                            blogitem-page__head-info
                            blog-wrapper__aside
                            info-table
                        "
                    >
                        <tr class="info-table__item">
                            <td class="info-table__name">Дата:</td>
                            <td class="info-table__value">{{ blog.date }}</td>
                        </tr>
                        <tr class="info-table__item">
                            <td class="info-table__name">Категория:</td>
                            <td class="info-table__value">
                                {{ blog.category }}
                            </td>
                        </tr>
                        <tr class="info-table__item">
                            <td class="info-table__name">Автор:</td>
                            <td class="info-table__value">
                                {{ blogAuthor.name }}
                            </td>
                        </tr>
                    </table>
                    <h1 class="blogitem-page__head-title blog-wrapper__main">
                        {{ blog.title }}
                    </h1>
                </div>
            </div>
        </section>
        <section class="blogitem-page__content">
            <div class="container">
                <div class="blog-wrapper">
                    <div class="blog-content__aside blog-wrapper__aside">
                        <div class="blog-content__aside-item">
                            <h4 class="blog-content__aside-title">Теги</h4>
                            <div
                                class="
                                    blog-content__aside-content
                                    blog-content__tags
                                "
                            >
                                <div
                                    class="tag--colored"
                                    v-for="tag in blog.tags"
                                    :key="tag"
                                >
                                    {{ tag }}
                                </div>
                            </div>
                        </div>
                        <RouterLink
                            class="button--transparent __icon-directions-left"
                            :to="{ name: 'blogs' }"
                        >
                            Обратно к блогам
                        </RouterLink>
                    </div>
                    <div class="blog-content__main blog-wrapper__main">
                        <template
                            v-for="(node, index) in blog.content"
                            :key="index"
                        >
                            <div
                                v-if="node.type === 'text'"
                                class="blog-content__text-block"
                            >
                                <h4
                                    v-if="node.title"
                                    class="blog-content__text-title"
                                    v-html="parseTitle(node.title)"
                                ></h4>
                                <p
                                    class="blog-content__paragraph"
                                    v-for="(par, i) in node.list"
                                    :key="i"
                                    v-html="parseParagraph(par)"
                                ></p>
                            </div>
                            <div
                                v-if="nodeIsMedia(node)"
                                class="blog-content__media"
                            >
                                <div
                                    v-if="!parseIframe(nodeSrc)"
                                    class="blog-content__media-wrapper"
                                >
                                    <img
                                        v-if="node.type === 'image'"
                                        :src="nodeSrc(node.src)"
                                        :alt="node.title || ''"
                                    />
                                    <video
                                        v-if="
                                            node.type === 'video' &&
                                            !node.src.isNoLocal
                                        "
                                        :src="nodeSrc(node.src)"
                                        controls
                                    ></video>
                                </div>
                                <div
                                    v-if="parseIframe(node.src)"
                                    class="blog-content__media-wrapper"
                                    v-html="parseIframe(node.src)"
                                ></div>
                                <h5
                                    v-if="node.title"
                                    class="blog-content__media-title"
                                >
                                    {{ node.title }}
                                </h5>
                            </div>
                        </template>
                        <div class="blog-content__share">
                            <h4 class="title">Поделиться:</h4>
                            <button class="button __icon-vk --small">VK</button>
                            <button class="button __icon-twitter --small">
                                Twitter
                            </button>
                            <button class="button __icon-linkedin --small">
                                LinkedIn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="blogitem-page__comments-section">
            <div class="container">
                <div class="blogitem-page__reply blog-wrapper">
                    <div class="blog-wrapper__main leave-reply">
                        <h3 class="leave-reply__title">Оставьте комментарий</h3>
                        <div class="leave-reply__account">
                            <div class="leave-reply__signin">
                                Уже есть аккаунт?
                                <button
                                    href="#"
                                    class="link--underlined link--uncolored"
                                    @click="addModal('ModalAccount')"
                                >
                                    Войдите</button
                                >, чтобы ответить
                            </div>
                            <div
                                v-if="user"
                                class="leave-reply__account-inputs"
                            >
                                <InputWrapper>
                                    <template #label>Имя</template>
                                    <InputText
                                        name="signin-user"
                                        placeholder="Имя"
                                    ></InputText>
                                </InputWrapper>
                                <InputWrapper>
                                    <template #label>Email</template>
                                    <InputText
                                        name="signin-user"
                                        placeholder="Email адрес"
                                    ></InputText>
                                </InputWrapper>
                            </div>
                            <InputOption
                                v-if="user"
                                name="signin-user"
                                class="leave-reply__account-checkbox"
                                >Сохранить имя и email в этом браузере для
                                следующих комментариев</InputOption
                            >
                        </div>
                        <div v-if="user" class="leave-reply__comment">
                            <InputWrapper>
                                <template #label>Комментарий</template>
                                <InputText
                                    type="textarea"
                                    name="blog-comment"
                                    placeholder="Место для вашего комментария"
                                    rows="5"
                                ></InputText>
                            </InputWrapper>
                            <button class="button button--colored">
                                Отправить комментарий
                            </button>
                        </div>
                    </div>
                </div>
                <div class="blogitem-page__comments blog-wrapper">
                    <CommentsBlock
                        class="blogitem-page__comments blog-wrapper__main"
                        :comments="blog.comments"
                    >
                        Комментарии
                    </CommentsBlock>
                </div>
            </div>
        </section>
        <HeadlinedSection>
            Похожие темы
            <template #button>
                <RouterLink
                    :to="{
                        name: 'blogs',
                    }"
                    class="button--transparent"
                >
                    К блогам
                </RouterLink>
            </template>
            <template #content>
                <div class="cards-list">
                    <BlogCard
                        v-for="num in 4"
                        :key="num"
                        :blogData="blogs[num - 1]"
                    ></BlogCard>
                </div>
            </template>
        </HeadlinedSection>
    </main>
</template>

<script>
// формат данных указан в data-samples.js

import rootPath from "@/root-path.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
import CommentsBlock from "@/components/UI/misc/CommentsBlock.vue";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import { BlogCard } from "@/components/blogs/blog-cards/index.js";

export default {
    name: "BlogItemPage",
    components: { CommentsBlock, BlogCard },
    data() {
        return {
            rootPath,
            user: false,
        };
    },
    computed: {
        ...mapGetters(["blogs", "users"]),
        blogId() {
            return this.$route.params.blogId;
        },
        blog() {
            return this.blogs.find((blog) => blog.id === this.blogId) || null;
        },
        pageRouteTitle() {
            if (this.blog) return this.blog.title;
            return "";
        },
        previousBreadcrumbs() {
            if (this.blog) {
                return { title: "Блоги", routeTo: { name: "blogs" } };
            }
            return { routeTo: { name: "blogs" } };
        },
        blogAuthor() {
            return this.users.find((ur) => ur.id === this.blog.authorId) || {};
        },
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        ...mapMutations(["addModal"]),
        createBreadcrumbs,
        parseParagraph(html) {
            return html;
        },
        parseTitle(html) {
            return html;
        },
        nodeIsMedia(node) {
            const mediaTypes = ["image", "video"];
            return mediaTypes.includes(node.type);
        },
        nodeSrc(srcData) {
            if (srcData.isNoLocal) return srcData.path;

            if (typeof srcData === "string") {
                return `${rootPath}img/blogs/${this.blog.id}/${srcData}`;
            } else {
                return `${rootPath}img/blogs/${this.blog.id}/${srcData.path}`;
            }
        },
        parseIframe(src) {
            if (src.path) {
                if (src.path.includes("iframe")) return src.path;
            }
            return null;
        },
    },
    watch: {
        pageRouteTitle() {
            this.createBreadcrumbs();
        },
    },
    created() {
        this.loadJsonFile("blogs");
        this.createBreadcrumbs();
    },
};
</script>