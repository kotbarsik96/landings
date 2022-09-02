<template>
    <div class="input-block num-input" :class="{ 'input-field': isField }">
        <div class="num-input__value">
            <input
                :style="{ maxWidth: inputWidth }"
                type="number"
                v-model.lazy="value"
                :name="name"
                @blur="
                    value = checkNumberValue(value, { min, max, onBlur: true })
                "
            />
        </div>
        <div class="num-input__title">
            {{ title }}
        </div>
        <div class="num-input__controls">
            <div
                class="num-input__control __icon-chevron-top"
                @click="value++"
            ></div>
            <div
                class="num-input__control __icon-chevron-down"
                @click="value--"
            ></div>
        </div>
    </div>
</template>

<script>
import { checkNumberValue } from "@/assets/js/scripts.js";

export default {
    name: "InputNumbers",
    props: {
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 99,
        },
        title: {
            type: String,
            default: "Шт",
        },
        name: String,
        isField: {
            type: Boolean,
            default: true,
        },
        modelValue: Number,
    },
    emits: ["update:modelValue"],
    data() {
        return {
            value: this.modelValue || 1,
        };
    },
    methods: {
        checkNumberValue,
    },
    computed: {
        inputWidth() {
            return `${this.max.toString().length}em`;
        },
    },
    watch: {
        value(val) {
            this.value = this.checkNumberValue(val, {
                min: this.min,
                max: this.max,
            });
            this.$emit("update:modelValue", this.value);
        },
    },
};
</script>