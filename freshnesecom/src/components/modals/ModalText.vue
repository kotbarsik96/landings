<template>
    <div class="modal-window">
        <ModalHeader class="modal-window__wrapper" @closeClick="removeModal">
            {{ modalParams.title }}
        </ModalHeader>
        <div class="modal-window__wrapper modal-window__body">
            {{ modalParams.text }}
        </div>
    </div>
</template>

<script>
import ModalHeader from "@/components/modals/ModalHeader.vue";
import { mapMutations } from "vuex";

export default {
    name: "ModalText",
    components: { ModalHeader },
    props: {
        modalParams: Object,
    },
    methods: {
        ...mapMutations(["addModal", "removeModal"]),
    },
};
</script>