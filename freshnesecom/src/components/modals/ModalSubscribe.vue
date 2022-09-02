<template>
    <div class="modal-window subscribe-window">
        <ModalHeader :titleTag="modalParams.titleTag || 'h2'" class="modal-window__wrapper" @closeClick="removeModal">
            Присоединяйтесь к нам
            <template #subtitle>
                Войдите, чтобы первым получать эксклюзивные предложения, рецепты
                от наших шефов и многое другое
            </template>
        </ModalHeader>
        <div class="subscribe-window__body">
            <div class="modal-window__wrapper subscribe-window__options">
                <InputOption name="subscribe-option" :inputIcons="{ unchecked: 'actions-select', checked: 'actions-check' }" :isField="false">Экслюзивы</InputOption>
                <InputOption name="subscribe-option" :inputIcons="{ unchecked: 'actions-select', checked: 'actions-check' }" :isField="false">Особые предложения</InputOption>
                <InputOption name="subscribe-option" :inputIcons="{ unchecked: 'actions-select', checked: 'actions-check' }" :isField="false">Премиальные рецепты</InputOption>
                <InputOption name="subscribe-option" :inputIcons="{ unchecked: 'actions-select', checked: 'actions-check' }" :isField="false">Советы и хитрости</InputOption>
                <InputOption name="subscribe-option" :inputIcons="{ unchecked: 'actions-select', checked: 'actions-check' }" :isField="false">Истории поваров</InputOption>
            </div>
            <InputText class="subscribe-window__email" name="subscribe-email" placeholder="Ваш email адрес">
                <template #button>Подписаться</template>
            </InputText>
        </div>
    </div>
</template>

<script>
import ModalHeader from "@/components/modals/ModalHeader.vue";
import { mapMutations } from "vuex";

export default {
    name: "ModalSubscribe",
    components: { ModalHeader },
    props: {
        modalParams: {
            type: Object,
            default: {}
        }
    },
    methods: {
        ...mapMutations(["removeModal"]),
    },
};
</script>