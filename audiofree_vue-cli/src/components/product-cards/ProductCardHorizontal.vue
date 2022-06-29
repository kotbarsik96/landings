<template>
   <div
      class="product-card card product-card--type-horizontal"
      v-if="product"
   >
      <div class="card__bottom card__side product-card__bottom"></div>
      <div class="card__container card__side product-card__container">
         <router-link
            :to="'/products/' + vendorCode"
            href="../html-products/vendorCode.html"
            class="product-card__image"
         >
            <img :src="'../img/products/' + product.images[0]" alt />
         </router-link>
         <div class="product-card__vertical-info">
            <router-link
               :to="'/products/' + vendorCode"
               href="../html-products/vendorCode.html"
               class="product-card__name"
            >{{ product.name }}</router-link>
            <div class="product-card__rating rating">
               <product-rating :rating="product.rating"></product-rating>
            </div>
            <div class="product-card__price">{{ product.price }} ₽</div>
         </div>
      </div>
   </div>
</template>

<script>
// общая логика компонентов product-card-[x]
import shared from "@/components/product-cards/shared";
import injectShared from "@/components/inject-shared";

const componentStates = injectShared(shared, "ProductCardHorizontal");

export default componentStates;
</script>