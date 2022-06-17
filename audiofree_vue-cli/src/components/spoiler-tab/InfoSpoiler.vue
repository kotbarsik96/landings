<template>
   <div class="spoiler">
      <div class="spoiler__item" v-for="(title, index) in titles" :key="index" ref="spoilerNode">
         <div class="spoiler__title" @click="toggleSpoiler(index)">{{ title }}</div>
         <div class="spoiler__content">
            <slot :name="index"></slot>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "InfoSpoiler",
   props: {
      params: Object,
      titles: Array
   },
   data() {
      return {
         spoilerNodesData: [],
      };
   },
   methods: {
      getSpoilerNodesData() {
         this.spoilerNodesData = this.$refs.spoilerNode.map((node) => {
            const titleNode = node.querySelector(".spoiler__title");
            const contentNode = node.querySelector(".spoiler__content");
            const height = contentNode.offsetHeight;

            return { node, titleNode, contentNode, height };
         });
      },
      toggleSpoiler(number) {
         const spoilerData = this.spoilerNodesData[number];
         const isShown = spoilerData.titleNode.classList.contains("__active");

         isShown
            ? this.hideSpoiler(spoilerData)
            : this.showSpoiler(spoilerData);
      },
      showSpoiler(spoilerData) {
         if (this.params.isAccordeon) this.hideAllSpoilers();

         spoilerData.titleNode.classList.add("__active");
         spoilerData.contentNode.style.cssText = `max-height: ${spoilerData.height}px;`;
      },
      hideSpoiler(spoilerData) {
         spoilerData.titleNode.classList.remove("__active");
         spoilerData.contentNode.style.cssText =
            "max-height: 0px; padding: 0px; margin-bottom: 25px";
      },
      hideAllSpoilers() {
         this.spoilerNodesData.forEach((spoilerData) =>
            this.hideSpoiler(spoilerData)
         );
      },
   },
   mounted() {
      this.getSpoilerNodesData();
      this.$nextTick().then(this.hideAllSpoilers);
      console.log(this.$slots);
   },
};
</script>