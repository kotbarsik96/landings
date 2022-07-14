<template>
   <div class="footer__item" :class="{ '__active': isShown }" @click="$emit('toggleFooterItem')">
      <div class="item__header">Категории</div>
      <ul class="item__list">
         <li>
            <RouterLink :to="{ name: 'category', params: { categoryTitle: 'road' } }">ROAD SERIES</RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'category', params: { categoryTitle: 'street' } }">STREET SERIES</RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'category', params: { categoryTitle: 'offroad' } }">MOUNTAIN SERIES</RouterLink>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: "FooterCategories",
   props: {
      isShown: Boolean
   },
   emits: ["toggleFooterItem"]
};
</script>