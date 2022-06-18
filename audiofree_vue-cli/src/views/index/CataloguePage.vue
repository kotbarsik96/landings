<template>
   <main class="catalogue-page">
      <section class="catalogue-page__block catalogue-block">
         <div class="catalogue-block__container container">
            <div class="catalogue-block__title">
               <div class="page-title">
                  <div class="page-title__links">
                     <router-link to="/" class="page-title__arrow-back __icon-back-arrow"></router-link>
                     <router-link to="/" class="page-title__link-back">Главная</router-link>
                     <router-link to="/catalogue" class="page-title__link-back">Каталог</router-link>
                  </div>
                  <div class="page-title__title">Каталог</div>
               </div>
            </div>
            <div class="catalogue-block__aside">
               <div class="card filter">
                  <div class="card__bottom card__side"></div>
                  <div
                     class="card__container spoiler-elem card__side filter__container"
                     data-is-spoiler="max, 949"
                  >
                     <div class="filter__title spoiler-elem__title">
                        <div class="filter__title-text">Фильтр товаров</div>
                        <div class="filter__title-icon __icon-filter"></div>
                     </div>
                     <div class="filter__main spoiler-elem__content">
                        <div class="filter-block filter-block--select">
                           <div
                              class="select"
                              data-dynamic-adaptive="min, 950, catalogue-block__title"
                           >
                              <div class="select__options-list">
                                 <div class="select__option" data-select-value="price">По цене</div>
                                 <div
                                    class="select__option"
                                    data-select-value="popular"
                                 >По популярности</div>
                                 <div class="select__option" data-select-value="name">По названию</div>
                              </div>
                           </div>
                        </div>
                        <div class="filter-block">
                           <div class="filter-block__title">Бренд:</div>
                           <div class="filter-block__list">
                              <label class="checkcircle">
                                 <input type="checkbox" name="brand" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Samsung
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="brand" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Huawei
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="brand" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Meizu
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="brand" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Phillips
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="brand" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Apple AirPods
                                 </div>
                              </label>
                           </div>
                        </div>
                        <div class="filter-block">
                           <div class="filter-block__title">Категория:</div>
                           <div class="filter-block__list">
                              <label class="checkcircle">
                                 <input type="checkbox" name="category" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Наушники-вкладыши
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="category" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Наушники Bluetooth
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="category" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Полноразмерные
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="category" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Наушники накладные
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="category" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Спортивные наушники
                                 </div>
                              </label>
                           </div>
                        </div>
                        <div class="filter-block" id="range-example">
                           <div class="filter-block__title">Цена:</div>
                           <div class="filter-block__price-range price-range">
                              <div class="price-range__price" data-max-price-value="9999">
                                 <div class="price-range__price-input">
                                    <input
                                       class="price-range__input price-range__input--min"
                                       type="text"
                                       placeholder="499"
                                    />
                                    ₽
                                 </div>
                                 <div class="price-range__separator">–</div>
                                 <div class="price-range__price-input">
                                    <input
                                       class="price-range__input price-range__input--max"
                                       type="text"
                                       placeholder="8499"
                                    />
                                    ₽
                                 </div>
                              </div>
                              <div class="price-range__range price-range__range--double">
                                 <div class="price-range__scale">
                                    <div class="price-range__bar"></div>
                                 </div>
                                 <div class="price-range__toggle price-range__toggle--min"></div>
                                 <div class="price-range__toggle price-range__toggle--max"></div>
                              </div>
                           </div>
                        </div>
                        <div class="filter-block">
                           <div class="filter-block__title">По акции:</div>
                           <div class="filter-block__list">
                              <label class="checkcircle">
                                 <input type="checkbox" name="promotion" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Со скидкой
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="promotion" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    По акции
                                 </div>
                              </label>
                              <label class="checkcircle">
                                 <input type="checkbox" name="promotion" />
                                 <div class="checkcircle__option">
                                    <span></span>
                                    Распродажа
                                 </div>
                              </label>
                           </div>
                        </div>
                        <div class="filter__button">
                           <button class="button filter__clear-button">Очистить фильтр</button>
                        </div>
                     </div>
                  </div>
               </div>
               <product-info-card :title="'Распродажа'"></product-info-card>
            </div>
            <div class="catalogue-block__cards-list cards-list">
               <div class="card-wrapper">
                  <product-info-card :title="'Распродажа'"></product-info-card>
               </div>
               <div
                  class="card-wrapper"
                  v-for="(prod, vendorCode) in currentCatalogueList"
                  :key="vendorCode"
               >
                  <product-card-1 :vendorCode="vendorCode"></product-card-1>
               </div>
            </div>
            <div class="catalogue-block__page-counter page-counter">
               <div class="page-counter__container">
                  <router-link
                     class="page-counter__number"
                     v-for="num in pagesAmount"
                     :key="num"
                     :to="{ name: 'catalogue', params: { pageNumber: [num] } }"
                  >{{ num }}</router-link>
                  <router-link
                     :to="{ name: 'catalogue', params: { pageNumber: [prevPageNumber] } }"
                     class="page-counter__arrow page-counter__arrow--back __icon-back-arrow"
                  ></router-link>
                  <router-link
                     :to="{ name: 'catalogue', params: { pageNumber: [nextPageNumber] } }"
                     class="page-counter__arrow page-counter__arrow--next __icon-next-arrow"
                  ></router-link>
               </div>
            </div>
         </div>
      </section>
      <section class="catalogue-page__block tab-spoiler tab-spoiler--colored-bg">
         <div class="tab-spoiler__title title">
            <div class="title__top">Что стоит знать</div>
            <div class="title__bottom title__bold">при выборе наушников</div>
         </div>
         <spoiler-tab-wrapper
            class="container"
            :titles="[
            'Есть ли гарантии?', 'Сколько устройств можно подключить?', 'Какой провод использовать?',
            ]"
            :spoilerParams="{
               isAccordeon: true
            }"
         >
            <template #0>
               <h5>Гарантия на всю продукцию - 3 месяца</h5>
               <p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.</p>
               <p>Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца.</p>
            </template>
            <template #1>
               <h5>Возможно подключение только одного устройства</h5>
               <p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.</p>
               <p>Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца.</p>
               <p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.</p>
               <p>Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца.</p>
            </template>
            <template #2>
               <p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.</p>
               <p>Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца.</p>
            </template>
         </spoiler-tab-wrapper>
      </section>
   </main>
