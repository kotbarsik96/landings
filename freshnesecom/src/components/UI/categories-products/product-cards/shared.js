import StarRating from "@/components/UI/categories-products/StarRating.vue";
import rootPath from "@/root-path.js";
import { calcDiscount, cutString } from "@/assets/js/scripts.js";
import { toggleWishList, isInWishList, freshness } from "@/assets/js/product-cards.js";
import { mapGetters } from "vuex";

export default {
    components: { StarRating },
    props: {
        showRating: {
            type: Boolean,
            default: false,
        },
        tag: {
            type: String,
            default: "div"
        },
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            rootPath
        };
    },
    computed: {
        ...mapGetters(["products", "wishlist"]),
        product() {
            return this.products.find(prod => prod.id == this.id);
        },
        prodSubtitle() {
            if (this.product.subtitleCard) {
                return cutString(this.product.subtitleCard, 30);
            }
            return null;
        },
        isInStock() {
            return this.product.stock;
        },
        discount() {
            const oldPrice = this.product.oldPrice;
            const price = this.product.price;
            return calcDiscount(oldPrice, price);
        },
        freshness,
        isInWishList,
    },
    methods: {
        toggleWishList
    },
}