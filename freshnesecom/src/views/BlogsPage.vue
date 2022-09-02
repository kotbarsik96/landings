<template>
    <main class="blogs-page">
        <PageHeadline class="container">
            <template #title>{{ pageRouteTitle }}</template>
            <PageHeadlineItem
                iconName="layout-square_grid"
                :isActive="viewType === 'grid'"
                isControl
                @click="viewType = 'grid'"
                >Сетка</PageHeadlineItem
            >
            <PageHeadlineItem
                iconName="layout-sections"
                :isActive="viewType === 'list'"
                isControl
                @click="viewType = 'list'"
                >Список</PageHeadlineItem
            >
            <PageHeadlineItem>
                Блогов:
                <span class="tag--colored"> {{ blogsList.length }} </span>
            </PageHeadlineItem>
        </PageHeadline>
        <section class="blogs-page__content">
            <div
                class="blogs-page__container"
                :class="{
                    'blogs-page__container--grid-view': viewType === 'grid',
                    'blogs-page__container--list-view': viewType === 'list',
                }"
            >
                <div class="blogs-page__head">
                    <BlogCardBig
                        :blogData="blogs[0]"
                        v-if="blogs[0]"
                    ></BlogCardBig>
                    <BlogCardBig
                        :blogData="blogs[1]"
                        v-if="blogs[1]"
                    ></BlogCardBig>
                </div>
                <InputSearch
                    class="blogs-page__search"
                    name="blogs-search"
                    :array="blogsList"
                    :keysForSearch="['title', 'tags', 'category']"
                    placeholder="Искать по названию, категории, тегу..."
                    :doShowResultsInSearchBody="false"
                    v-model:searchResults="searchResults"
                    v-model:searchQuery="searchQuery"
                >
                    <template #button>Искать</template>
                </InputSearch>
                <div class="blogs-page__body">
                    <div class="blogs-page__links">
                        <LinksList class="blogs-page__links-list">
                            <template #title>Архивы</template>
                            <a href="#" class="link">Июль 2022</a>
                            <a href="#" class="link">Июнь 2022</a>
                            <a href="#" class="link">Май 2022</a>
                            <a href="#" class="link">Апрель 2022</a>
                            <a href="#" class="link">Март 2022</a>
                        </LinksList>
                        <LinksList isNoColor class="blogs-page__links-list">
                            <template #title>Категории</template>
                            <RouterLink
                                class="link"
                                v-for="ctg in blogsCategories"
                                :key="ctg.id"
                                :to="{ name: 'home' }"
                            >
                                {{ ctg.title }}
                            </RouterLink>
                        </LinksList>
                        <SimpleHeadline
                            class="blogs-page__headline"
                            headlineTag="h5"
                        >
                            Присоединяйтесь
                            <template #descr>
                                Войдите, чтобы быть первым, кто узнает об
                                эксклюзивных предложениях, рецептах от мастеров
                                и о другом
                            </template>
                        </SimpleHeadline>
                        <button
                            class="button"
                            @click="
                                addModal({
                                    name: 'ModalSubscribe',
                                    params: { titleTag: 'h4' },
                                })
                            "
                        >
                            Подписаться
                        </button>
                    </div>
                    <RouterView
                        :blogsList="pagesArray[pageNumber - 1]"
                        :blogCardComponent="blogCardComponent"
                    ></RouterView>
                </div>
            </div>
        </section>
        <PaginationControls
            class="container"
            :list="blogsList"
            :pagesAmount="pagesAmount"
            :pageNumber="pageNumber"
            @page-number-click="setPage($event)"
            @next-button-click="setPage(pageNumber + 1)"
            @prev-button-click="setPage(pageNumber - 1)"
        >
            <template #title>Страница:</template>
            <template #button>Следующая страница</template>
            <template #pcs-title>Блогов</template>
        </PaginationControls>
    </main>
</template>

<script>
// параметры анимации и компонентов карточек в списке находятся в BlogsPageList.vue

import {
    BlogCard,
    BlogCardBig,
    BlogCardSmall,
} from "@/components/blogs/blog-cards/index.js";
import pageControls from "@/assets/js/page-controls.js";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import LinksList from "@/components/UI/misc/LinksList.vue";

export default {
    name: "BlogsPage",
    components: {
        BlogCard,
        BlogCardBig,
        BlogCardSmall,
        LinksList,
    },
    data() {
        return {
            viewType: "grid", // "list"
            pageRouteTitle: "Блоги",
            pageRouteName: "blogs-pagenumber",
            categories: [],
            searchResults: [],
            searchQuery: "",
        };
    },
    emits: ["breadcrumbs-change"],
    computed: {
        ...mapGetters(["blogs", "blogsCategories"]),
        blogCardComponent() {
            if (this.viewType === "grid") return "BlogCard";
            if (this.viewType === "list") return "BlogCardSmall";
        },
        maxBlogsOnPage() {
            return 6;
        },
        blogsList() {
            if (this.blogs) return this.blogs;
            return [];
        },
        // постраничная навигация
        pagesArray() {
            // для получения нужной страницы: pagesArray[pageNumber - 1]
            let blogs;
            if (this.searchResults && this.searchQuery)
                blogs = this.searchResults;
            else blogs = this.blogsList;

            const maxBlogs = this.maxBlogsOnPage;
            return pageControls.computed.createPagesArray(blogs, maxBlogs);
        },
        pagesAmount: pageControls.computed.pagesAmount,
        pageNumber: pageControls.computed.pageNumber,
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        ...mapMutations(["addModal"]),
        createBreadcrumbs,
        // постраничная навигация
        checkRoutePageNumber() {
            pageControls.methods.checkRoutePageNumber.call(this);
        },
        setPage: pageControls.methods.setPage,
    },
    watch: {
        // постраничная навигация
        pageNumber: pageControls.watch.pageNumber,
        pagesArray: pageControls.watch.pagesArray,
    },
    created() {
        this.loadJsonFile("blogs");
        if (this.$route.name === "blogs") {
            const pageNumber = this.$route.params.pageNumber || 1;
            this.setPage(pageNumber);
        }
        this.createBreadcrumbs();
    },
};
</script>