<template>
    <main class="checkout-page">
        <div class="checkout-page__container">
            <div class="checkout-page__steps">
                <div class="checkout-page__step-block">
                    <SimpleHeadline>
                        Информация о покупателе
                        <template #descr
                            >Пожалуйста, введите Ваши контактные
                            данные</template
                        >
                        <template #num>Шаг 1 из 5</template>
                    </SimpleHeadline>
                    <div class="checkout-page__text-inputs">
                        <InputWrapper>
                            <template #label>Имя</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Имя"
                            ></InputText>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Фамилия</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Фамилия"
                            ></InputText>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Email адрес</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Email адрес"
                            ></InputText>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Номер телефона</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Номер телефона"
                            ></InputText>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Адрес</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Адрес"
                            ></InputText>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Населенный пункт</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Населенный пункт"
                            ></InputText>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Страна</template>
                            <InputSelect
                                :options="[
                                    { title: 'Россия', value: 'russia' },
                                    { title: 'Казахстан', value: 'kazakhstan' },
                                    { title: 'Украина', value: 'ukraine' },
                                    { title: 'Беларусь', value: 'belarus' },
                                ]"
                                name="billing-info"
                            ></InputSelect>
                        </InputWrapper>
                        <InputWrapper>
                            <template #label>Почтовый индекс</template>
                            <InputText
                                class="--border"
                                name="billing-info"
                                placeholder="Почтовый индекс"
                            ></InputText>
                        </InputWrapper>
                    </div>
                    <InputOption
                        class="checkout-page__option--block"
                        name="different-address"
                    >
                        Доставка на другой адрес?
                        <template #content>
                            <InputWrapper>
                                <template #label
                                    >Пожалуйста, введите адрес
                                    доставки</template
                                >
                                <InputText
                                    name="different-address"
                                    placeholder="Адрес"
                                ></InputText>
                            </InputWrapper>
                        </template>
                    </InputOption>
                </div>
                <div class="checkout-page__step-block">
                    <SimpleHeadline>
                        Способ доставки
                        <template #descr
                            >Пожалуйста, выберите способ доставки</template
                        >
                        <template #num>Шаг 2 из 5</template>
                    </SimpleHeadline>
                    <div class="checkout-page__step-options">
                        <InputOption type="radio" name="billing-method">
                            СДЭК
                            <template #add>
                                <span style="color: var(--clr-2_A)"
                                    >+320 руб.</span
                                >
                                <span>К цене</span>
                            </template>
                            <template #image>
                                <img
                                    src="@/assets/img/checkout/cdek.png"
                                    alt="СДЭК"
                                />
                            </template>
                        </InputOption>
                        <InputOption type="radio" name="billing-method">
                            BoxBerry
                            <template #add>
                                <span style="color: var(--clr-2_A)"
                                    >+150 руб.</span
                                >
                                <span>К цене</span>
                            </template>
                            <template #image>
                                <img
                                    src="@/assets/img/checkout/boxberry.png"
                                    alt="BoxBerry"
                                />
                            </template>
                        </InputOption>
                    </div>
                </div>
                <div class="checkout-page__step-block">
                    <SimpleHeadline>
                        Способ оплаты
                        <template #descr
                            >Пожалуйста, выберите способ оплаты</template
                        >
                        <template #num>Шаг 3 из 5</template>
                    </SimpleHeadline>
                    <div class="checkout-page__step-options">
                        <InputOption name="payment-type" type="radio">
                            Visa
                            <template #image>
                                <img
                                    src="@/assets/img/checkout/visa.png"
                                    alt="Visa"
                                />
                            </template>
                            <template #content>
                                <PaymentBlock></PaymentBlock>
                            </template>
                        </InputOption>
                        <InputOption name="payment-type" type="radio">
                            MasterCard
                            <template #image>
                                <img
                                    src="@/assets/img/checkout/mastercard.png"
                                    alt="Mastercard"
                                />
                            </template>
                            <template #content>
                                <PaymentBlock></PaymentBlock>
                            </template>
                        </InputOption>
                        <InputOption name="payment-type" type="radio">
                            Мир
                            <template #image>
                                <img
                                    src="@/assets/img/checkout/mir.png"
                                    alt="Мир"
                                />
                            </template>
                            <template #content>
                                <PaymentBlock></PaymentBlock>
                            </template>
                        </InputOption>
                        <InputOption name="payment-type" type="radio">
                            Система Быстрых Платежей
                            <template #image>
                                <img
                                    src="@/assets/img/checkout/sbp.png"
                                    alt="СБП"
                                />
                            </template>
                            <template #content>
                                <PaymentBlock></PaymentBlock>
                            </template>
                        </InputOption>
                    </div>
                </div>
                <div class="checkout-page__step-block">
                    <SimpleHeadline>
                        Дополнительная информация
                        <template #descr
                            >Нужно что-нибудь ещё? Мы сделаем это для
                            Вас!</template
                        >
                        <template #num>Шаг 4 из 5</template>
                    </SimpleHeadline>
                    <InputWrapper>
                        <template #label>Комментарии к заказу</template>
                        <InputText
                            type="textarea"
                            name="order-notes"
                            rows="5"
                            placeholder="Нужно доставить в конкретный день? Отправляете подарок? Напишите..."
                        ></InputText>
                    </InputWrapper>
                </div>
                <div class="checkout-page__step-block">
                    <SimpleHeadline>
                        Подтверждение
                        <template #descr
                            >Сделайте пару кликов и ваш заказ будет
                            отправлен!</template
                        >
                        <template #num>Шаг 5 из 5</template>
                    </SimpleHeadline>
                    <div class="checkout-page__step-options">
                        <InputOption name="order-confirmation">
                            Я согласен на получение рассылки. Обещаем, без
                            спама!
                        </InputOption>
                        <InputOption name="order-confirmation">
                            Я согласен с &nbsp;
                            <span style="text-decoration: underline"
                                >условиями</span
                            >
                            &nbsp; и &nbsp;
                            <span style="text-decoration: underline"
                                >политикой конфиденциальности</span
                            >
                            .
                        </InputOption>
                    </div>
                </div>
                <button class="checkout-page__button button--colored --big">
                    Оплатить заказ
                </button>
                <div class="checkout-page__security">
                    <img src="@/assets/img/logo/security.svg" alt="Security" />
                    <p class="title">Ваши данные в безопасности</p>
                    <p>
                        Мы используем самые передовые технологии беозпасности
                        для обеспечения сохранности ваших даннных.
                    </p>
                </div>
            </div>
            <div class="checkout-page__summary summary">
                <SimpleHeadline>
                    Итог
                    <template #descr>
                        Цена может измениться в зависимости от способа доставки
                    </template>
                </SimpleHeadline>
                <CartList class="summary__cart-list"></CartList>
                <div class="summary__prices">
                    <div class="summary__prices-item">
                        <div class="summary__price-name">Подитог</div>
                        <div class="summary__price-value">720 руб.</div>
                    </div>
                    <div class="summary__prices-item">
                        <div class="summary__price-name">Доставка</div>
                        <div class="summary__price-value">0 руб.</div>
                    </div>
                </div>
                <InputText
                    class="summary__promocode"
                    name="promocode"
                    placeholder="Ввести промокод"
                    :submitButton="'Применить'"
                ></InputText>
                <div class="summary__total">
                    <div class="summary__total-text">
                        <p>Итоговая стоимость заказа</p>
                        <p style="color: var(--clr-2_A)">
                            Гарантированное время доставки: 15 августа 2022
                        </p>
                    </div>
                    <div class="summary__total-price">720 руб.</div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions } from "vuex";
import rootPath from "@/root-path.js";
import createBreadcrumbs from "@/assets/js/breadcrumbs.js";
import PaymentBlock from "@/components/UI/inputs/PaymentBlock.vue";
import CartList from "@/components/UI/categories-products/CartList.vue";

export default {
    name: "CheckoutPage",
    components: {
        PaymentBlock,
        CartList,
    },
    emits: ["breadcrumbs-change"],
    data() {
        return {
            rootPath,
            pageRouteTitle: "Оформление заказа"
        };
    },
    methods: {
        ...mapActions(["loadJsonFile"]),
        createBreadcrumbs,
    },
    created() {
        this.loadJsonFile("products");
        this.createBreadcrumbs();
    },
};
</script>