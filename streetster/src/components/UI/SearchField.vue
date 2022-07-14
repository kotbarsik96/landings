<template>
    <div
        class="header__search search"
        :class="{ '__active': isFocused, '__is-results': results.length > 0 && isFocused }"
        ref="search"
    >
        <div class="search__container">
            <div class="search__icon __icon-loopa"></div>
            <div class="search__input">
                <input
                    type="text"
                    @focus="isFocused = true"
                    @blur="onInputBlur"
                    v-model="searchQuery"
                />
            </div>
        </div>
        <div class="search-results">
            <RouterLink
                :to="createSearchRoute(res)"
                class="search-results__item"
                v-for="(res, resIndex) in results"
                :key="resIndex"
            >
                <div class="search-results__image">
                    <img :src="res.layout.imagePath">
                </div>
                <div class="search-results__info">
                    <div class="search-results__title"> {{ res.layout.title }} </div>
                    <div class="search-results__text"> {{ capitalLetter(res.layout.text) }} </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import { parseKey, isKey, removeBrackets, capitalLetter } from "@/assets/js/scripts.js";
import rootPath from "@/root-path.js";

export default {
    name: "SearchField",
    props: {
        searchAmong: {
            // ПРИМЕР: {
            //          object: blogs,
            //          keys: ['title', 'date', 'preview-text', 'content.children'],
            //          resultLayoutData: { imagePath: '[image]', title: '[title]', text: { string: '[price]', concat: "₴" } },
            //          route: { name: 'blog-item', params: { key: 'blogId', value: '[id]' } }
            //      }
            // где 1. object - массив/объект, среди которого будет производиться итерация; | 2. keys - ключи, в значениях которых будет производится поиск по совпадению с searchQuery; | 3. resultLayoutData - пути к картинке, названию результата и тексту под названием; | 4. route - объект, указываемый в :to компонента <RouterLink>.
            // если текст в строке содержится в квадратных скобках "[]", это значит, что она является ключом объекта, находящегося в объекте/массиве object, а если без скобок - значит является статичным текстом.
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            rootPath,
            isFocused: false,
            searchQuery: "",
            results: [],
        };
    },
    methods: {
        capitalLetter,
        onInputBlur() {
            setTimeout(() => {
                this.isFocused = false;
            }, 200);
        },
        doSearch(newVal) {
            if (newVal) {
                const results = [];

                this.searchAmong.forEach((field) => {
                    const obj = field.object;
                    for (let k in obj) {
                        const itemToFilter = obj[k];

                        // поиск по ключам самого obj (obj[0] ===, obj[1] ===, ...)
                        checkQueryMatch.call(this, field, results, obj, k);
                        // поиск по ключам свойств obj (obj[0] => {}, obj[1] => {}, ...)
                        if (field.keys) {
                            field.keys.forEach((fKey) => {
                                checkQueryMatch.call(
                                    this,
                                    field,
                                    results,
                                    itemToFilter,
                                    fKey
                                );
                            });
                        }
                    }
                });

                this.results = results;
            } else {
                this.results = [];
            }

            function checkQueryMatch(field, results, itemToFilter, fKey) {
                const value = parseKey(itemToFilter, fKey);
                if(typeof value === "object") return;

                const isInResults = results.find(
                    (res) => res.item === itemToFilter
                );
                const valueToMatch = value.toString().toLowerCase();
                const query = this.searchQuery.toLowerCase();

                if (valueToMatch.includes(query) && !isInResults) {
                    const searchBlockData = {
                        item: itemToFilter,
                        layout: layoutSearchResults(field, itemToFilter),
                    };
                    results.push(searchBlockData);
                }
            }
            function layoutSearchResults(field, itemToFilter) {
                // isKey - проверка, является ли строка ключом в itemToFilter (т.е. совпадает с "[Строка]") или строка статична (т.е. не в "[]")

                const layoutKeys = field.resultLayoutData;
                const imagePath = isKey(layoutKeys.imagePath)
                    ? rootPath +
                      itemToFilter[removeBrackets(layoutKeys.imagePath)]
                    : layoutKeys.imagePath;
                const title = layoutSearchInfo(layoutKeys.title);
                const text = layoutSearchInfo(layoutKeys.text);

                return { imagePath, title, text, routeData: field.route };

                function layoutSearchInfo(str) {
                    if (typeof str !== "object") {
                        return isKey(str)
                            ? itemToFilter[removeBrackets(str)]
                            : str;
                    }
                    if (typeof str === "object") {
                        const strText = str.string;
                        const strConcat = " " + str.concat;

                        return isKey(strText)
                            ? itemToFilter[removeBrackets(strText)] + strConcat
                            : strText + strConcat;
                    }
                }
            }
        },
        createSearchRoute(resultData) {
            const routeData = resultData.layout.routeData;
            const routeName = routeData.name;
            const paramsData = routeData.params;

            let params;
            if (paramsData) {
                if (isKey(paramsData.value)) {
                    const paramKeyOrValue = removeBrackets(paramsData.value);
                    params = {
                        [paramsData.key]: resultData.item[paramKeyOrValue],
                    };
                } else params = { [paramsData.key]: paramKeyOrValue };
            }

            return params ? { name: routeName, params } : { name: routeName };
        },
    },
    watch: {
        searchQuery(newVal) {
            this.doSearch(newVal);
        },
    },
};
</script>