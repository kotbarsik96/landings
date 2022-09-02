<template>
    <footer class="footer">
        <nav v-if="!isOnlyCopyright" class="footer__nav container">
            <div
                class="footer__nav-column"
                :class="{ __active: activeColumn === 1 }"
            >
                <h4 class="title" @click="setActiveColumn(1)">
                    Связаться с нами
                </h4>
                <div class="footer__nav-column-links">
                    <RouterLink :to="{}" class="link">О нас</RouterLink>
                    <RouterLink :to="{}" class="link">Работа</RouterLink>
                    <RouterLink :to="{}" class="link">Пресс релизы</RouterLink>
                    <RouterLink :to="{ name: 'blogs' }" class="link">Блог</RouterLink>
                </div>
            </div>
            <div
                class="footer__nav-column"
                :class="{ __active: activeColumn === 2 }"
            >
                <h4 class="title" @click="setActiveColumn(2)">
                    Социальные сети
                </h4>
                <div class="footer__nav-column-links">
                    <RouterLink :to="{}" class="link">Twitter</RouterLink>
                    <RouterLink :to="{}" class="link">YouTube</RouterLink>
                    <RouterLink :to="{}" class="link">LinkedIn</RouterLink>
                </div>
            </div>
            <div
                class="footer__nav-column"
                :class="{ __active: activeColumn === 3 }"
            >
                <h4 class="title" @click="setActiveColumn(3)">Аккаунт</h4>
                <div class="footer__nav-column-links">
                    <div :to="{}" class="link" @click="addModal('ModalAccount')">Ваш аккаунт</div>
                    <RouterLink :to="{}" class="link"
                        >Центр возврата</RouterLink
                    >
                    <RouterLink :to="{}" class="link"
                        >100% защита покупки</RouterLink
                    >
                    <RouterLink :to="{}" class="link"
                        >Написать нам в чат</RouterLink
                    >
                    <RouterLink :to="{}" class="link">Помощь</RouterLink>
                </div>
            </div>
        </nav>
        <div v-if="!isOnlyCopyright" class="footer__tags container">
            <h4 class="title">Теги продуктов</h4>
            <ul class="footer__tags-list">
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Бобы
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Морковь
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Яблоки
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Чеснок
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Помидоры
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Перцы чили
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Брокколи
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Арбузы
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Апельсины
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Бананы
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Виноград
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Мясо
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Морепродукты
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Рыба
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Свежая еда
                </li>
                <li class="footer__tags-item tag" @click="toggleTag($event)">
                    Лимоны
                </li>
            </ul>
        </div>
        <div class="footer__copyright container">
            <p>
                Copyright © 2020 designed by
                <a href="https://petrbilek.com" class="link--uncolored"
                    >petrbilek.com</a
                >
            </p>
            <p>
                Layout:
                <a href="https://github.com/kotbarsik96" class="link--uncolored"
                    >github.com/kotbarsik96</a
                >
            </p>
        </div>
    </footer>
</template>

<script>
import { closeByDocumentClick } from "@/assets/js/scripts.js";
import { mapMutations } from "vuex";

export default {
    name: "PageFooter",
    props: {
        isOnlyCopyright: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeColumn: null,
        };
    },
    methods: {
        ...mapMutations(["addModal"]),
        setActiveColumn(num) {
            if (!num) return (this.activeColumn = null);

            const currentActive = this.activeColumn;
            this.activeColumn = currentActive === num ? null : num;
        },
        toggleTag(event){
            const tag = event.target;
            const cList = tag.classList;
            if(cList.contains("__active")) cList.remove("__active");
            else cList.add("__active");
        },
        closeColumns: closeByDocumentClick,
    },
    mounted() {
        document.addEventListener("click", (event) => {
            this.closeColumns(event, "footer__nav-column", "activeColumn");
        });
    },
};
</script>