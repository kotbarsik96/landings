<template>
   <div class="search" :class="{ '__active': isHideable ? isSearchShown : true }">
      <div class="search__field" :class="{ '__shown-results': isResultsFoundAndShown }">
         <div class="search__icon __icon-search" @click="toggleSearchBlock"></div>
         <div class="search__input">
            <input
               type="text"
               placeholder="Поиск товара"
               v-model="searchQuery"
               @focus="showResults"
               @blur="hideResults"
            />
         </div>
      </div>
      <transition-group
         tag="ul"
         name="header-search"
         class="search-results"
         :style="{ 'display': isResultsFoundAndShown ? '' : 'none' }"
      >
         <router-link
            v-for="prod in searchedProducts"
            :key="prod.vendorCode"
            :to="{ name: 'product', params: { vendorCode: prod.vendorCode } }"
            class="search-results__item"
         >
            <img
               :src="`${rootPath}img/products/${prod.images[0]}`"
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
   props: {
      isHideable: {
         type: Boolean,
         default: false,
      },
   },
   data() {
      return {
         searchQuery: "",
         isSearchShown: false,
         isResultsShown: false,
      };
   },
   methods: {
      toggleSearchBlock() {
         if (this.isHideable) {
            this.isSearchShown = !this.isSearchShown;
         }
      },
      showResults() {
         this.isResultsShown = true;
      },
      hideResults() {
         setTimeout(() => {
            this.isResultsShown = false;
         }, 100);
      },
   },
   computed: {
      ...mapGetters(["products"]),
      searchedProducts() {
         if (!this.searchQuery || this.searchQuery.replace(/\s/g, "") === "")
            return [];

         const searched = [];
         const query = this.searchQuery.toLowerCase();
         for (let prod of this.products) {
            const vendorCode = prod.vendorCode;

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
      isResultsFoundAndShown(){
         return this.isResultsShown && this.searchedProducts.length > 0;
      }
   },
};
</script>