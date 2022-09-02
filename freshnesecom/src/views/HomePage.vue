<template>
    <main class="homepage">
        <section class="category-block">
            <div class="category-block__container">
                <LinksList class="category-block__links-list">
                    <template #title>Категории меню</template>
                    <RouterLink
                        class="link"
                        v-for="ctg in categoriesLinks.shown"
                        :key="ctg"
                        :to="{
                            name: 'category',
                            params: { categoryId: ctg.id },
                        }"
                    >
                        {{ ctg.title }}
                    </RouterLink>
                    <template #hidden>
                        <RouterLink
                            class="link"
                            v-for="ctg in categoriesLinks.hidden"
                            :key="ctg"
                            :to="{
                                name: 'category',
                                params: { categoryId: ctg.id },
                            }"
                        >
                            {{ ctg.title }}
                        </RouterLink>
                    </template>
                    <template #button>Больше категорий</template>
                </LinksList>
                <div
                    class="category-block__content"
                    v-if="blogs && blogs.length > 0"
                >
                    <InfoBanner :bannerData="blogs[4]">
                        <template #button>
                            <RouterLink
                                :to="{
                                    name: 'blog-item',
                                    params: { blogId: blogs[4].id },
                                }"
                                class="banner__button"
                                >Читать</RouterLink
                            >
                        </template>
                    </InfoBanner>
                    <InfoBanner :bannerData="blogs[5]">
                        <template #button>
                            <RouterLink
                                :to="{
                                    name: 'blog-item',
                                    params: { blogId: blogs[5].id },
                                }"
                                class="banner__button"
                                >Читать</RouterLink
                            >
                        </template>
                    </InfoBanner>
                </div>
            </div>
        </section>
        <section class="category-block">
            <div class="category-block__container">
                <LinksList class="category-block__links-list">
                    <template #title>Хиты продаж</template>
                    <RouterLink
                        class="link"
                        v-for="ctg in categoriesLinks.shown"
                        :key="ctg"
                        :to="{
                            name: 'category',
                            params: { categoryId: ctg.id },
                        }"
                    >
                        {{ ctg.title }}
                    </RouterLink>
                    <template #hidden>
                        <RouterLink
                            class="link"
                            v-for="ctg in categoriesLinks.hidden"
                            :key="ctg"
                            :to="{
                                name: 'category',
                                params: { categoryId: ctg.id },
                            }"
                        >
                            {{ ctg.title }}
                        </RouterLink>
                    </template>
                    <template #button>Больше категорий</template>
                </LinksList>
                <div class="category-block__content">
                    <ProductCard id="15005"></ProductCard>
                    <ProductCard id="45001"></ProductCard>
                    <ProductCard id="45003"></ProductCard>
                </div>
            </div>
        </section>
        <section class="category-block">
            <div class="category-block__container">
                <LinksList class="category-block__links-list">
                    <template #title>Лучшие фермерские продукты</template>
                    <RouterLink
                        class="link"
                        v-for="ctg in categoriesLinks.shown"
                        :key="ctg"
                        :to="{
                            name: 'category',
                            params: { categoryId: ctg.id },
                        }"
                    >
                        {{ ctg.title }}
                    </RouterLink>
                    <template #hidden>
                        <RouterLink
                            class="link"
                            v-for="ctg in categoriesLinks.hidden"
                            :key="ctg"
                            :to="{
                                name: 'category',
                                params: { categoryId: ctg.id },
                            }"
                        >
                            {{ ctg.title }}
                        </RouterLink>
                    </template>
                    <template #button>Больше категорий</template>
                </LinksList>
                <div class="category-block__content">
                    <ProductCard id="25001"></ProductCard>
                    <ProductCard id="25003"></ProductCard>
                    <ProductCard id="25004"></ProductCard>
                </div>
            </div>
        </section>
        <section class="headlined-section">
            <div class="headlined-section__container">
                <div class="headlined-section__top">
                    <h4 class="headlined-section__top-title">
                        Отзывы наших клиентов
                    </h4>
                    <button
                        class="
                            headlined-section__top-button
                            button--transparent
                        "
                    >
                        К отзывам
                    </button>
                </div>
            </div>
            <div class="headlined-section__content">
                <Swiper
                    tag="ul"
                    class="feedback-list"
                    :modules="modules"
                    loop
                    grabCursor
                    centeredSlides
                    :speed="700"
                    :navigation="{
                        prevEl: '.feedback-list__nav-prev',
                        nextEl: '.feedback-list__nav-next',
                    }"
                    :breakpoints="{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1220: { slidesPerView: 2.7 },
                    }"
                >
                    <div
                        class="
                            feedback-list__nav feedback-list__nav-prev
                            __icon-chevron-left
                            button
                        "
                    ></div>
                    <div
                        class="
                            feedback-list__nav feedback-list__nav-next
                            __icon-chevron-right
                            button
                        "
                    ></div>
                    <SwiperSlide tag="li" class="feedback-list__item">
                        <div class="feedback-list__item-wrapper">
                            <div class="feedback-list__item-text">
                                Задача организации, в особенности же реализация
                                намеченных плановых заданий обеспечивает
                                широкому кругу (специалистов) участие в
                                формировании модели развития. Значимость этих
                                проблем настолько очевидна, что начало
                                повседневной работы по формированию позиции
                                влечет за собой процесс внедрения и модернизации
                                соответствующий условий активизации.
                            </div>
                            <div class="feedback-list__item-initials">
                                Антон Рыбкин
                            </div>
                            <div class="feedback-list__item-image">
                                <img
                                    :src="`${rootPath}img/feedback/1.jpg`"
                                    alt=""
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide tag="li" class="feedback-list__item">
                        <div class="feedback-list__item-wrapper">
                            <div class="feedback-list__item-text">
                                Задача организации, в особенности же реализация
                                намеченных плановых заданий обеспечивает
                                широкому кругу (специалистов) участие в
                                формировании модели развития.
                            </div>
                            <div class="feedback-list__item-initials">
                                Макар Текстов
                            </div>
                            <div class="feedback-list__item-image">
                                <img
                                    :src="`${rootPath}img/feedback/2.jpg`"
                                    alt=""
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide tag="li" class="feedback-list__item">
                        <div class="feedback-list__item-wrapper">
                            <div class="feedback-list__item-text">
                                Задача организации, в особенности же реализация
                                намеченных плановых заданий обеспечивает
                                широкому кругу (специалистов) участие в
                                формировании модели развития. Значимость этих
                                проблем настолько очевидна, что начало
                                повседневной работы по формированию позиции
                                влечет за собой процесс внедрения условий
                                активизации.
                            </div>
                            <div class="feedback-list__item-initials">
                                Олег Панкратов
                            </div>
                            <div class="feedback-list__item-image">
                                <img
                                    :src="`${rootPath}img/feedback/3.jpg`"
                                    alt=""
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide tag="li" class="feedback-list__item">
                        <div class="feedback-list__item-wrapper">
                            <div class="feedback-list__item-text">
                                Задача организации, в особенности же реализация
                                намеченных плановых заданий обеспечивает
                                широкому кругу (специалистов) участие в
                                формировании модели развития. Значимость этих
                                проблем настолько очевидна, что начало
                                повседневной работы по формированию позиции
                                влечет за собой процесс внедрения и модернизации
                                соответствующий условий активизации.
                            </div>
                            <div class="feedback-list__item-initials">
                                Геннадий Горин
                            </div>
                            <div class="feedback-list__item-image">
                                <img
                                    :src="`${rootPath}img/feedback/4.jpg`"
                                    alt=""
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
        <HeadlinedSection v-if="wishlistArray">
            Ваш список желаемого
            <template #button>
                <RouterLink
                    :to="{
                        name: 'wishlist',
                    }"
                    class="headlined-section__top-button button--transparent"
                >
                    Перейти к полному списку
                </RouterLink>
            </template>
            <template #content>
                <ul class="cards-list">
                    <ProductCard
                        v-for="prod in wishlistArray"
                        :key="prod.productId"
                        :id="prod.productId"
                        tag="li"
                        class="cards-list__item"
                    ></ProductCard>
                </ul>
            </template>
        </HeadlinedSection>
        <HeadlinedSection v-if="!wishlistArray">
            Мясо и рыба
            <template #button>
                <RouterLink
                    :to="{
                        name: 'category',
                        params: { categoryId: 'meat-fish' },
                    }"
                    class="headlined-section__top-button button--transparent"
                >
                    Перейти к категории
                </RouterLink>
            </template>
            <template #content>
                <ul class="cards-list">
                    <ProductCard
                        id="35000"
                        tag="li"
                        class="cards-list__item"
                    ></ProductCard>
                    <ProductCard
                        id="35001"
                        tag="li"
                        class="cards-list__item"
                    ></ProductCard>
                    <ProductCard
                        id="35002"
                        tag="li"
                        class="cards-list__item"
                    ></ProductCard>
                    <ProductCard
                        id="35003"
                        tag="li"
                        class="cards-list__item"
                    ></ProductCard>
                </ul>
            </template>
        </HeadlinedSection>
        <HeadlinedSection class="blog-section">
            Читайте наш блог
            <template #button>
                <RouterLink :to="{ name: 'blogs' }" class="button--transparent"
                    >Перейти в блог</RouterLink
                >
            </template>
            <template #content>
                <div class="blog-section__content">
                    <BlogCardBig
                        :blogData="blogs[0]"
                        v-if="blogs[0]"
                    ></BlogCardBig>
                    <BlogCard :blogData="blogs[1]" v-if="blogs[1]"></BlogCard>
                    <div class="blog-section__blogs-list">
                        <BlogCardSmall
                            :blogData="blogs[2]"
                            v-if="blogs[2]"
                        ></BlogCardSmall>
                        <BlogCardSmall
                            :blogData="blogs[3]"
                            v-if="blogs[3]"
                        ></BlogCardSmall>
                        <BlogCardSmall
                            :blogData="blogs[4]"
                            v-if="blogs[4]"
                        ></BlogCardSmall>
                    </div>
                </div>
            </template>
        </HeadlinedSection>
    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import rootPath from "@/root-path.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
    BlogCardBig,
    BlogCard,
    BlogCardSmall,
} from "@/components/blogs/blog-cards/index.js";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import LinksList from "@/components/UI/misc/LinksList.vue";

export default {
    name: "HomePage",
    components: {
        Swiper,
        SwiperSlide,
        BlogCardBig,
        BlogCard,
        BlogCardSmall,
        LinksList,
    },
    data() {
        return {
            rootPath,
            modules: [Navigation],
            linksListMaxPreview: 3,
        };
    },
    computed: {
        ...mapGetters(["categories", "blogs", "wishlist"]),
        wishlistArray() {
            const wishlist = this.wishlist;
            if (wishlist.length < 1) return null;
            return wishlist.filter((el, index) => index < 4);
        },
        categoriesLinks() {
            if (this.categories) {
                const shown = this.categories.filter((ctg, index) => {
                    return index < this.linksListMaxPreview;
                });
                const hidden = this.categories.filter((ctg, index) => {
                    return index >= this.linksListMaxPreview;
                });
                return { shown, hidden };
            }
            return { shown: [], hidden: [] };
        },
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        createBreadcrumbs,
    },
    created() {
        this.createBreadcrumbs();
        this.loadJsonFile("products");
        this.loadJsonFile("categories");
        this.loadJsonFile("blogs");
    },
};
</script>