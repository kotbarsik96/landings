const CartApp = {
    data() {
        return {
            products: [],
            cart: []
        }
    },
    mounted() {
        fetch('js/JSON/products.json')
            .then(resolve => resolve.json())
            .then(products => this.products = products)
            .then(() => {
                this.refreshCart();
                initShorts();
                initBrowsing();
            });
    },
    methods: {
        refreshCart(){
            this.cart = getStorage('tad_cart');
            const amountCircles = document.querySelectorAll('.button__circle--cart');
            amountCircles.forEach(elem => elem.innerHTML = this.cart.length);
        },
        addToCart(prod, type, event) {
            const prodCard = event.target.closest('.menu-item');
            const amount = prodCard.querySelector('input[name="amount"]').value;
            const prodInfo = {
                type: type,
                name: prod.name,
                img: prod.img,
                index: prod.index,
                amount: amount,
                pricePer: prod.price,
                priceTotal: parseFloat(prod.price) * amount
            };
            const storage = getStorage('tad_cart');
            storage.push(prodInfo);
            setStorage('tad_cart', storage);
            this.refreshCart();
        },
        removeFromCart(prodIndex){
            const storage = getStorage('tad_cart');
            storage.splice(prodIndex, 1);
            setStorage('tad_cart', storage);
            this.refreshCart();
        }
    }
}

Vue.createApp(CartApp).mount('#cart-app');