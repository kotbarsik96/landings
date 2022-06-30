import { nextTick } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { lStorage, addToCart, toggleFavorites, mediaQueriesHandlers } from "@/assets/js/scripts";
import rootPath from "@/assets/root-path";

export default {
    props: {
        vendorCode: String,
    },
    emits: ["favoriteToggled"],
    data() {
        return {
            rootPath,
            isIconsOpened: false,
            isFavorite: false,
            mediaQueries: {
                992: false
            },
            cardButtonsParents: {}
        };
    },
    computed: {
        ...mapGetters(["products", "productCards"]),
        product() {
            const prodArrayFiltered = this.products.filter(prod => prod.vendorCode === this.vendorCode);
            return prodArrayFiltered[0];
        },
    },
    methods: {
        ...mapMutations(["addProductCardComponent", "addNotification"]),
        toggleCardIcons() {
            this.isIconsOpened = !this.isIconsOpened;
        },
        addToCart,
        toggleFavorites,
        mediaQueriesHandlers,
        placeCardButtons(doReplace = false) {
            const cardButtons = this.$refs.cardButtons;
            if (!cardButtons) return;

            const parents = this.cardButtonsParents;
            if (!parents.mobile) parents.mobile = this.$refs.cardIconsContainer;
            if (!parents.desktop) parents.desktop = cardButtons.parentNode;

            if (parents.mobile && cardButtons)
                doReplace ? parents.mobile.append(cardButtons) : parents.desktop.append(cardButtons);
        },
    },
    watch: {
        'mediaQueries.992'(matches) {
            this.placeCardButtons(matches);
        },
        // здесь нужно вызывать методы, которые должны работать только после полной отрисовки компонента; полная отрисовка выполняется только если есть загружен product
        product(newVal, oldVal) {
            if (!oldVal && newVal) {
                nextTick().then(() => {
                    this.placeCardButtons();
                });
            }
        }
    },
    mounted() {
        this.addProductCardComponent(this);
        this.isFavorite = lStorage.getStorage(lStorage.keys.favorites).includes(this.vendorCode);
        this.mediaQueriesHandlers();
    },
}