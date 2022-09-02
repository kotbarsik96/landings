<template>
    <div
        class="input-block text-input"
        :class="[
            iconClassName,
            {
                'input-field': isField,
                '--right': isRightIcon,
                '--textarea': type === 'textarea',
            },
        ]"
    >
        <div class="text-input__value">
            <textarea
                v-if="type === 'textarea'"
                class="text-input__value-input"
                :name="name"
                :placeholder="placeholder"
                v-bind="conditionalAttrs"
                v-model="value"
                ref="inputElem"
                @blur="onBlur"
                @focus="onFocus"
            />
            <input
                v-if="type !== 'textarea'"
                class="text-input__value-input"
                :name="name"
                :type="type"
                v-bind="conditionalAttrs"
                ref="inputElem"
                v-model.lazy="value"
                @change="$emit('change')"
                @blur="onBlur"
                @focus="onFocus"
                @click="onInputClick"
            />
            <button
                class="text-input__value-button button--transparent --small"
                v-if="$slots.button"
                @click="onButtonClick"
            >
                <slot name="button"></slot>
            </button>
        </div>
        <div class="text-input__body" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { checkNumberValue } from "@/assets/js/scripts.js";

// !! type="textarea" для textarea !!
// если type === "number", при этом !this.value, modelValue будет отдавать this.minNumber
export default {
    name: "InputText",
    props: {
        isRightIcon: {
            type: Boolean,
            default: false,
        },
        iconName: String, // без префикса "__icon-"
        name: {
            type: String,
            required: true,
        },
        type: {
            // number, email, search textarea
            type: String,
            default: "text",
        },
        // для textarea
        cols: {
            type: String,
            default: "1.5",
        },
        // для textarea
        rows: {
            type: String,
            default: "1.5",
        },
        maxlength: String,
        // для type === "number"
        minNumber: Number,
        // для type === "number"
        maxNumber: Number,
        placeholder: String,
        submitButton: String,
        isField: {
            type: Boolean,
            default: true,
        },
        modelValue: [String, Number],
    },
    emits: ["update:modelValue", "focusChange", "button-click", "change"],
    computed: {
        iconClassName() {
            if (this.iconName) return `__icon-${this.iconName}`;
            return "";
        },
        conditionalAttrs() {
            const attrs = {};
            if (this.maxlength) attrs.maxlength = this.maxlength;
            if (this.placeholder) attrs.placeholder = this.placeholder;
            if (this.type === "textarea") {
                attrs.cols = parseInt(this.cols);
                attrs.rows = parseInt(this.rows);
            }

            return attrs;
        },
    },
    data() {
        return {
            isFocused: false,
            value: "",
        };
    },
    methods: {
        onFocus() {
            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;
        },
        onInputClick(event) {
            const changeEvent = new Event("change");
            event.target.dispatchEvent(changeEvent);
        },
        onButtonClick() {
            this.$emit("button-click");
        },
        updateModelValue() {
            let emittingVal;
            if (this.type === "number") {
                emittingVal = this.value ? this.value : this.minNumber;
            }
            if (this.type !== "number") emittingVal = this.value;
            this.$emit("update:modelValue", emittingVal);
        },
        dispatchChangeEvent() {
            const event = new Event("change");
            this.$refs.inputElem.dispatchEvent(event);
        },
    },
    watch: {
        isFocused(bool) {
            this.$emit("focusChange", bool);
        },
        value(newValue) {
            if (this.type === "number") {
                this.$nextTick().then(() => {
                    this.value = checkNumberValue(newValue, {
                        min: this.minNumber,
                        max: this.maxNumber,
                    });
                });
            }
            this.updateModelValue();
        },
    },
    mounted() {
        if (this.type === "textarea") {
            this.$refs.inputElem.cols = parseInt(this.cols);
            this.$refs.inputElem.rows = parseInt(this.rows);
        }
    },
};
</script>