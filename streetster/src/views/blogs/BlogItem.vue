<template>
   <main>
      <section class="start-block blog-start blog-page__start">
         <div class="start-block__wrapper">
            <div class="start-block__container container" v-if="blog">
               <div
                  class="blog-header"
                  :style="`background-image: url('${rootPath + blog.image}')`"
               >
                  <div class="blog-header__text blog-text">
                     <div class="blog-text__header h2">{{ blog.title }}</div>
                     <div class="blog-text__date">{{ blog.date }}</div>
                  </div>
                  <div class="blog-header__gradient"></div>
               </div>
            </div>
         </div>
      </section>

      <section class="blog-page" v-if="blog">
         <div class="blog-page__container container">
            <div class="blog-content" v-for="(contentData, contentIndex) in blog.content" :key="contentIndex">
               <div class="blog-content__header h2" v-if="contentData.title">{{ contentData.title }}</div>
               <div class="blog-content__text">
                  <template v-for="(child, childIndex) in contentData.children" :key="childIndex">
                     <div
                        class="blog-content__header h3"
                        v-if="child.type === 'subtitle'"
                        v-html="child.html"
                     ></div>
                     <p
                        class="blog-content__paragraph"
                        v-if="child.type === 'paragraph'"
                        v-html="child.html"
                     ></p>
                     <div class="blog-content__media" v-if="child.type === 'media'">
                        <component
                           :is="child.tag"
                           :ref="mediaRef(childIndex + contentIndex)"
                           :attrs="addAttributes(mediaRef(childIndex + contentIndex), child.attrs)"
                        ></component>
                     </div>
                  </template>
               </div>
            </div>
         </div>
      </section>
   </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import rootPath from "@/root-path.js";

export default {
   name: "BlogItem",
   data() {
      return {
         rootPath,
      };
   },
   computed: {
      ...mapGetters(["blogs"]),
      blogId() {
         const id = this.$route.params.blogId;
         if(!this.blogs.find(blog => blog.id === id)) {
            this.$router.push({ name: "404" });
         }
         else return id;
      },
      blog() {
         return this.blogs.find((bl) => bl.id === this.blogId);
      },
   },
   methods: {
      ...mapActions(["loadBlogs"]),
      mediaRef(childIndex) {
         return `children-${childIndex}-media`;
      },
      addAttributes(mediaRef, attrs) {
         this.$nextTick().then(() => {
            const nodes = this.$refs[mediaRef];

            // vue еще не закончил отрисовку
            if (!nodes) this.addAttributes(mediaRef, attrs);
            // vue закончил отрисовку
            else {
               nodes.forEach((nd) => {
                  for (let attr in attrs) {
                     const attrValue = attrs[attr];
                     if (typeof attrValue === "string") {
                        nd[attr] = attrValue;
                     }
                     if (typeof attrValue === "object") {
                        if (attrValue.requiresRootPath) {
                           nd[attr] = rootPath + attrValue.value;
                        } else nd[attr] = attrValue.value;
                     }
                  }
               });
            }
         });
      },
   },
   created(){
      this.loadBlogs();
   },
   mounted() {
      if (!this.blog) {
         this.$router.push({ name: "404" });
      }
   },
};
</script>