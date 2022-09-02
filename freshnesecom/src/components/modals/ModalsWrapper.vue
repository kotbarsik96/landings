<template>
    <Transition name="modals-wrapper">
        <div
            class="modals-wrapper"
            v-if="modals.length > 0"
            @pointerdown="removeLast"
            ref="modalsWrapper"
        >
            <TransitionGroup name="modal-window">
                <component
                    v-for="(modal, index) in modals"
                    :key="getModalName(modal) + index"
                    :is="getModalName(modal)"
                    v-bind="getParams(modal)"
                ></component>
            </TransitionGroup>
        </div>
    </Transition>
</template>

<script>
import modalsComponents from "./index.js";
import { mapGetters, mapMutations } from "vuex";

const components = {};
modalsComponents.forEach((modal) => (components[modal.name] = modal));

export default {
    name: "ModalsWrapper",
    components,
    props: {
        routePath: String,
    },
    computed: {
        ...mapGetters(["modals"]),
    },
    methods: {
        ...mapMutations(["removeModal", "removeAllModals"]),
        removeLast(event) {
            const modalsWrapper = this.$refs.modalsWrapper;
            if (event.target === modalsWrapper) this.removeModal();
        },
        getModalName(modal) {
            if (typeof modal === "string") return modal;
            if (typeof modal === "object") return modal.name;
        },
        getParams(modal) {
            if (modal) {
                if (modal.params) return { modalParams: modal.params };
            }
            return {};
        },
    },
    watch: {
        routePath() {
            this.removeAllModals();
        },
    },
};
</script>

<style lang="scss">
$modals_transition_dur: 0.4s;

.modals-wrapper {
    &-enter-active,
    &-leave-active {
        transition: all $modals_transition_dur;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
    }
}
.modal-window {
    &-enter-active,
    &-leave-active {
        transition: all $modals_transition_dur;
    }

    &-enter-from,
    &-leave-to {
        transform: scale(0);
    }

    &-enter-to,
    &-leave-from {
        transform: scale(1);
    }
}
</style>