<template>
    <InputText
        :iconName="iconName"
        :class="{ __shown: isShown }"
        :isField="isField"
        :name="name"
        :placeholder="placeholder"
        :isRightIcon="isRightIcon"
        :key="routePath"
        v-model="searchQuery"
        @change="getResults"
        @focusChange="(bool) => (isFocused = bool)"
        @button-click="$emit('button-click')"
        ref="textInput"
    >
        <template v-if="doShowResultsInSearchBody">
            <Component
                v-for="(result, resIndex) in results"
                :key="resIndex"
                :is="getRouterTo(result) ? 'RouterLink' : 'div'"
                class="text-input__search-result"
                :class="getResultParam('result', 'className')"
                v-bind="getRouterTo(result)"
            >
                <div
                    class="text-input__search-image"
                    :class="getResultParam('image', 'className')"
                >
                    <img :src="getResultParamKey('image', result)" alt="" />
                </div>
                <div class="text-input__search-info">
                    <div
                        class="text-input__search-text"
                        :class="getResultParam('title', 'className')"
                    >
                        {{ getResultParamKey("title", result) }}
                    </div>
                    <div
                        class="text-input__search-text"
                        :class="getResultParam('subtitle', 'className')"
                    >
                        {{ getResultParamKey("subtitle", result) }}
                    </div>
                </div>
            </Component>
        </template>
        <template v-if="$slots.button" #button>
            <slot name="button"></slot>
        </template>
    </InputText>
</template>

<script>
import rootPath from "@/root-path.js";
import { getObjectValue } from "@/assets/js/scripts.js";

export default {
    name: "InputSearch",
    props: {
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
        isRightIcon: {
            type: Boolean,
            default: false,
        },
        iconName: {
            type: String,
            default: "actions-search",
        },
        isField: {
            type: Boolean,
            default: true,
        },
        searchResults: Array,
        doShowResultsInSearchBody: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["update:isBodyShown", "update:searchResults", "update:searchQuery", "button-click"],
    data() {
        return {
            rootPath,
            isFocused: false,
            searchQuery: "",
            results: [],
        };
    },
    computed: {
        isShown() {
            return this.isFocused && this.results.length > 0 && this.doShowResultsInSearchBody;
        },
        routePath() {
            return this.$route.path;
        },
    },
    methods: {
        getResultParam(blockKey, paramKey) {
            const resultParam = this.resultParams[blockKey];
            if (resultParam) {
                return resultParam[paramKey];
            }
            return "";
        },
        getResultParamKey(blockKey, result) {
            const param = this.resultParams[blockKey];
            if (param) {
                const paramKeys = param.key.split("|");

                for (let pKey of paramKeys) {
                    const value = getObjectValue(pKey, result);
                    if (value) {
                        const prefix = this.parseVariables(
                            param.keyValuePrefix,
                            result
                        );
                        const suffix = this.parseVariables(
                            param.keyValueSuffix,
                            result
                        );
                        return `${prefix || ""}${value}${suffix || ""}`;
                    }
                }
            }
        },
        getRouterTo(result) {
            parseObject = parseObject.bind(this);

            // единственный способ создать копию, независимую от this.resultParams.routerTo
            let routerTo = JSON.stringify(this.resultParams.routerTo);
            routerTo = JSON.parse(routerTo);
            if (routerTo) return { to: parseObject(routerTo) };
            return "";

            function parseObject(obj) {
                for (let key in obj) {
                    const value = obj[key];
                    if (typeof value === "object") parseObject(value);
                    else {
                        obj[key] = this.parseVariables(
                            value.toString(),
                            result
                        );
                    }
                }
                return obj;
            }
        },
        parseVariables(str, result) {
            if (str) {
                const regExp = /\[.*?\]/g;
                const matches = str.match(regExp);

                if (matches) {
                    const variables = matches.map((vr) => {
                        const variable = vr.replace("[", "").replace("]", "");
                        const variableValue = result[variable];
                        return { variableRaw: vr, variableValue };
                    });
                    variables.forEach((vr) => {
                        str = str.replace(vr.variableRaw, vr.variableValue);
                    });
                }
            }
            return str;
        },
        getResults() {
            if (this.searchQuery) {
                const isAllArrays = !this.array
                    .map((el) => Array.isArray(el))
                    .includes(false);
                if (isAllArrays) {
                    const resultArray = [];
                    for (let arr of this.array) {
                        resultArray.push(...this.filterBySearchQuery(arr));
                    }
                    this.results = resultArray;
                    return;
                }

                const resultArray = this.filterBySearchQuery(this.array);
                this.results = resultArray;
                return;
            }
            this.results = [];
        },
        filterBySearchQuery(arr) {
            const searchQuery = this.searchQuery.toString().toLowerCase();

            const filteredArr = arr.filter((el) => {
                for (let key of this.keysForSearch) {
                    const valueRaw = getObjectValue(key, el);
                    const value =
                        typeof valueRaw === "object"
                            ? JSON.stringify(valueRaw).toLowerCase()
                            : valueRaw.toString().toLowerCase();

                    if (value.includes(searchQuery)) return true;
                }
                return false;
            });

            return filteredArr;
        },
        dispatchChangeEvent() {
            const textInput = this.$refs.textInput;
            if (textInput) textInput.dispatchChangeEvent();
        },
    },
    watch: {
        isShown(bool) {
            this.$emit("update:isBodyShown", bool);
        },
        searchQuery(query) {
            this.getResults();
            this.$emit("update:searchQuery", query);
        },
        results(results) {
            this.$emit("update:searchResults", results);
        },
        routePath() {
            this.searchQuery = "";
        },
    },
};
</script>