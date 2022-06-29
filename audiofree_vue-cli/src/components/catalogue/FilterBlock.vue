<template>
   <div class="card filter">
      <div class="card__container card__side filter__container">
         <div class="filter__title" ref="filterTitle">
            <div class="filter__title-text">{{ filterBlockTitle }}</div>
            <div class="filter__title-icon __icon-filter"></div>
         </div>
         <div class="filter__main" ref="filterBody">
            <div class="filter-block" v-for="field in fields" :key="field.key">
               <div class="filter-block__title">{{ field.title }}:</div>

               <div
                  class="filter-block__list"
                  v-if="field.inputsType === 'checkbox' || field.inputsType === 'radio'"
                  ref="checktypeFilterBlock"
               >
                  <label class="checkcircle" v-for="val in keyValues[field.key]" :key="val">
                     <input
                        :type="field.inputsType"
                        :name="field.key"
                        ref="checktypeInputs"
                        :value="val"
                     />
                     <div class="checkcircle__option">
                        <span></span>
                        {{ capitalLetter(val) }}
                     </div>
                  </label>
               </div>

               <range-block
                  class="filter-block__price-range"
                  v-if="field.inputsType === 'range'"
                  :valueString="field.rangeValueString"
                  :minValueThreshold="0"
                  :maxValueThreshold="field.maxRangeValue"
                  ref="rangeBlock"
                  :filterName="field.key"
               ></range-block>
            </div>
            <div class="filter__buttons">
               <button class="button filter__clear-button" @click="applyFilter">Применить фильтр</button>
               <button class="button filter__clear-button" @click="clearFilter">Очистить фильтр</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {
   SpoilerElem,
   capitalLetter,
   getKeyPathValue,
} from "@/assets/js/scripts";
import RangeBlock from "@/components/catalogue/RangeBlock";

export default {
   name: "FilterBlock",
   emits: ["filterApply"],
   components: {
      RangeBlock,
   },
   props: {
      filterBlockTitle: {
         type: String,
         default: "Фильтр",
      },
      fields: {
         type: Array,
         required: true,
         // пример:
         // [
         //    { title: 'Бренд', inputsType: 'radio', key: 'brand' },
         //    { title: 'Цена', inputsType: 'range', key: 'price', maxRangeValue: calcMaxRangeValue('price'), rangeValueString: '₽' },
         //    { title: 'Цвет', inputsType: 'checkbox', key: 'options.color.list' }, !при указании key путем через точку нужно использовать getKeyPathValue функцию из scripts.js!
         // ]
      },
      objectToFilter: {
         type: [Array, Object],
         required: true,
      },
   },
   computed: {
      keyValues() {
         const values = {};
         const inputTypesToGet = "checkbox, radio";
         for (let key in this.objectToFilter) {
            const item = this.objectToFilter[key];

            for (let field of this.fields) {
               const inputType = field.inputsType;
               const matchesToGet = inputTypesToGet.indexOf(inputType) >= 0;
               if (matchesToGet) {
                  if (!values[field.key]) values[field.key] = [];
                  const value = values[field.key];
                  const itemValue = getKeyPathValue(item, field.key);

                  // если значением в this.objectToFilter[key][field.key] является массив/объект со строками/числами
                  if (typeof itemValue === "object") {
                     for (let k in itemValue) {
                        const subValue = itemValue[k];

                        if (
                           typeof subValue !== "object" &&
                           !value.includes(subValue)
                        ) {
                           value.push(subValue);
                        }
                     }
                  }
                  // если значением является не объект (а строка/значение)
                  else if (typeof itemValue !== "object") {
                     if (!value.includes(itemValue)) value.push(itemValue);
                  }
               }
            }
         }
         return values;
      },
   },
   data(){
      return {
         filtered: []
      }
   },
   methods: {
      capitalLetter,
      clearFilter() {
         this.$refs.checktypeInputs.forEach((inp) => (inp.checked = false));
         this.$refs.rangeBlock.forEach((rb) => {
            rb.minValue = 0;
            rb.maxValue = rb.maxValueThreshold;
         });
      },
      applyFilter() {
         const filteredByRanges = this.filterByRanges(this.objectToFilter);
         this.filtered = this.filterByChecktypes(filteredByRanges);
         this.$emit("filterApply", this.filtered);
      },
      // метод проходит по каждому rangeBlock'у и поочередно фильтрует, исходя из их minValue и maxValue
      filterByRanges(objectToFilter) {
         const ranges = this.$refs.rangeBlock;
         const isArray = Array.isArray(objectToFilter);

         ranges.forEach((rb) => {
            const filterName = rb.filterName;
            const minValue = rb.minValue;
            const maxValue = rb.maxValue;

            // фильтр массива
            if (isArray) objectToFilter = objectToFilter.filter(doFilter);
            // фильтр объекта
            else {
               let filteredObj = {};
               for (let key in objectToFilter) {
                  const item = objectToFilter[key];
                  if (doFilter(item)) filteredObj[key] = item;
               }
               objectToFilter = filteredObj;
            }

            function doFilter(item) {
               const value = parseInt(getKeyPathValue(item, filterName));
               if (value) {
                  const isInBorders = value >= minValue && value <= maxValue;
                  return isInBorders ? true : false;
               }
            }
         });

         return objectToFilter;
      },
      // метод проходит по каждому checktypeFilterBlock'у и поочередно фильтрует, исходя из их [input:checked].value
      filterByChecktypes(objectToFilter) {
         const blocks = this.$refs.checktypeFilterBlock;
         const isArray = Array.isArray(objectToFilter);

         blocks.forEach((block) => {
            const closestInput =
               block.querySelector("input[type='checkbox']") ||
               block.querySelector("input[type='radio']");
            const checkedInputs = block.querySelectorAll("input:checked");
            const filterName = closestInput.name;

            // фильтр массива
            if (isArray) objectToFilter = objectToFilter.filter(doFilter);
            // фильтр объекта
            else {
               const filteredObj = {};
               for (let key in objectToFilter) {
                  const item = objectToFilter[key];
                  if (doFilter(item)) filteredObj[key] = item;
               }
               objectToFilter = filteredObj;
            }

            function doFilter(item) {
               const value = getKeyPathValue(item, filterName);
               // если есть выбранные input'ы, начать фильтр
               if (checkedInputs.length > 0) {
                  for (let inp of checkedInputs) {
                     const inpValue = inp.value;
                     if(inpValue == value) return true;
                  }
               }
               // если нет выбранных input'ов, не делать фильтр
               else return true;
            }
         });

         return objectToFilter;
      },
   },
   mounted() {
      this.applyFilter();
      new SpoilerElem(this.$refs.filterTitle, this.$refs.filterBody, 949);
      this.$nextTick(() => this.applyFilter);
   },
};
</script>