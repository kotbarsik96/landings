<template>
   <main class="empty start-block">
      <div class="start-block__wrapper">
         <div class="start-block__container container">
            <p class="empty__paragraph">К сожалению, данной страницы не существует</p>
            <p class="empty__paragraph">
               <RouterLink :to="{ name: 'home' }" class="button">На Главную</RouterLink>
            </p>
         </div>
      </div>
   </main>
</template>

<script>
export default {
   name: "NotFoundPage",
};
</script>