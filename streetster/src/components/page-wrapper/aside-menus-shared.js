export default {
    toggleAside(event, asideTitle) {
        const classList = event.target.classList;
        const closestMenuBtn = event.target.closest(".menu-button");
        if (
            classList.contains("aside-menu") ||
            classList.contains("menu-button") ||
            closestMenuBtn
        ) {
            this.$emit("changeAsideState", asideTitle);
        }
    },
}