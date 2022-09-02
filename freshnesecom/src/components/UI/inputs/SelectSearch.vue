<template>
    <InputCombined
        :class="{ __shownleft: isSelectShown, __shownright: isSearchShown }"
    >
        <template #left>
            <InputSelect
                v-bind="commonProps"
                :options="options"
                chevronName="down"
                v-model="selectedValue"
                v-model:isBodyShown="isSelectShown"
            ></InputSelect>
        </template>
        <template #right>
            <InputSearch
                v-bind="commonProps"
                :array="arrayForSearch"
                :keysForSearch="keysForSearch"
                :placeholder="placeholder"
                :resultParams="resultParams"
                v-model:isBodyShown="isSearchShown"
                ref="searchInput"
            ></InputSearch>
        </template>
    </InputCombined>
</template>

<script>
// компонент представляет сообй комбинацию из компонентов InputSelect и InputSearch, поэтому его (SelectSearch) пропсы, эмиты и др. должны быть такими же, как у этих двух компонентов, из которых он состоит (кроме тех, что предназначены только для текущего компонента)
import InputCombined from "@/components/UI/inputs/InputCombined.vue";
import { getObjectValue } from "@/assets/js/scripts.js";

export default {
    name: "SelectSearch",
    props: {
        // для текущего компонента
        selectFilterKey: {
            // на основе этого ключа происходит фильтр: в каждом результате InputSearch ищется значение этого ключа и сравнивается с выбранным selectedValue. Если selectedValue === "all", массив фильтроваться не будет
            type: String,
        },
        // для InputSearch и InputSelect
        options: {
            type: [Object, Array],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        array: {
            // если содержит в себе объекты - фильтруется сам; если содержит в себе другие массивы - эти массивы фильтруются и складываются в один итоговый
            type: Array,
            required: true,
        },
        keysForSearch: {
            // возможно указывать в формате obj.key.subkey
            type: Array,
            required: true,
        },
        resultParams: {
            // пример:
            // {
            //      image: { key: "images.0", keyValuePrefix: rootPath + '[categoryId]/[id]/' },
            //      title: { key: "title|name" },
            //      subtitle: { className: "--bold", key: "price", keyValueSuffix: " руб." }
            //      routerTo: { name: "product", params: { categoryId: "[category]", pageNumber: 1 } }
            // }
            // где key - ключ, значение которого будет выведено в подблоке результата (через разделитель "|" указываются возможные ключи, поэтому если не подойдет один - будет произведен поиск в другом);
            // keyValuePrefix, keyValueSuffix - строка, вставляемая перед/после значения key (также можно указывать в "[]" ключи, находящиеся в result, напр. result[id])
            // className - классы этого подблока
            // routerTo - параметры, выставляемые в <RouterLink :to="routerTo", где если какое-то значение находится в "[]" (напр.: [category]), значит его нужно найти в result (result[category]), чем занимается метод parseVariables
            type: Object,
        },
        placeholder: String,
    },
    components: { InputCombined },
    data() {
        return {
            isSelectShown: false,
            isSearchShown: false,
            selectedValue: {},
            arrayForSearch: [],
        };
    },
    methods: {
        filterBySelectedValue() {
            const value = this.selectedValue.value;
            if (this.array) {
                if (value !== "all") {
                    this.arrayForSearch = this.array.filter((el) => {
                        const elValue = getObjectValue(
                            this.selectFilterKey,
                            el
                        );
                        return elValue == value;
                    });
                } else this.arrayForSearch = this.array;
            } else this.arrayForSearch = [];
        },
        refresh() {
            this.filterBySelectedValue();
            this.$nextTick().then(this.$refs.searchInput.dispatchChangeEvent);
        },
    },
    computed: {
        commonProps() {
            return {
                isField: false,
                isRightIcon: true,
                name: this.name,
            };
        },
    },
    watch: {
        array() {
            this.refresh();
        },
        selectedValue() {
            this.refresh();
        },
    },
};
</script>