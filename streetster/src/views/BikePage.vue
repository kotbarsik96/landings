<template>
    <main
        class="bike-page"
    >
        <div class="start-block bike-page__start-block">
            <div class="start-block__wrapper">
                <div class="start-block__container bike-order container" v-if="bike">
                    <div class="bike-order__slider">
                        <BikeSlider
                            :bike="bike"
                            v-model="currentColorCode"
                        ></BikeSlider>
                    </div>
                    <div class="bike-order__name-price">
                        <div class="bike-order__name h2">{{ bike.title }}</div>
                        <div class="bike-order__price">{{ bike.price }} {{ currency }}</div>
                    </div>
                    <div class="bike-order__params">
                        <BikeColors
                            :bike="bike"
                            v-model="currentColorCode"
                            v-model:colorData="bikeParams.color.data"
                        ></BikeColors>

                        <div
                            class="params"
                            v-for="(param, paramKey) in bike.params"
                            :key="paramKey"
                            ref="paramsBlock"
                        >
                            <div class="params__text">
                                <div class="params__text-title">{{ param.title }}:</div>
                            </div>
                            <form class="params__figures">
                                <label
                                    class="squares__wrapper param__wrapper"
                                    v-for="(opt, optIndex) in param.list"
                                    :key="optIndex"
                                >
                                    <input
                                        type="radio"
                                        :name="paramKey"
                                        @change="bikeParams[paramKey].data = opt"
                                    />
                                    <div class="squares__square-big param__item">
                                        <div class="squares__square-small param__subitem"></div>
                                    </div>
                                    <div class="squares__text">{{ opt.split('/')[0] }}</div>
                                </label>
                            </form>
                        </div>
                    </div>
                    <div class="bike-order__accessories accessories">
                        <div class="accessories__text">Доп. аксессуары:</div>
                        <div class="accessories__list">
                            <div
                                class="accessories-item"
                                v-for="accId in bike['add_accessories']"
                                :key="accId"
                            >
                                <div class="accessories-item__image">
                                    <img
                                        v-if="accessories"
                                        :src="rootPath + 'images/accessories/' + getAcc(accId).image"
                                        alt
                                    />
                                </div>
                                <div class="accessories-item__text">
                                    <div class="accessories-item__name">{{ getAcc(accId).title }}</div>
                                    <div class="accessories-item__price">{{ getAcc(accId).price }}</div>
                                </div>
                                <label class="accessories-item__button button-to-cart">
                                    <input
                                        type="checkbox"
                                        :name="`${bike.id}-accessory`"
                                        :data-accessory="accId"
                                        @change="setCheckedAccs"
                                        ref="accessoriesParam"
                                    />
                                    <div class="button-to-cart__icon"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="bike-order__order">
                        <div class="bike-order__total">
                            <div class="bike-order__total-text">Итого:</div>
                            <p>{{ totalPrice.toLocaleString() }} {{ currency }}</p>
                        </div>
                        <div
                            class="bike-order__button"
                            v-if="!isAddedToCart"
                        >
                            <div
                                class="button"
                                @click="addToCart"
                            >Заказать</div>
                            <div
                                class="button"
                                v-if="lastOrderId"
                                @click="cancelOrder(true)"
                            >Отменить последний заказ</div>
                        </div>
                        <div
                            class="bike-order__button"
                            v-if="isAddedToCart"
                        >
                            <RouterLink
                                :to="{ name: 'cart' }"
                                class="button"
                            >Перейти в корзину</RouterLink>
                            <div
                                class="button"
                                @click="cancelOrder"
                            >Отменить заказ</div>
                            <div
                                class="button"
                                @click="orderMore(false)"
                            >Заказать ещё</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="bike-page__other" v-if="bike">
            <div class="bike-page__info container">
                <div class="bike-page__description">
                    <div class="h3 h__left">Описание</div>
                    <div class="text">
                        <p v-for="(p, i) in bike.description" :key="i"> {{ p }} </p>
                    </div>
                </div>
                <div class="bike-page__feedbacks bike-feedbacks">
                    <div class="h3 h__left">Отзывы</div>
                    <ul class="bike-feedbacks__list">
                        <li class="bike-feedbacks__item">
                            <div class="bike-feedback__user">
                                <div class="user__nickname">Андрей К.</div>
                                <div class="user__rating">
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                </div>
                            </div>
                            <div class="bike-feedback__text text">
                                Отличный велосипед, советую к покупке
                            </div>
                        </li>
                        <li class="bike-feedbacks__item">
                            <div class="bike-feedback__user">
                                <div class="user__nickname">Дмитрий Ж.</div>
                                <div class="user__rating">
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                    <div class="user__rating-item __icon-star"></div>
                                </div>
                            </div>
                            <div class="bike-feedback__text text">
                                Спортивная, стильная модель. Сам по себе занимаюсь спортом. Именно по этой причине мне необходимо было приобрести для себя велосипед. Интересовал качественный вариант. Нравится, чтобы велосипед был спортивным. Понравилась на сайте мне такая модель. У него циклокроссовая комплектация. Поэтому вечерам по дорогам на нем свободно можно кататься. Быстрый, стильный, хорошего качества.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bike-page__models other-models">
                <div class="other-models">
                    <div class="other-models__header h2 container">Другие модели {{ capitalLetter(bike.category) }} Series</div>
                    <div class="other-models__container container">
                        <div class="other-models__list">
                            <BikeCard
                                v-for="bikeId in otherBikes"
                                :key="bikeId"
                                :modelId="bikeId"
                            ></BikeCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import { getProdById, lStorage, capitalLetter } from "@/assets/js/scripts.js";
