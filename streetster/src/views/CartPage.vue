<template>
    <main>
        <section class="start-block order-start">
            <div class="start-block__wrapper">
                <div class="start-block__container container">
                    <div class="order-start__header h1">Оформление заказа</div>
                </div>
            </div>
        </section>
        <section class="cart-page">
            <form class="cart-page__container container">
                <CartSection></CartSection>
                <div class="user-info">
                    <div class="user-info__container">
                        <div class="user-info__block user-contacts">
                            <div class="user-info__header h3">
                                Контактная информация
                            </div>
                            <div class="user-inputs">
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">Имя</div>
                                    <div class="user-inputs__input">
                                        <input
                                            type="text"
                                            maxlength="25"
                                            name="user-contacts"
                                        />
                                    </div>
                                </div>
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">Фамилия</div>
                                    <div class="user-inputs__input">
                                        <input
                                            type="text"
                                            maxlength="25"
                                            name="user-contacts"
                                        />
                                    </div>
                                </div>
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">
                                        Номер телефона
                                    </div>
                                    <div class="user-inputs__input">
                                        <input
                                            type="tel"
                                            name="user-contacts"
                                        />
                                    </div>
                                </div>
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">E-mail</div>
                                    <div class="user-inputs__input">
                                        <input
                                            type="tel"
                                            maxlength="12"
                                            name="user-contacts"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-info__block user-payment">
                            <div class="user-info__header h3">
                                Оплата и доставка
                            </div>
                            <div class="user-inputs">
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">
                                        Способ оплаты
                                    </div>
                                    <UserSelect
                                        class="user-inputs__input"
                                        inputName="payment-type"
                                        :options="[
                                            {
                                                title: 'Картой онлайн',
                                                value: 'card-online',
                                            },
                                            {
                                                title: 'Картой при получении',
                                                value: 'card-on-delivery',
                                            },
                                            {
                                                title: 'Наличными при получении',
                                                value: 'cash-on-delivery',
                                            },
                                        ]"
                                        v-model="userSelects.paymentType"
                                    ></UserSelect>
                                </div>
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">
                                        Способ получения
                                    </div>
                                    <UserSelect
                                        class="user-inputs__input"
                                        inputName="delivery-type"
                                        :options="[
                                            {
                                                title: 'Курьером',
                                                value: 'by-courier',
                                            },
                                            {
                                                title: 'Самовывоз',
                                                value: 'pickup',
                                            },
                                        ]"
                                        v-model="userSelects.deliveryType"
                                    ></UserSelect>
                                </div>
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">Город</div>
                                    <div class="user-inputs__input">
                                        <input
                                            type="text"
                                            name="purchase-info"
                                        />
                                    </div>
                                </div>
                                <div class="user-inputs__item">
                                    <div class="user-inputs__name">
                                        Адрес доставки
                                    </div>
                                    <div class="user-inputs__input">
                                        <input
                                            type="text"
                                            name="purchase-info"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import CartSection from "@/components/cart/CartSection.vue";
import UserSelect from "@/components/UI/UserSelect.vue";
import { mapActions } from "vuex";

export default {
    name: "CartPage",
    components: {
        CartSection,
        UserSelect,
    },
    data() {
        return {
            userSelects: {
                paymentType: {},
                deliveryType: {},
            },
        };
    },
    methods: {
        ...mapActions(["loadProducts"]),
    },
    created(){
        this.loadProducts();
    }
};
</script>