</template>

<script>
import { mapGetters } from "vuex";
import SpoilerTabWrapper from "@/components/spoiler-tab/SpoilerTabWrapper";

export default {
   name: "CataloguePage",
   components: {
      SpoilerTabWrapper,
   },
   data() {
      return {
         productsPerPage: 8,
      };
   },
   computed: {
      ...mapGetters(["products"]),
      pageNumber() {
         const pageNumber = this.$route.params.pageNumber;
         return (Array.isArray(pageNumber) ? parseInt(pageNumber[0]) : parseInt(pageNumber)) || [1];
      },
      pagesAmount() {
         return Math.ceil(
            Object.keys(this.products).length / this.productsPerPage
         );
      },
      nextPageNumber() {
         const number = this.pageNumber + 1;
         return number <= this.pagesAmount ? number : this.pagesAmount;
      },
      prevPageNumber() {
         const number = this.pageNumber - 1;
         return number > 0 ? number : 1;
      },
      currentCatalogueList() {
         const startPos =
            this.productsPerPage * this.pageNumber - this.productsPerPage;
         const endPos = startPos + this.productsPerPage;
         const vendorCodes = Object.keys(this.products);

         const catalogueList = {};
         for (let i = startPos; i < endPos; i++) {
            const vendorCode = vendorCodes[i];
            const product = this.products[vendorCode];
            if (product) catalogueList[vendorCode] = product;
         }
         return catalogueList;
      },
   },
};
</script>