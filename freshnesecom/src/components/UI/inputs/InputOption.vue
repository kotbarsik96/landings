<template>
    <div
        class="input-block option-input"
        :class="{
            'input-field': isField,
            'checkbox-input': type === 'checkbox',
            'radio-input': type === 'radio',
        }"
        :style="{
            backgroundColor: isContentShown ? 'transparent' : '',
            transition: `background ${contentShowDur}s`,
        }"
    >
        <label
            class="option-input__value"
            :class="{ '--grid': $slots.add || $slots.image }"
        >
            <input :type="type" :name="name" ref="input" />
            <div
                class="option-input__value-btn"
                :class="{
                    [valueBtnIcons.checked]: isChecked,
                    [valueBtnIcons.unchecked]: !isChecked,
                }"
            >
                <slot></slot>
            </div>
            <div
                class="option-input__value-add"
                v-if="$slots.add || $slots.image"
            >
                <slot name="add"></slot>
            </div>
            <div
                class="option-input__value-image"
                v-if="$slots.add || $slots.image"
            >
                <slot name="image"></slot>
            </div>
        </label>
        <Transition
            :css="false"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
        >
            <div class="option-input__content" v-if="isContentShown">
                <slot name="content"></slot>
            </div>
        </Transition>

        <div
            class="option-input__content"
            ref="contentCloneForHeight"
            v-if="$slots.content"
            style="opacity: 0; visibility: hidden; position: absolute"
        >
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    name: "InputOption",
    props: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "checkbox", // "radio"
        },
        isField: {
            type: Boolean,
            default: true,
        },
        inputIcons: {
            type: Object,
            default: {}, // { checked: 'actions-multi_success_bg', unchecked: 'actions-multi' }
        },
    },
    data() {
        return {
            isChecked: false,
            contentSizes: {
                height: 0,
                width: 0,
            },
            contentShowDur: 1,
        };
    },
    computed: {
        isContentShown() {
            return this.$slots.content && this.isChecked;
        },
        valueBtnIcons() {
            const defaultIcons = {
                radio: {
                    checked: "actions-selected_bg",
                    unchecked: "actions-select",
                },
                checkbox: {
                    checked: "actions-multi_success_bg",
                    unchecked: "actions-multi",
                },
            };
            const defaultChecked = defaultIcons[this.type].checked;
            const defaultUnchecked = defaultIcons[this.type].unchecked;

            const customIcons = this.inputIcons;

            if (customIcons) {
                const checked = customIcons.checked || defaultChecked;
                const unchecked = customIcons.unchecked || defaultUnchecked;

                return {
                    checked: `__icon-${checked}`,
                    unchecked: `__icon-${unchecked}`,
                };
            } else {
                return {
                    checked: `__icon-${defaultChecked}`,
                    unchecked: `__icon-${defaultUnchecked}`,
                };
            }
        },
    },
    methods: {
        getContentHeight() {
            if (this.$slots.content) {
                const el = this.$refs.contentCloneForHeight;
                this.contentSizes = {
                    height: el.offsetHeight + 100,
                    width: el.offsetWidth + 100,
                };
                el.remove();
            }
        },
        setState() {
            const inputs = Array.from(
                document.querySelectorAll(`input[name="${this.name}"]:checked`)
            );
            this.isChecked = inputs.includes(this.$refs.input);
        },
        onBeforeEnter(el) {
            gsap.set(el, {
                maxHeight: 0,
                maxWidth: this.contentSizes.width / 1.5,
                opacity: 0,
            });
        },
        onEnter(el, done) {
            gsap.to(el, {
                maxHeight: this.contentSizes.height,
                maxWidth: this.contentSizes.width,
                opacity: 1,
                ease: "expo",
                duration: this.contentShowDur,
                onComplete: done,
            });
        },
        onLeave(el, done) {
            gsap.to(el, {
                maxHeight: 0,
                maxWidth: this.contentSizes.width / 1.5,
                padding: 0,
                opacity: 0,
                duration: this.contentShowDur,
                onComplete: done,
            });
        },
    },
    mounted() {
        this.getContentHeight();
        document.addEventListener("change", this.setState);
    },
};
</script>