import BikeSlider from "@/components/bike-section/BikeSlider.vue";
import BikeColors from "@/components/bike-section/BikeColors.vue";
import BikeCard from "@/components/bike-section/BikeCard.vue";
import rootPath from "@/root-path.js";

export default {
    name: "BikePage",
    components: {
        BikeSlider,
        BikeColors,
        BikeCard,
    },
    data() {
        return {
            rootPath,
            isAddedToCart: false,
            currentColorCode: "",
            checkedAccs: [],
            lastOrderId: null,
            bikeParams: {
                color: {
                    title: "Цвет",
                    data: null,
                },
            },
            prices: {
                bike: 0,
                accessories: 0,
            },
        };
    },
    computed: {
        ...mapGetters(["bikes", "accessories", "currency"]),
        bikeId() {
            const id = this.$route.params.bikeId;
            if (!this.bikes.find((bike) => bike.id === id)) {
                this.$router.push({ name: "404" });
            } else return id;
        },
        bike() {
            return getProdById(this.bikes, this.bikeId);
        },
        totalPrice() {
            return this.prices.bike + this.prices.accessories || 0;
        },
        otherBikes() {
            return this.bike.otherModels || [];
        },
    },
    methods: {
        capitalLetter,
        getAcc(id) {
            return getProdById(this.accessories, id);
        },
        setCheckedParamInputs(index = 0) {
            const params = this.$refs.paramsBlock;
            params.forEach((param) => {
                const input = param.querySelectorAll("input")[index];
                if (input) {
                    input.checked = true;
                    input.dispatchEvent(new Event("change"));
                }
            });
        },
        setCheckedAccs() {
            const inputs = this.$refs.accessoriesParam;
            this.checkedAccs = inputs.filter((inp) => inp.checked);
            this.getPrices();
        },
        setParamsTitles() {
            for (let key in this.bike.params) {
                const param = this.bike.params[key];
                this.bikeParams[key] = {
                    title: param.title,
                    data: null,
                };
            }
        },
        getPrices() {
            this.prices.bike = parseInt(this.bike.price);

            let accsPrice = 0;
            this.checkedAccs.forEach((inp) => {
                const accData = this.getAcc(inp.dataset.accessory);
                const price = parseInt(accData.price);
                accsPrice += price;
            });
            this.prices.accessories = accsPrice;
        },
        addToCart() {
            const cart = lStorage.getItem("cart") || [];
            const bikeData = this.bike;
            const params = this.bikeParams;
            const accessories = this.checkedAccs.map((inp) => {
                const accData = this.getAcc(inp.dataset.accessory);
                return accData;
            });
            const prices = this.prices;
            const orderId = Date.now();
            this.lastOrderId = orderId;

            const orderData = {
                title: bikeData.title,
                bikeId: bikeData.id,
                params,
                orderId,
                accessories,
                prices,
            };

            cart.push(orderData);
            lStorage.setItem("cart", cart);
            this.isAddedToCart = true;
        },
        cancelOrder() {
            const cart = lStorage.getItem("cart") || [];
            const index = cart.findIndex(
                (item) => item.orderId === this.lastOrderId
            );
            cart.splice(index, 1);
            lStorage.setItem("cart", cart);
            this.lastOrderId = null;
            this.isAddedToCart = false;
        },
        orderMore(doDeleteLastId = false) {
            this.isAddedToCart = false;
            if (doDeleteLastId) this.lastOrderId = null;
        },
    },
    created() {
        if (this.bike) {
            this.setParamsTitles();
        }
    },
    mounted() {
        if (this.bike) {
            this.setCheckedParamInputs();
            this.getPrices();
        }
    },
};
</script>