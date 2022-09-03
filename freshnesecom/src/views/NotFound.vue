<template>
    <main class="not-found">
        <div class="not-found__container">
            <template v-if="isLoadingError">
                <p>К сожалению, произошла ошибка на сайте. Попробуйте перезайти позднее</p>
            </template>
            <template v-else>
                <p>К сожалению, такой страницы не найдено</p>
                <RouterLink :to="{ name: 'home' }" class="not-found__link link"
                    >Вернуться на главную</RouterLink
                >
            </template>
        </div>
    </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "NotFound",
    computed: {
        ...mapGetters(["isLoadingError"])
    }
};
</script>