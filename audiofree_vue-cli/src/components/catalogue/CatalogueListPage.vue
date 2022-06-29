<template>
   <div class="catalogue-block__cards-list cards-list">
      <div class="card-wrapper">
         <product-info-card :title="'Распродажа'"></product-info-card>
      </div>
      <div class="card-wrapper" v-for="prod in catalogueListPage" :key="prod.vendorCode">
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