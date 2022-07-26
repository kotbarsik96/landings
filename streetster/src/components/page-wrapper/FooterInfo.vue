<template>
   <div class="footer__item" :class="{ '__active': isShown }" @click="$emit('toggleFooterItem')">
      <div class="item__header">Информация</div>
      <ul class="item__list">
         <li>
            <RouterLink :to="{ name: 'contacts', params: {} }">О нас</RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'contacts', params: { 'contacts-reqs': true } }">Контакты</RouterLink>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: "FooterInfo",
   props: {
      isShown: Boolean,
   },
   emits: ["toggleFooterItem"]
};
</script>