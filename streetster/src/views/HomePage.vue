<template>
    <main>
        <section class="start-block homepage__start-block">
            <div class="start-block__wrapper">
                <div class="start-block__container container">
                    <div class="homepage-start__text">
                        <div class="homepage-start__text-small">Streetster Nathan</div>
                        <div class="homepage-start__text-big h1">
                            Удобный и быстрый
                            <br />Твой идеал для покорения города
                        </div>
                    </div>
                    <RouterLink
                        :to="{ name: 'bike-page', params: { bikeId: 'streetster-bakerstreet' } }"
                        class="homepage-start__button button button-bw"
                    >Узнать больше</RouterLink>
                </div>
            </div>
        </section>

        <section class="homepage">
            <div class="homepage__block-1">
                <section class="categories">
                    <div class="h1 h__left container">Категории</div>
                    <Swiper
                        :modules="modules"
                        :centeredSlides="true"
                        loop
                        :breakpoints="{ 0: { slidesPerView: 1 }, 993: { slidesPerView: 2 } }"
                        :navigation="{ prevEl: '.categories-slider__prev', nextEl: '.categories-slider__next', clickable: true }"
                        class="categories-slider"
                    >
                        <div class="swiper-button-prev categories-slider__arrow categories-slider__prev"></div>
                        <div class="swiper-button-next categories-slider__arrow categories-slider__next"></div>
                        <template v-slot:container-start>
                            <img
                                class="categories-slider__shadow categories-slider__shadow--right"
                                :src="`${rootPath}images/categories-slider/shadow.png`"
                            />
                        </template>
                        <SwiperSlide
                            v-for="category in categories"
                            :key="category.title"
                            class="categories-slider__slide"
                        >
                            <div
                                class="ctsl-slide__container"
                                :style="`background-image: url(${rootPath}images/categories-slider/${category.title}-series__bg.png)`"
                            >
                                <RouterLink
                                    :to="{ name: 'category', params: { categoryTitle: category.title } }"
                                    class="ctsl-slide__bike"
                                >
                                    <div class="slide-bike__image">
                                        <img
                                            :src="`${rootPath}images/categories-slider/${category.title}-series__bike.png`"
                                            :alt="`${category.title}-series`"
                                        />
                                    </div>
                                    <div class="slide-bike__text">
                                        <img
                                            :src="`${rootPath}images/categories-slider/${category.title}-series__text.svg`"
                                            :alt="`${category.title}-series`"
                                        />
                                    </div>
                                </RouterLink>
                            </div>
                        </SwiperSlide>
                        <template v-slot:container-end>
                            <img
                                class="categories-slider__shadow categories-slider__shadow--left"
                                :src="`${rootPath}images/categories-slider/shadow.png`"
                            />
                        </template>
                    </Swiper>
                </section>
                <section class="favorites">
                    <div class="favorites__container container">
                        <div class="h1 h__left">Избранные товары</div>
                        <div class="products">
                            <div class="products__block products__block-big">
                                <div class="block-big__text">
                                    <div class="h2">STREETSTER BAKERSTREET</div>
                                    <p>скорость, соединенная с удобством</p>
                                </div>
                                <div class="block-big__product">
                                    <div class="block-big__image">
                                        <img
                                            src="@/assets/images/favorite-products/streetster-bakerstreet.png"
                                            alt="Streetster Bakerstreet"
                                        />
                                    </div>
                                    <div class="block-big__subtract">
                                        <RouterLink :to="{ name: 'bike-page', params: { bikeId: 'streetster-bakerstreet' } }">
                                            <img src="@/assets/images/favorite-products/subtract.svg" />
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                            <div class="products__block-small">
                                <div class="block-small__item products__block">
                                    <RouterLink
                                        :to="{ name: 'bike-page', params: { bikeId: 'streetster-bakerstreet' } }"
                                        class="block-small__item-container"
                                    >
                                        <div class="block-small__image">
                                            <img :src="`${rootPath}images/accessories/octane-helmet.png`" />
                                        </div>
                                        <div class="block-small__text">Шлем Octane</div>
                                    </RouterLink>
                                </div>
                                <div class="block-small__item products__block">
                                    <RouterLink
                                        :to="{ name: 'bike-page', params: { bikeId: 'streetster-bakerstreet' } }"
                                        class="block-small__item-container"
                                    >
                                        <div class="block-small__image">
                                            <img :src="`${rootPath}images/accessories/canyon-protect.png`" />
                                        </div>
                                        <div class="block-small__text">Защита Canyon</div>
                                    </RouterLink>
                                </div>
                                <div class="block-small__item products__block">
                                    <RouterLink
                                        :to="{ name: 'bike-page', params: { bikeId: 'streetster-bakerstreet' } }"
                                        class="block-small__item-container"
                                    >
                                        <div class="block-small__image">
                                            <img :src="`${rootPath}images/accessories/canyon-protect.png`" />
                                        </div>
                                        <div class="block-small__text">Защита Canyon</div>
                                    </RouterLink>
                                </div>
                                <div class="block-small__item products__block">
                                    <RouterLink
                                        :to="{ name: 'bike-page', params: { bikeId: 'streetster-bakerstreet' } }"
                                        class="block-small__item-container"
                                    >
                                        <div class="block-small__image">
                                            <img :src="`${rootPath}images/accessories/octane-helmet.png`" />
                                        </div>
                                        <div class="block-small__text">Шлем Octane</div>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section class="paragraph">
                <div class="paragraph__container container">
                    <p class="paragraph__item">
                        <span>STREETSTER</span> – колёсное транспортное средство (или спортивный снаряд), приводимое в движение мускульной силой человека через ножные педали или (крайне редко) через ручные рычаги.
                    </p>
                    <p class="paragraph__item">В 1817 году немецкий профессор барон Карл фон Дрез из Карлсруэ создал, а в 1818 году запатентовал первый двухколёсный самокат, который он назвал „машиной для бега“ (Laufmaschine). Самокат Дреза был двухколёсным, снабжён рулём и выглядел в целом, как велосипед без педалей; рама была деревянной.</p>
                </div>
            </section>
            <div class="homepage__block-2">
                <section class="description container">
                    <div class="h2 h__center h__margin">Велосипеды Streetster - это...</div>
                    <ul class="bikes-describes cards-list">
                        <li class="describe__item cards-list__item">
                            <div class="describe__image cards-list__image">
                                <img src="@/assets/images/describes-block/support.png" />
                            </div>
                            <div class="describe__text cards-list__text">
                                <div class="describe__header cards-list__header h3">Простота обслуживания</div>
                                <div class="describe__info">Для простоты обслуживания и снижения эксплуатационных расходов ALF 502 имеет модульную конструкцию и минимально использует специализированную оснастку.</div>
                            </div>
                        </li>
                        <li class="describe__item cards-list__item">
                            <div class="describe__image cards-list__image">
                                <img src="@/assets/images/describes-block/construction.png" />
                            </div>
                            <div class="describe__text cards-list__text">
                                <div class="describe__header cards-list__header h3">Надежная конструкция</div>
                                <div class="describe__info">Каждый вид предназначен для сугубо отдельной области. Конструкция опор в таком случае различна и служит для чуть отдельных функций, которые строго нормированы, а также изготавливается из разных материалов.</div>
                            </div>
                        </li>
                        <li class="describe__item cards-list__item">
                            <div class="describe__image cards-list__image">
                                <img src="@/assets/images/describes-block/details.png" />
                            </div>
                            <div class="describe__text cards-list__text">
                                <div class="describe__header cards-list__header h3">Качественные детали</div>
                                <div class="describe__info">Покупка качественных велодеталей – это забота о байке и о себе. Если хотите качественную отдачу от велосипеда, не экономьте на запасных деталях. Лучше вовремя заменить одну деталь, чем слишком поздно два десятка!</div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="news container">
                    <div class="h1 h__center h__margin container">Новости</div>
                    <Swiper
                        :modules="modules"
                        :slidesPerView="1"
                        :spaceBetween="40"
                        loop
                        :breakpoints="{
                     341: {
                        spaceBetween: 0,
                        slidesPerView: 1
                     },
                     890: {
                         slidesPerView: 2,
                     },
                     1320: {
                         slidesPerView: 3,
                     },
                  }"
                        :navigation="{ prevEl: '.news-slider-button__prev', nextEl: '.news-slider-button__next' }"
                        :pagination="{ el: '.streetster-slider__pagination', clickable: true }"
                        class="news-slider"
                    >
                        <div class="swiper-button-prev news-slider-button news-slider-button__prev"></div>
                        <div class="swiper-button-next news-slider-button news-slider-button__next"></div>
                        <SwiperSlide
                            class="news-slider__slide"
                            v-for="blog in blogs"
                            :key="blog.id"
                        >
                            <div class="news__container">
                                <div class="news__image">
                                    <div
                                        class="news__image-img"
                                        :style="`background-image: url(${rootPath}${blog.image});`"
                                    ></div>
                                </div>
                                <div class="news__header h3">{{ blog.title }}</div>
                                <div class="news__text">{{ blog['preview-text-min'] }}</div>
                            </div>
                            <RouterLink
                                :to="{ name: 'blog-item', params: { blogId: blog.id } }"
                                class="news__button button"
                            >Читать</RouterLink>
                        </SwiperSlide>
                        <div class="swiper-pagination streetster-slider__pagination"></div>
                    </Swiper>
                </section>
            </div>
            <div class="homepage__block-3 container">
                <section class="mailing-subscribe">
                    <div class="mailing-subscribe__header h2">Подпишитесь на новостную рассылку</div>
                    <form
                        action="#"
                        class="mailing-subscribe__form"
                    >
                        <div class="mailing-subscribe__input user-inputs__input">
                            <input
                                type="email"
                                name="mailing-sub"
                                placeholder="Email"
                            />
                        </div>
                        <div class="mailing-subscribe__button">
                            <input
                                type="submit"
                                value="Подписаться"
                                class="button button-bw"
                                name="mailing-sub"
                            />
                        </div>
                    </form>
                </section>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import rootPath from "@/root-path.js";

export default {
    name: "HomePage",
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Navigation, Pagination],
        };
    },
    data() {
        return {
            rootPath,
        };
    },
    computed: {
        ...mapGetters(["bikes", "accessories", "categories", "blogs"]),
    },
};
</script>