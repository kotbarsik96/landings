<template>
   <div class="search" :class="{ '__active': isSearchShown }">
      <div class="search__field" :class="{ '__shown-results': searchedProducts.length > 0 }">
         <div class="search__icon __icon-search" @click="isSearchShown = !isSearchShown"></div>
         <div class="search__input">
            <input type="text" placeholder="Поиск товара" v-model="searchQuery" />
         </div>
      </div>
      <transition-group tag="ul" name="header-search" class="search-results">
         <router-link
            :to="{ name: 'product', params: { vendorCode: prod.vendorCode } }"
            class="search-results__item"
            v-for="prod in searchedProducts"
            :key="prod.vendorCode"
         >
            <img
               :src="`/img/products/${prod.images[0]}`"
               :alt="prod.vendorCode"
               class="search-results__item-image"
            />
            <div class="search-results__item-info">
               <div class="search-results__item-name">{{ prod.name }}</div>
               <div class="search-results__item-rating">
                  <product-rating :rating="prod.rating"></product-rating>
               </div>
               <div class="search-results__item-price">{{ prod.price }} ₽</div>
            </div>
         </router-link>
      </transition-group>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: "SearchField",
   data() {
      return {
         searchQuery: "",
         isSearchShown: false,
      };
   },
   computed: {
      ...mapGetters(["products"]),
      searchedProducts() {
         if (!this.searchQuery || this.searchQuery.replace(/\s/g, "") === "")
            return [];

         const searched = [];
         const query = this.searchQuery.toLowerCase();
         for (let vendorCode in this.products) {
            const prod = this.products[vendorCode];

            if (modifyString(vendorCode).indexOf(modifyString(query)) >= 0) {
               prod.vendorCode = vendorCode;
               searched.push(prod);
               continue;
            }

            for (let key in prod) {
               if (
                  key === "name" &&
                  modifyString(prod[key]).indexOf(modifyString(query)) >= 0
               ) {
                  prod.vendorCode = vendorCode;
                  searched.push(prod);
                  break;
               }
            }
         }

         function modifyString(string) {
            return string.toString().toLowerCase().replace(/\s/g, "");
         }

         return searched;
      },
   },
};
</script>