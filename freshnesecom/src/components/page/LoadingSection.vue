<template>
    <div class="loading-section" ref="lSection">
        <span class="loading-section__square" ref="square-1"></span>
        <span class="loading-section__square" ref="square-2"></span>
        <div class="loading-section__image" ref="image">
            <img src="@/assets/img/icons/pear.svg" alt="Груша" />
        </div>
        <span class="loading-section__square" ref="square-3"></span>
        <span class="loading-section__square" ref="square-4"></span>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    name: "LoadingSection",
    data() {
        return {
            duration: 0.15,
            animInterval: null,
            color1: "#46760a",
            color2: "#c7522d",
        };
    },
    computed: {
        squaresLeft() {
            return [this.$refs["square-1"], this.$refs["square-2"]];
        },
        squaresRight() {
            return [this.$refs["square-3"], this.$refs["square-4"]];
        },
        animElemsAmount() {
            return this.squaresLeft.length + this.squaresRight.length + 1;
        },
    },
    methods: {
        anim(isForward) {
            const duration = this.duration;
            let delay = 0;
            const colorFrom = isForward ? this.color1 : this.color2;
            const colorTo = isForward ? this.color2 : this.color1;

            const squaresLeft = this.squaresLeft;
            const image = this.$refs.image;
            const squaresRight = this.squaresRight;
            const doApplyAnim = squaresLeft && image && squaresRight;

            if (doApplyAnim) {
                squaresLeft.forEach((sqr, index) => {
                    delay += index * duration;
                    gsap.to(sqr, {
                        backgroundColor: colorTo,
                        delay,
                        duration,
                    });
                });

                delay += duration;
                gsap.to(image, {
                    backgroundColor: colorTo,
                    borderColor: colorFrom,
                    delay,
                    duration,
                });
                delay += duration;

                squaresRight.forEach((sqr, index) => {
                    delay += index * duration;
                    gsap.to(sqr, {
                        backgroundColor: colorTo,
                        delay,
                        duration,
                    });
                });
            }
        },
    },
    mounted() {
        const timeout = this.duration * 1000 * this.animElemsAmount;
        const initAnimation = () => {
            this.anim(true);
            setTimeout(() => this.anim(false), timeout);
        };
        initAnimation();

        this.animInterval = setInterval(initAnimation, timeout * 2);
    },
    unmounted() {
        clearInterval(this.animInterval);
    },
};
</script>