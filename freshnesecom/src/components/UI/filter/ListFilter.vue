<template>
    <div class="list-filter" :data-hideable="isHideable">
        <div class="list-filter__header" ref="fHeader">
            <h3 class="list-filter__title __icon-chevron-top_bottom">Фильтр</h3>
        </div>
        <div class="list-filter__body" ref="fBody">
            <template v-for="field in fields" :key="field.key">
                <div
                    v-if="isFieldOption(field.key)"
                    class="list-filter__block"
                    :ref="getFilterBlockRef(field.type)"
                    :data-filter-field-key="field.key"
                >
                    <h4 class="list-filter__block-title">{{ field.title }}</h4>
                    <div class="list-filter__block-options">
                        <template
                            v-if="
                                field.type === 'checkbox' ||
                                field.type === 'radio'
                            "
                        >
                            <label
                                class="list-filter__block-option"
                                v-for="(opt, optIndex) in fieldOptions[
                                    field.key
                                ]"
                                :key="optIndex"
                            >
                                <input
                                    :type="field.type"
                                    :name="`${name}-${field.key.split('.')[0]}`"
                                    :value="opt.value"
                                    ref="checkInput"
                                />
                                <span :class="[field.type]">{{
                                    opt.valueTitle
                                }}</span>
                            </label>
                        </template>
                        <template v-if="field.type === 'range'">
                            <RangeBlock
                                :name="field.key"
                                :min="field.rangeValues.min"
                                :max="field.rangeValues.max"
                                ref="rangeBlock"
                                @initialized="initRangeBlock(field.key)"
                                @update:minValue="
                                    getRangeValue($event, 'min', field.key)
                                "
                                @update:maxValue="
                                    getRangeValue($event, 'max', field.key)
                                "
                            ></RangeBlock>
                        </template>
                    </div>
                </div>
            </template>
            <div class="list-filter__btns">
                <button
                    class="list-filter__button button--colored"
                    @click="applyFilter"
                >
                    Применить
                </button>
                <button
                    class="list-filter__button button--transparent"
                    @click="reset"
                >
                    Сбросить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import RangeBlock from "@/components/UI/filter/RangeBlock.vue";
import StarRating from "@/components/UI/categories-products/StarRating.vue";
import {
    initSpoilerElem,
    getObjectValue,
    isCoincidingObjectsValues,
} from "@/assets/js/scripts.js";

