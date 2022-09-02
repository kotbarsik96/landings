<template>
    <div class="range-block" :name="name">
        <div class="range-block__range" ref="range">
            <div
                class="range-block__toggler range-block__toggler--left"
                ref="togglermin"
                @pointerdown.prevent="onPointerdown('min', $event)"
            ></div>
            <div
                class="range-block__scale"
                @pointerdown.prevent="grabClosestToggler"
            >
                <div
                    class="range-block__bar"
                    :style="{
                        width: `${barWidth}px`,
                        left: `${togglerPositions.min}px`,
                    }"
                ></div>
            </div>
            <div
                class="range-block__toggler range-block__toggler--right"
                ref="togglermax"
                @pointerdown.prevent="onPointerdown('max', $event)"
            ></div>
        </div>
        <div class="range-block__values">
            <InputWrapper>
                <template #label>От</template>
                <InputText
                    type="number"
                    :name="name"
                    :placeholder="numberValues.min.toString()"
                    :minNumber="min"
                    :maxNumber="numberValues.max"
                    ref="inputMin"
                    v-model="numberValues.min"
                ></InputText>
            </InputWrapper>
            <span class="range-block__values-delimeter">-</span>
            <InputWrapper>
                <template #label>До</template>
                <InputText
                    type="number"
                    :name="name"
                    :placeholder="numberValues.max.toString()"
                    :minNumber="numberValues.min"
                    :maxNumber="max"
                    ref="inputMax"
                    v-model="numberValues.max"
                ></InputText>
            </InputWrapper>
        </div>
    </div>
</template>

<script>
import { getCoords } from "@/assets/js/scripts.js";

export default {
    name: "RangeBlock",
    props: {
        name: {
            type: String,
            default: "range-block",
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 1000,
        },
        // для v-model
        minValue: Number,
        maxValue: Number,
    },
    emits: ["initialized", "update:minValue", "update:maxValue"],
    data() {
        return {
            numberValues: {
                min: this.min,
                max: this.max,
            },
            togglerPositions: {
                min: 0,
                max: 0,
            },
            initialized: false,
            rangeData: {},
        };
    },
    computed: {
        barWidth() {
            return this.togglerPositions.max - this.togglerPositions.min;
        },
        step() {
            // коэффициент, показывающий отношение numberValues к 1px
            return this.max / this.rangeData.widthLimit;
        },
    },
    methods: {
        // методы для использования снаружи компонента
        resetRangeBlock() {
            this.setToggler("max", this.rangeData.widthLimit);
            this.setToggler("min", 0);
        },
        setNumberValues(min = null, max = null) {
            const isMinValue = min >= 0 && min <= max && min >= this.min;
            const isMaxValue = max >= 0 && max >= min && max <= this.max;

            console.log(isMinValue, isMaxValue);
            if (isMinValue) this.numberValues.min = min;
            if (isMaxValue) this.numberValues.max = max;
        },
        // методы внутри компонента
        initRangeBlock() {
            this.getRangeData();
            this.setToggler("max", this.rangeData.widthLimit);
            this.initialized = true;
            this.$emit("initialized");
        },
        setToggler(togglerType, position) {
            const toggler = this.$refs[`toggler${togglerType}`];

            position = this.preventTogglerTrespass(position);
            position = this.preventTogglerCollision(position, togglerType);

            toggler.style.left = `${position}px`;
            this.togglerPositions[togglerType] = position;
        },
        getRangeData() {
            const range = this.$refs.range;
            const width = range.offsetWidth;
            const widthLimit = width - this.$refs.togglermin.offsetWidth;
            const coords = getCoords(range);

            this.rangeData = {
                width,
                widthLimit,
                coords,
            };
        },
        grabClosestToggler(event) {
            const rngCoords = this.rangeData.coords;
            let pointerX =
                Math.round(event.x - rngCoords.left) -
                this.$refs.togglermin.offsetWidth / 2;
            const minPos = this.togglerPositions.min;
            const maxPos = this.togglerPositions.max;

            const closestTogglerType =
                Math.abs(minPos - pointerX) < Math.abs(maxPos - pointerX)
                    ? "min"
                    : "max";
            const closestToggler = this.$refs[`toggler${closestTogglerType}`];
            this.setToggler(closestTogglerType, pointerX);
            this.onPointerdown(closestTogglerType, event, closestToggler);
        },
        onPointerdown(togglerType, event, toggler = null) {
            if (!toggler) toggler = event.target;
            const rngCoords = this.rangeData.coords;

            const onMove = (moveEvent) => {
                let pointerX =
                    Math.round(moveEvent.x - rngCoords.left) -
                    toggler.offsetWidth / 2;

                pointerX = this.preventTogglerTrespass(pointerX);
                pointerX = this.preventTogglerCollision(pointerX, togglerType);

                toggler.style.left = `${pointerX}px`;
                this.togglerPositions[togglerType] = pointerX;
            };
            const onUp = () => {
                document.removeEventListener("pointermove", onMove);
                document.removeEventListener("pointerup", onUp);
            };

            document.addEventListener("pointermove", onMove);
            document.addEventListener("pointerup", onUp);
        },
        preventTogglerTrespass(positionX) {
            const rngWidthLimit = this.rangeData.widthLimit;

            if (positionX < 0) return 0;
            else if (positionX > rngWidthLimit) return rngWidthLimit;
            return positionX;
        },
        preventTogglerCollision(positionX, togglerType) {
            const minPos = this.togglerPositions.min;
            const maxPos = this.togglerPositions.max;

            if (togglerType === "min") {
                if (positionX > maxPos) return maxPos;
            }
            if (togglerType === "max") {
                if (positionX < minPos) return minPos;
            }
            return positionX;
        },
        onNumbersChange() {
            const min = this.numberValues.min / this.step;
            const max = this.numberValues.max / this.step;

            this.$nextTick().then(() => {
                this.setToggler("min", min);
                this.setToggler("max", max);
            });
        },
        onTogglersMove() {
            const min = Math.round(this.togglerPositions.min * this.step);
            const max = Math.round(this.togglerPositions.max * this.step);

            this.numberValues = {
                min,
                max,
            };
            this.$nextTick().then(() => {
                this.$refs.inputMin.value = min;
                this.$refs.inputMax.value = max;
            });
        },
        onValueChange(src = "inputs") {
            // src === "inputs" || "togglers"
            switch (src) {
                case "inputs":
                default:
                    this.onNumbersChange();
                    break;
                case "togglers":
                    this.onTogglersMove();
                    break;
            }

            this.$nextTick().then(() => {
                this.$emit("update:minValue", this.numberValues.min);
                this.$emit("update:maxValue", this.numberValues.max);
            });
        },
    },
    watch: {
        numberValues: {
            handler() {
                this.onValueChange("inputs");
            },
            deep: true,
        },
        togglerPositions: {
            handler() {
                this.onValueChange("togglers");
            },
            deep: true,
        },
        min() {
            this.initRangeBlock();
        },
        max() {
            this.initRangeBlock();
        },
    },
    mounted() {
        this.$nextTick().then(this.initRangeBlock);
        window.addEventListener("resize", this.initRangeBlock);
        document.addEventListener("pageAnimationEnd", this.initRangeBlock);
    },
    unmounted() {
        window.removeEventListener("resize", this.initRangeBlock);
        document.removeEventListener("pageAnimationEnd", this.initRangeBlock);
    },
};
</script>