<template>
   <main>
      <section class="start-block blog-start" v-if="blogs.length > 0">
         <div class="start-block__wrapper">
            <div class="start-block__container blog-start__container container">
               <div class="h1">Новости</div>
               <div class="blog-item">
                  <div class="blog-item__image">
                     <img :src="`${rootPath + blogs[0].image}`" :alt="blogs[0].title" />
                  </div>
                  <div class="blog-item__info blog-info">
                     <div class="blog-info__container">
                        <div class="blog-info__header">
                           <div class="blog-info__title h2">{{ blogs[0].title }}</div>
                           <div class="blog-info__date">{{ blogs[0].date }}</div>
                        </div>
                        <div class="blog-info__text">
                           <p>{{ blogs[0]["preview-text"] }}</p>
                        </div>
                        <div class="blog-info__link">
                           <RouterLink
                              :to="{ name: 'blog-item', params: { blogId: blogs[0].id } }"
                           >Читать дальше</RouterLink>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="start-block empty" v-if="blogs.length <= 0">
         <div class="start-block__wrapper">
            <div class="start-block__container">
               <p class="empty__paragraph">Ещё никто не написал свой блог</p>
               <p class="empty__paragraph">
                  <RouterLink :to="{ name: 'home' }" class="button">На главную</RouterLink>
               </p>
            </div>
         </div>
      </section>
      <section class="blog-list__wrapper" :style="{ 'padding': blogs.length > 0 ? '' : '0px' }">
         <ul class="blog-list container">
            <li class="blog-item" v-for="blog in blogs" :key="blog.id">
               <div class="blog-item__image">
                  <img :src="`${rootPath + blog.image}`" :alt="blog.title" />
               </div>
               <div class="blog-item__info blog-info">
                  <div class="blog-info__container">
                     <div class="blog-info__header">
                        <div class="blog-info__title h2">{{ blog.title }}</div>
                        <div class="blog-info__date">{{ blog.date }}</div>
                     </div>
                     <div class="blog-info__text" v-html="createBlogItemPreviewText(blog)"></div>
                     <div class="blog-info__link">
                        <RouterLink
                           :to="{ name: 'blog-item', params: { blogId: blog.id } }"
                        >Читать дальше</RouterLink>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </section>
   </main>
</template>

<script>
import { mapGetters } from "vuex";
import { cutTxt } from "@/assets/js/scripts.js";
import rootPath from "@/root-path.js";

export default {
   name: "BlogPage",
   data() {
      return {
         rootPath,
      };
   },
   computed: {
      ...mapGetters(["blogs"]),
   },
   methods: {
      createBlogItemPreviewText(blog) {
         const content = blog.content;
         const symbolsLimit = 450;
         let previewText = "";

         content.forEach((contentObj) => {
            contentObj.children.forEach((child) => {
               if (child.type === "paragraph") {
                  if (previewText.length < symbolsLimit) {
                     previewText += child.html;
                  }
               }
            });
         });

         if (previewText.length > symbolsLimit) previewText = cutTxt(previewText, symbolsLimit);
         return previewText;
      },
   },
};
</script>