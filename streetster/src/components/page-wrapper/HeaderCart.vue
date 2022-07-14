<template>
   <div
      class="cart aside-menu"
      :class="{ '__active': asidesStates.cart }"
      @click="toggleAside($event, 'cart')"
   >
      <div class="cart__wrapper aside-menu__wrapper">
         <div class="cart__container aside-menu__container">
            <div class="cart__icons">
               <div class="icon__cart menu-button">
                  <div
                     class="icon__cart-image __icon-cart"
                     :class="{ '__active': asidesStates.cart }"
                     @click.stop="toggleAside($event, 'cart')"
                  ></div>
               </div>
            </div>

            <div class="cart__amount" v-if="cart.length > 0">Товаров в корзине: {{ cart.length }}</div>
            <div class="cart__amount" v-else>Корзина пуста</div>

            <TransitionGroup tag="div" name="cart-content" class="cart__content cart-content">
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
                        <div class="cart-content__price">{{ prod.prices.bike }} {{ currency }}</div>
                     </div>
                     <div
                        class="cart-content__remove"
                        @click="removeFromCart(prod.orderId, 'bike')"
                     >
                        <div class="delete-cross"></div>
                     </div>
                  </div>
                  <TransitionGroup name="cart-accs" tag="div" class="cart-content__accs">
                     <div class="cart-content__item" v-for="acc in prod.accessories" :key="acc.id">
                        <div class="cart-content__image">
                           <img :src="rootPath + 'images/accessories/' + acc.image" alt />
                        </div>
                        <div class="cart-content__info">
                           <div class="cart-content__name">{{ acc.title }}</div>
                           <div class="cart-content__price">{{ acc.price }} {{ currency }}</div>
                        </div>
                        <div
                           class="cart-content__remove"
                           @click="removeFromCart(prod.orderId, 'accessories', acc.id)"
                        >
                           <div class="delete-cross"></div>
                        </div>
                     </div>
                  </TransitionGroup>
               </div>
            </TransitionGroup>
            <div class="cart__total" v-if="cart.length > 0">
               <span class="__bold">Итого:</span>
               {{ totalPrice.toLocaleString() }} {{ currency }}
            </div>
         </div>
         <div class="cart__order-button">
            <RouterLink :to="{ name: 'cart' }" class="button button-bw">Заказать</RouterLink>
         </div>
      </div>
   </div>
</template>

<script>
// TransitionGroup описаны в styles в компоненте "@/components/cart/CartSection.vue"
import { mapGetters } from "vuex";
import asidesShared from "@/components/page-wrapper/aside-menus-shared.js";
import cartShared from "@/components/cart/shared.js";
import rootPath from "@/root-path.js";

export default {
   name: "CartSection",
   props: {
      asidesStates: {
         type: Object,
         default: {},
      },
      cartType: {
         type: String,
         default: "aside-menu", // || "cart-checkout"
      },
   },
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
      toggleAside: asidesShared.toggleAside,
      removeFromCart: cartShared.removeFromCart,
   },
};
</script>