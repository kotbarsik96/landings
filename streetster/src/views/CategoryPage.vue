<template>
    <main>
        <section class="start-block series__start-block" v-if="bike">
            <div
                class="start-bg__image"
                :style="`background-image: url('${rootPath + category.image}')`"
            ></div>

            <div class="start-block__wrapper">
                <div class="start-block__container container series-block__container">
                    <div class="series-block__bike bike-block">
                        <div
                            class="bike-block__container"
                            :style="`background-image: url('${rootPath + category.image}')`"
                        >
                            <img :src="`${rootPath}${bike.colors.list[0].image}`" />
                        </div>
                    </div>
                    <div class="series-block__info info-block">
                        <div class="info-block__header h1">{{ categoryTitle }} Series</div>
                        <div class="info-block__text">
                            <p> {{ category.description }} </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="category-page">
            <div
                class="category-page__item"
                v-for="catBike in categoryBikes"
                :key="catBike.id"
            >
                <div class="series-item__container container">
                    <div class="series-item__info bike-info">
                        <div class="series-item__info-header bike-info__header">
                            <div class="series-item__info-name bike-info__name h2">{{ catBike.title }}</div>
                            <div class="series-item__info-price bike-info__price">{{ catBike.price + currency }}</div>
                        </div>
                        <div class="series-item__info-text bike-info__text">
                            <p v-for="(p, i) in catBike.description" :key="i"> {{ p }} </p>
                        </div>
                        <div class="series-item__info-colors bike-info__colors">
                            <BikeColors
                                :bike="catBike"
                                v-model="currentColor"
                            ></BikeColors>
                        </div>
                        <div class="series-item__button">
                            <RouterLink
                                :to="{ name: 'bike-page', params: { bikeId: catBike.id } }"
                                class="button"
                            >Подробнее</RouterLink>
                        </div>
                    </div>
                    <div class="series-item__bike">
                        <BikeSlider
                            :bike="catBike"
                            v-model="currentColor"
                        ></BikeSlider>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import BikeSlider from "@/components/bike-section/BikeSlider.vue";
import BikeColors from "@/components/bike-section/BikeColors.vue";
import rootPath from "@/root-path.js";

export default {
    name: "CategoryPage",
    components: {
        BikeSlider,
        BikeColors,
    },
    data() {
        return {
            rootPath,
            currentColor: "",
        };
    },
    methods: {
        findCategoryBikes(bike) {
            return bike.category === this.categoryTitle;
        },
    },
    computed: {
        ...mapGetters(["categories", "bikes", "currency"]),
        categoryTitle() {
            const title = this.$route.params.categoryTitle;
            if (!this.categories.find((category) => category.title === title)) {
                this.$router.push({ name: "404" });
            } else return title;
        },
        category(){
            return this.categories.find(category => category.title === this.categoryTitle);
        },
        bike() {
            return this.bikes.find(this.findCategoryBikes);
        },
        categoryBikes() {
            return this.bikes.filter(this.findCategoryBikes);
        },
    },
};
</script>