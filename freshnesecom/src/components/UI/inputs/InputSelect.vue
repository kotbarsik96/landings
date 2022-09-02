<template>
    <div
        class="input-block select"
        :class="[
            chevronType,
            {
                'input-field': isField,
                __shown: isShown,
                '--right': isRightIcon,
            },
        ]"
        @click="isShown = !isShown"
    >
        <div class="select__value">
            <template v-if="selectedValue">
                {{ selectedValue.title }}
            </template>
        </div>
        <div class="select__body">
            <label class="select__item" v-for="opt in options" :key="opt.value">
                <span>{{ opt.title }}</span>
                <input
                    type="radio"
                    :name="name"
                    :value="opt.value"
                    @change="setSelected(opt)"
                    ref="selectInput"
                />
            </label>
        </div>
    </div>
</template>

<script>
import { closeByDocumentClick } from "@/assets/js/scripts.js";

export default {
    name: "InputSelect",
    props: {
        options: {
            // [ { title: "Выбор 1", value: "значение выбора 1" } ]
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        modelValue: [Object, Number],
        isRightIcon: {
            type: Boolean,
            default: false,
        },
        chevronName: {
            // любое доступное название иконки __icon-chevron-...
            type: String,
            default: "top-bottom",
        },
        isField: {
            type: Boolean,
            default: true,
        },
        isBodyShown: Boolean, // v-model:bodyShown="..."
    },
    emits: ["update:modelValue", "update:isBodyShown"],
    data() {
        return {
            isShown: false,
            selectedValue: null,
        };
    },
    computed: {
        chevronType() {
            return `__icon-chevron-${this.chevronName.replace("-", "_")}`;
        },
    },
    watch: {
        isShown(bool) {
            this.$emit("update:isBodyShown", bool);
        },
    },
    methods: {
        closeByDocumentClick,
        calcNum(num) {
            return parseInt(num) * this.step;
        },
        setSelected(value, input) {
            this.isShown = false;
            this.selectedValue = value;
            if (input) {
                const changeEvent = new Event("change");
                input.dispatchEvent(changeEvent);
            }

            this.$emit("update:modelValue", value);
        },
        initSelect() {
            let selects = this.$refs.selectInput;
            if (selects) {
                const firstInput = selects[0];
                this.setSelected(this.options[0], firstInput);
                return;
            }

            const watchOptions = this.$watch("options", () => {
                this.$nextTick().then(() => {
                    selects = this.$refs.selectInput;
                    if (selects) {
                        this.initSelect();
                        watchOptions();
                    }
                });
            });
        },
    },
    mounted() {
        this.initSelect();

        document.addEventListener("click", (event) => {
            this.closeByDocumentClick(event, "select", "isShown");
        });
    },
};
</script>