export default {
    name: "ListFilter",
    components: {
        RangeBlock,
        StarRating,
    },
    props: {
        array: {
            type: Array,
            required: true,
        },
        fields: {
            // пример: [ { title: 'В наличии', key: 'stock', type: 'radio', booleanTitles: { forTrue: 'В наличии', forFalse: "Не в наличии" }  }, { title: 'Цена', key: 'price', type: 'range' } ],
            // где title - отображаемое в фильтре название;
            // key - ключ, по значению которого будет происходить фильтрация (может быть также вложенным: key.valueKey.valueValueKey...);
            // type - тип, напр. checkbox, radio, range; booleanTitles (ТОЛЬКО для boolean значений) - названия опций для true и false
            // booleanOnly: true - если важно не само value, а его наличие
            // rangeValues: { min: ..., max: ... } - только для range
            type: Array,
            required: true,
        },
        isHideable: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: "filter",
        },
        modelValue: Array,
    },
    emits: ["update:modelValue"],
    data() {
        return {
            fieldOptions: {},
        };
    },
    computed: {
        isRangeBlocksInitialized() {
            const rangeBlocksKeys = this.fields
                .filter((field) => field.type === "range")
                .map((field) => field.key);
            const initStates = rangeBlocksKeys.map((rbKey) => {
                return this.fieldOptions[rbKey]
                    ? Boolean(this.fieldOptions[rbKey].initialized)
                    : false;
            });
            return !initStates.includes(false);
        },
        isFilterInitialized() {
            return this.isRangeBlocksInitialized && this.$refs.checkInputsFB;
        },
    },
    methods: {
        getFilterFields() {
            this.$nextTick().then(() => {
                this.fieldOptions = {};
                for (let field of this.fields) {
                    pushToOptionValues = pushToOptionValues.bind(this);

                    const optionValues = [];
                    if (field.type === "checkbox" || field.type === "radio") {
                        for (let el of this.array) {
                            const value = getObjectValue(field.key, el);
                            if (typeof value === "object") {
                                getValuesFromObject(value);
                            } else if (field.booleanOnly)
                                getOnlyBooleanValue(value);
                            else pushToOptionValues(value);
                        }
                        if (field.type === "radio" && optionValues.length < 2) {
                            // если присутствует меньше двух опций для выбора в radio - не добавлять эту опцию
                            this.fieldOptions[field.key] = [];
                        } else this.fieldOptions[field.key] = optionValues;
                    }
                    if (field.type === "range") {
                        let rangeOptions = this.fieldOptions[field.key];
                        if (!rangeOptions) {
                            this.fieldOptions[field.key] = {};
                            rangeOptions = this.fieldOptions[field.key];
                        }
                        rangeOptions.min = field.rangeValues.min;
                        rangeOptions.max = field.rangeValues.max;

                        this.initRangeBlock(field.key);
                    }

                    function pushToOptionValues(pushingValue) {
                        if (
                            !optionValues.find((el) => el.value == pushingValue)
                        ) {
                            const valueTitle = this.getOptionTitle(
                                pushingValue,
                                field
                            );

                            const optionValue = {
                                value: pushingValue,
                                valueTitle,
                            };
                            optionValues.push(optionValue);
                        }
                    }
                    function getValuesFromObject(object) {
                        for (let k in object) {
                            const v = object[k];
                            if (v) {
                                typeof v === "object"
                                    ? getValuesFromObject(v)
                                    : pushToOptionValues(v);
                            }
                        }
                    }
                    function getOnlyBooleanValue(val) {
                        val
                            ? pushToOptionValues(true)
                            : pushToOptionValues(false);
                    }
                }
            });
        },
        getOptionTitle(value, field) {
            if (typeof value === "boolean" || value.booleanOnly) {
                const bTitles = field.booleanTitles || {
                    forTrue: "Да",
                    forFalse: "Нет",
                };
                return value
                    ? bTitles.forTrue || "Да"
                    : bTitles.forFalse || "Нет";
            }
            return value;
        },
        getFilterBlockRef(fieldType) {
            switch (fieldType) {
                case "checkbox":
                case "radio":
                    return "checkInputsFB";
                case "range":
                    return "rangeBlockFB";
            }
        },
        getRangeValue(value, type, fieldKey) {
            // type - ["min", "max"]
            const fieldOption = this.fieldOptions[fieldKey];
            if (fieldOption) fieldOption[type] = value;
        },
        isFieldOption(fieldKey) {
            const fieldOption = this.fieldOptions[fieldKey];

            if (fieldOption) {
                if (Array.isArray(fieldOption)) return fieldOption.length > 0;
                return true;
            }
            return false;
        },
        initRangeBlock(fieldKey = null) {
            const rangeBlocks = this.$refs.rangeBlock;
            initBlock = initBlock.bind(this);

            if (rangeBlocks) {
                if (fieldKey) return initBlock(fieldKey);

                const rangeBlocksKeys = this.fields
                    .filter((fd) => fd.type === "range")
                    .map((fd) => fd.key);

                rangeBlocksKeys.forEach((fieldKey) => initBlock(fieldKey));
            }

            function initBlock(fieldKey) {
                const rangeBlock = rangeBlocks.find(
                    (rb) => rb.name === fieldKey
                );

                if (rangeBlock.initialized) {
                    const fieldOption = this.fieldOptions[fieldKey];

                    if (fieldOption) fieldOption.initialized = true;
                    else this.fieldOptions[fieldKey] = { initialized: true };
                }
            }
        },
        applyFilter() {
            // фильтр будет применен только тогда, когда все необходимые составляющие будут инициализированы
            if (!this.isFilterInitialized) {
                this.$nextTick().then(() => {
                    setTimeout(this.applyFilter, 100);
                });
                return;
            }

            let filteredArray = [...this.array];

            filterCheckInputs.call(this);
            filterRangeBlocks.call(this);
            this.$emit("update:modelValue", filteredArray);

            function filterCheckInputs() {
                const checkInputsFilterBlocks = this.$refs.checkInputsFB;
                for (let block of checkInputsFilterBlocks) {
                    const checked = Array.from(
                        block.querySelectorAll("input:checked")
                    );
                    const fieldData = this.fields.find(
                        (fd) => fd.key === block.dataset.filterFieldKey
                    );
                    const values = checked
                        .map((inp) => inp.value)
                        .map((val) => {
                            if (val == "true") return true;
                            if (val == "false") return false;
                            return val;
                        });

                    // если в блоке ничего не выбрано - пропустить его
                    if (values.length > 0) {
                        filteredArray = filteredArray.filter((el) => {
                            const elValue = getObjectValue(fieldData.key, el);

                            if (fieldData.booleanOnly) {
                                const booleanValues = values.map((val) =>
                                    Boolean(val)
                                );
                                return booleanValues.includes(Boolean(elValue));
                            }

                            const elValuesMatches = // only if elValue - Object
                                typeof elValue === "object"
                                    ? isCoincidingObjectsValues(values, elValue)
                                    : false;

                            if (values.includes(elValue) || elValuesMatches) {
                                return true;
                            }
                            return false;
                        });
                    }
                }
            }
            function filterRangeBlocks() {
                const rangeFields = this.fields.filter(
                    (field) => field.type === "range"
                );
                rangeFields.forEach((field) => {
                    const minValue = this.fieldOptions[field.key].min;
                    const maxValue = this.fieldOptions[field.key].max;
                    filteredArray = filteredArray.filter((el) => {
                        const value = getObjectValue(field.key, el);
                        return value >= minValue && value <= maxValue;
                    });
                });
            }
        },
        reset() {
            const checkInputs = this.$refs.checkInput;
            const rangeBlocks = this.$refs.rangeBlock;

            checkInputs.forEach((inp) => {
                inp.checked = false;
                inp.dispatchEvent(new Event("change"));
            });
            rangeBlocks.forEach((rb) => rb.resetRangeBlock());
            this.applyFilter();
        },
    },
    watch: {
        fields: {
            handler() {
                this.getFilterFields();
            },
            deep: true,
        },
    },
    created() {
        this.getFilterFields();
    },
    mounted() {
        const rfs = this.$refs;
        initSpoilerElem(rfs.fHeader, rfs.fBody);
        this.applyFilter();
    },
};
</script>