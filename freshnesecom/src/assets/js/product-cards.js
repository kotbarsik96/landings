import { lStorage } from "./scripts";

// экспортируемые методы должны быть использованы в компонентах ProductDetail, CartItem, ProductCard(Big) и др. похожих в methods неэкспортируемые методы используются в экспортируемых

export function freshness() {
    if (this.product.freshness) {
        const title = this.product.freshness.title;
        const extra = this.product.freshness.extra;

        const colors = {
            "Новое": "--clr-2_A",
            "Не новое": "--clr-1_A",
            "Почти истек срок годности": "--clr-4_A"
        };
        const color = colors[title];

        return {
            title, extra, color
        }
    }
    return null;
}

// ---СПИСОК ЖЕЛАЕМОГО--- //
export function findInWishlist(productId, wishlist = lStorage.getItem("wishlist")) {
    if (wishlist) {
        return wishlist.find(el => el.productId == productId);
    }
    return null;
}
// обязательно наличие this.product.id и this.wishlist
export function isInWishList() {
    return findInWishlist(this.product.id, this.wishlist) ? true : false;
}
// обязательно наличие this.isInWishList
export function toggleWishList() {
    this.isInWishList
        ? removeFromWishlist(this.product.id)
        : addToWishlist(this.product.id);
}

function addToWishlist(productId) {
    const productData = {
        date: Date.now(),
        productId: productId,
    };
    lStorage.pushToArray("wishlist", productData);
}
function removeFromWishlist(productId) {
    const wishlist = lStorage.getItem("wishlist");

    if (wishlist) {
        const index = wishlist.findIndex(
            (el) => el.productId == productId
        );
        if (index >= 0) wishlist.splice(index, 1);
        lStorage.setItem("wishlist", wishlist);
    }
}

// ---КОРЗИНА--- //
export function addToCart(productId, amount) {
    const orderData = {
        orderId: Date.now(),
        orderDate: Date.now(),
        productId: productId,
        amount: amount,
    };
    lStorage.pushToArray("cart", orderData);
}
export function removeFromCart(orderDate) {
    const cart = lStorage.getItem("cart");
    if (cart) {
        const index = cart.findIndex(prod => prod.orderDate == orderDate);
        if (index >= 0) cart.splice(index, 1);
        lStorage.setItem("cart", cart);
    }
}