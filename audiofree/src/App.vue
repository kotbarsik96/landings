<template>
    <page-wrapper>
        <router-view v-slot="{ Component }">
            <transition
                name="page-transition"
                :mode="transitionMode"
            >
                <component
                    :is="Component"
                    :key="pathKey"
                ></component>
            </transition>
        </router-view>
        <notifications-list></notifications-list>
    </page-wrapper>
</template>

<script>
import "@/assets/scss/styles.scss";
import { mapActions, mapMutations } from "vuex";
import { createNode } from "@/assets/js/scripts";
import NotificationsList from "@/components/notifications/NotificationsList";

export default {
    components: { NotificationsList },
    data() {
        return {
            loadingScreen: null,
            isLoadingScreenInserted: false,
        };
    },
    computed: {
        pathKey() {
            // не обновлять страницу в следующих разделах: catalogue
            const exceptions = ["catalogue"];
            let path = this.$route.path;
            if (this.handleExceptions(exceptions, path))
                path = this.$route.name;
            return path;
        },
        transitionMode() {
            // убрать mode="out-in", если в pathKey встречено исключение из списка
            const exceptions = ["products"];
            if (this.handleExceptions(exceptions, this.pathKey)) {
                return "";
            }
            return "out-in";
        },
    },
    methods: {
        ...mapActions(["loadProducts"]),
        ...mapMutations(["localStorageChangeEventListener"]),
        handleExceptions(exceptionsArr, strToTest) {
            const regExps = exceptionsArr.map(
                (str) => new RegExp(`${str}+`, "g")
            );
            let isException = false;
            regExps.forEach((reg) => {
                if (reg.test(strToTest)) isException = true;
            });

            return isException;
        },
        createLoadingScreen() {
            const lScreen = createNode("div", "loading-screen");
            const lScreenLogo = createNode(
                "div",
                "loading-screen__icon __icon-logo"
            );
            const lScreenWrapper = createNode("div", "loading-screen__wrapper");

            const circlesAmount = 20;
            for (let i = 1; i <= circlesAmount; i++) {
                const lScreenCircle = createNode(
                    "div",
                    "loading-screen__circle"
                );
                lScreenCircle.style.cssText = `--i: ${i};`;
                lScreenWrapper.append(lScreenCircle);
            }

            lScreen.append(lScreenWrapper);
            lScreen.append(lScreenLogo);
            this.loadingScreen = lScreen;
        },
        toggleLoadingScreen() {
            if (!this.loadingScreen) this.createLoadingScreen();

            const wrapper = document.querySelector(".wrapper");
            let pageIsLoaded = false;
            if (wrapper) {
                const children = Array.from(wrapper.childNodes).filter(
                    (nd) => nd.nodeType !== 3
                );
                pageIsLoaded =
                    wrapper.querySelector(".header") ||
                    wrapper.querySelector(".footer") ||
                    children.length < 3;
            }

            if (!pageIsLoaded && !this.isLoadingScreenInserted) {
                document.body.append(this.loadingScreen);
                this.isLoadingScreenInserted = true;
                setTimeout(() => {
                    this.$nextTick().then(this.toggleLoadingScreen);
                }, 100);
            }
            if (pageIsLoaded) this.loadingScreen.remove();
        },
    },
    created() {
        this.toggleLoadingScreen();
    },
    mounted() {
        this.loadProducts();
        this.localStorageChangeEventListener();
    },
};
</script>

<style lang="scss">
.page-transition {
    &-enter-active {
        animation: appear 1s ease;
    }
    @keyframes appear {
        0% {
            opacity: 0;
            transform: translate(0, 100vh);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    &-leave-active {
        animation: leave 1s ease-in;
    }
    @keyframes leave {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(0, -100vh);
        }
    }
}
</style>