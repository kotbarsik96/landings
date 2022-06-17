<template>
   <div class="tab" :class="{ 'tab--vertical': params.isVertical }">
      <div class="tab__titles">
         <div class="tab-spoiler__title tab__title" v-for="(title, index) in titles" :key="index" @click="activeTitle = index" :class="{ '__active': activeTitle === index }">
            <div class="tab__title--text"> {{ title }} </div>
         </div>
      </div>
      <div class="tab__content">
         <slot :name="activeTitle"></slot>
      </div>
   </div>
</template>

<script>
export default {
   name: "InfoTab",
   props: {
      params: Object,
      titles: Array
   },
   data() {
      return {
         activeTitle: 0,
      };
   },
   mounted(){
      console.log(this.$slots);
   }
};
</script>