<template>
   <div class="catalogue-block__cards-list cards-list">
      <div class="card-wrapper" :style="{ 'order': '3' }">
         <product-info-card :title="'Распродажа'"></product-info-card>
      </div>
      <div class="card-wrapper" v-for="(prod, index) in catalogueListPage" :key="prod.vendorCode" :style="{ 'order': index.toString() }">
         <product-card-1 :vendorCode="prod.vendorCode"></product-card-1>
      </div>
   </div>
</template>

<script>
export default {
   name: "CatalogueListPage",
   props: {
      catalogueListPage: Object
   },
};
</script>