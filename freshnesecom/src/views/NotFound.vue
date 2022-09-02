<template>
    <main class="not-found">
        <div class="not-found__container">
            <p>
                К сожалению, такой страницы не найдено
            </p>
            <RouterLink :to="{ name: 'home' }" class="not-found__link link">Вернуться на главную</RouterLink>
        </div>
    </main>
</template>

<script>
export default {
    name: "NotFound"
}
</script>