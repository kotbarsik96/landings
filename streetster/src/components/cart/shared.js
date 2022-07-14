import { lStorage } from "@/assets/js/scripts.js";

export default {
    removeFromCart(orderId, type, subProdId = null) {
        const cart = lStorage.getItem("cart");
        const index = cart.findIndex(prod => prod.orderId === orderId);

        // если велосипед - убрать заказ из корзины
        if (type === "bike") cart.splice(index, 1);
        // если акссессуар - убрать из заказа, вычесть его цену из цены заказа
        if (type == "accessories") {
            const order = cart[index];
            const subProds = order[type];
            const subIndex = subProds.findIndex(subProd => subProd.id === subProdId);
            order.prices[type] -= subProds[subIndex].price;
            subProds.splice(subIndex, 1);
        }

        lStorage.setItem("cart", cart);
    },
    totalPrice() {
        let total = 0;
        this.cart.forEach((item) => {
            if (item.prices) {
                const itemTotal = item.prices.bike + item.prices.accessories;
                total += itemTotal;
            }
        });
        return total;
    },
}