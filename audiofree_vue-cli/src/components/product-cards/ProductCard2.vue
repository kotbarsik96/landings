<template>
   <div
      class="product-card card product-card--type-2"
      v-if="product"
   >
      <div class="card__bottom card__side product-card__bottom"></div>
      <div class="card__container card__side product-card__container">
         <div class="product-card__icons prodcard-icons">
            <div
               class="prodcard-icons__more icon-circle"
               @click="toggleCardIcons"
               :class="{ '__active': isIconsOpened }"
            >
               <div class="icon-circle__item __icon-plus"></div>
            </div>
            <div
               class="prodcard-icons__container"
               ref="cardIconsContainer"
               :class="{ '__active': isIconsOpened }"
            >
               <div class="in-stock __icon-correct">В наличии</div>
               <div class="prodcard-icons__circles">
                  <div
                     class="icon-circle icon-circle--to-favorites"
                     :class="{
                        '__active': isFavorite
                    }"
                     @click="toggleFavorites"
                  >
                     <div class="icon-circle__item __icon-heart"></div>
                  </div>
                  <div class="icon-circle">
                     <div class="icon-circle__item __icon-judge"></div>
                  </div>
               </div>
            </div>
         </div>
         <router-link :to="'/products/' + vendorCode" class="product-card__image">
            <img :src="'../img/products/' + product.images[0]" alt />
         </router-link>
         <router-link :to="'/products/' + vendorCode" class="product-card__name">{{ product.name }}</router-link>
         <div class="product-card__info">
            <div class="product-card__rating rating">
               <product-rating :rating="product.rating"></product-rating>
            </div>
            <div class="product-card__price">{{ product.price }} ₽</div>
         </div>
         <div class="product-card__buttons product-buttons" ref="cardButtons">
            <router-link
               to="/cart-oneclick"
               class="button button--colored-bg"
               @click="addToCart('cartOneclick')"
            >Купить в 1 клик</router-link>
            <button class="button button--to-cart" @click="addToCart()">В корзину</button>
            <a
               href="../html-products/vendorCode.html"
               class="button button--colored-border"
            >Подробней</a>
         </div>
      </div>
   </div>
</template>

<script>
// общая логика компонентов product-card-[x]
import shared from "@/components/product-cards/shared";
import injectShared from "@/components/inject-shared";

const componentStates = injectShared(shared, "ProductCard2");

export default componentStates;
</script>