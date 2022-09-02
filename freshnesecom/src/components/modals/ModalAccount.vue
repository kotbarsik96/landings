<template>
    <div class="modal-window modal-account">
        <template v-if="signedUser">
            <ModalHeader class="modal-window__wrapper" @closeClick="removeModal"
                >Ваш аккаунт</ModalHeader
            >
        </template>
        <template v-else>
            <ModalHeader
                class="modal-window__wrapper"
                @closeClick="removeModal"
            >
                Войти в аккаунт
            </ModalHeader>
            <div class="modal-window__wrapper">
                <RouterLink
                    :to="{ name: 'wishlist' }"
                    class="__icon-actions-heart modal-account__wishlist-button"
                    >Просмотреть список избранного</RouterLink
                >
            </div>
            <div class="modal-window__wrapper modal-account__signin">
                <h4 class="modal-account__signin-title">Войти в аккаунт</h4>
                <div class="modal-account__signin-inputs">
                    <InputWrapper>
                        <template #label>Email</template>
                        <InputText
                            name="signin"
                            placeholder="Email аккаунта"
                        ></InputText>
                    </InputWrapper>
                    <InputWrapper>
                        <template #label>Пароль</template>
                        <InputText
                            name="signin"
                            placeholder="Пароль"
                        ></InputText>
                    </InputWrapper>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import ModalHeader from "@/components/modals/ModalHeader.vue";
import { mapMutations } from "vuex";

export default {
    name: "ModalAccount",
    components: { ModalHeader },
    computed: {
        signedUser() {
            return false;
        },
    },
    methods: {
        ...mapMutations(["removeModal"]),
    },
};
</script>