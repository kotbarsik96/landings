<template>
   <div class="cart cart-checkout">
      <div class="cart__amount" v-if="cart.length > 0">Товаров в корзине: {{ cart.length }}</div>
      <div class="cart__amount" v-else>Корзина пуста</div>

      <div class="cart__wrapper">
         <div class="cart__container">
            <div class="cart__content cart-content">
               <TransitionGroup tag="div" name="cart-content">
                  <div class="cart-content__item" v-for="prod in cart" :key="prod.orderId">
                     <div class="cart-content__body">
                        <div class="cart-content__image">
                           <RouterLink :to="{ name: 'bike-page', params: { bikeId: prod.bikeId } }">
                              <img
                                 :src="rootPath + prod.params.color.data.image"
                                 alt
                              />
                           </RouterLink>
                        </div>
                        <div class="cart-content__info">
                           <div class="cart-content__name">
                              <RouterLink
                                 :to="{ name: 'bike-page', params: { bikeId: prod.bikeId } }"
                              >{{ prod.title }}</RouterLink>
                           </div>
                           <div class="cart-content__params">
                              <span
                                 v-for="(param, paramIndex) in prod.params"
                                 :key="paramIndex"
                              >{{ param.title }}: {{ typeof param.data === "object" ? param.data.name : param.data }}</span>
                           </div>
                        </div>
                        <div
                           class="cart-content__remove"
                           @click="removeFromCart(prod.orderId, 'bike')"
                        >
                           <div class="delete-cross"></div>
                        </div>
                        <div class="cart-content__price">{{ prod.prices.bike }} {{ currency }}</div>
                     </div>
                     <TransitionGroup tag="div" name="cart-accs" class="cart-content__accs">
                        <div
                           class="cart-content__item"
                           v-for="acc in prod.accessories"
                           :key="acc.id"
                        >
                           <div class="cart-content__image">
                              <img :src="rootPath + 'images/accessories/' + acc.image" alt />
                           </div>
                           <div class="cart-content__info">
                              <div class="cart-content__name">{{ acc.title }}</div>
                           </div>
                           <div
                              class="cart-content__remove"
                              @click="removeFromCart(prod.orderId, 'accessories', acc.id)"
                           >
                              <div class="delete-cross"></div>
                           </div>
                           <div class="cart-content__price">{{ acc.price }} {{ currency }}</div>
                        </div>
                     </TransitionGroup>
                  </div>
               </TransitionGroup>
            </div>
         </div>
         <div class="cart__total">
            <p>Доставка: бесплатно</p>
            <p>
               <span class="__bold">Итого:</span>
               {{ totalPrice }} {{ currency }}
            </p>
         </div>
         <div class="cart__buttons">
            <RouterLink :to="{ name: 'home' }" class="button">Продолжить покупки</RouterLink>
            <RouterLink :to="{ name: 'cart' }" class="button">Оформить заказ</RouterLink>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import cartShared from "@/components/cart/shared.js";
import rootPath from "@/root-path.js";

export default {
   name: "CartSection",
   data() {
      return {
         rootPath,
      };
   },
   computed: {
      ...mapGetters(["cart", "bikes", "accessories", "currency"]),
      totalPrice: cartShared.totalPrice,
   },
   methods: {
      removeFromCart: cartShared.removeFromCart,
   },
};
</script>

<style lang="scss">
$cartTransDur: 0.5s;

.cart-content {
   &-enter-active,
   &-leave-active {
      transition: all $cartTransDur;
   }

   &-enter-from,
   &-leave-to {
      opacity: 0;
      transform: translate(-25%, 0);
      max-height: 0;
      padding: 0;
   }

   &-enter-to,
   &-leave-from{
      max-height: 1000px;
   }
}

.cart-accs {
   &-enter-active,
   &-leave-active {
      transition: all $cartTransDur;
      overflow: hidden;
   }

   &-enter-from,
   &-leave-to {
      max-height: 0;
      padding: 0;
   }

   &-enter-to,
   &-leave-from {
      max-height: 700px;
   }
}
</style>