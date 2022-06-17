// !здесь находятся переиспользуемые скрипты, которые можно импортировать в компонент/другой скрипт! //

// управление localStorage
export const lStorage = {
    keys: {
        cart: "audiofree_cart",
        cartOneclick: "audiofree_cart_oneclick",
        "cart-oneclick": "audiofree_cart_oneclick", // приоритетнее
        favorites: "audiofree_favorites"
    },
    getStorage(key) {
        let array = JSON.parse(localStorage.getItem(key));
        if (!array) {
            array = [];
            this.setStorage(key, array)
        };
        return array;
    },
    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    addToArray(arrKey, value) {
        let array = this.getStorage(arrKey);
        if (!Array.isArray(array)) array = [];

        array.push(value);
        this.setStorage(arrKey, array);
    },
    removeFromArray(arrKey, value) {
        let array = this.getStorage(arrKey);
        if (!Array.isArray(array)) return;

        if (array.includes(value)) array.splice(array.indexOf(value), 1);
        this.setStorage(arrKey, array);
    }
}

export function generateId(mixins = null) {
    let id = Date.now().toString();
    if (mixins) {
        mixins = mixins.toString();
        id = id.replace("5", mixins[mixins.length - 1] + mixins[mixins.length - 2]);
    }
    return id;
}

// обработчики медиа запросов в компоненте
// нужно также внести поле mediaQueries: { mdValue_1: false, mdValue_2: false, ... } в data()
// не забыть вызвать в одном из lifecycle hooks (mounted, created, ...)
export function mediaQueriesHandlers() {
    for (let mdValue in this.mediaQueries) {
        const mdQuery = window.matchMedia(`(max-width: ${mdValue}px)`);
        const onChange = () => {
            this.mediaQueries[mdValue] = mdQuery.matches ? true : false;
        };

        onChange();
        mdQuery.addEventListener("change", onChange);
    }
}

// проверка правильности ввода количества товаров (корзина, страница товара)
export function checkProductAmountCorrect(input, action = "typing", limits = { max: 99, min: 1 }) {
    let value = parseInt(input.value);
    if (!value) value = 1;
    switch (action) {
        case "more":
            if (value < limits.max) input.value = value++ || 1;
            break;
        case "less":
            if (value > limits.min) input.value = value-- || 1;
            break;
        case "typing":
            if (value > limits.max || value < limits.min) value = 1;
            input.value = value.toString().replace(/\D/g, "");
            break;
    }
    // данный value нужно будет поместить в значение внутрь data() (напр.: this.prodParams.amount = value), чтобы сделать реактивным
    return value;
}

// !скрипты для компонентов товаров (product-card, product-page)! //
// !обязательно через mapMutations импортировать:
// addNotification, позволяющий создать popup.
// !
export function addToCart(cartTypeKey = "cart", prodParams = null) {
    const vendorCode = this.vendorCode;
    const product = this.product;
    let productObj = { vendorCode, id: generateId(vendorCode) };

    // поместить информацию о товаре в корзину. Т.к. из маленькой карточки нет возможности выбрать параметры, вроде количества и цвета, они выставляются по умолчанию
    if (!prodParams) {
        productObj.amount = 1;
        for (let key in product.options) {
            const firstItem = product.options[key].list[0];
            productObj[key] = firstItem;
        }
    }
    // если параметры были выбраны, поместить их в корзину
    else Object.assign(productObj, prodParams);

    const arrKey = lStorage.keys[cartTypeKey];
    if (cartTypeKey === "cartOneclick") lStorage.setStorage(arrKey, []);
    lStorage.addToArray(arrKey, productObj);

    // вызвать popup
    if (cartTypeKey === "cart") {
        this.addNotification({
            message: [
                `Товар ${this.products[vendorCode].name} добавлен в корзину.`,
                '<a class="text-link" href="/cart" href="#">Перейти</a>',
                {
                    node: '<span class="link-cancel">Отменить</span>',
                    handler: () => removeFromCart(productObj.id)
                }
            ],
            timetolive: 3500
        });
    }
};
export function removeFromCart(id) {
    const cartKey = lStorage.keys.cart;
    const currentCart = lStorage.getStorage(cartKey);
    const newCart = currentCart.filter(item => item.id !== id);
    lStorage.setStorage(cartKey, newCart);
};
export function toggleFavorites() {
    this.isFavorite = !this.isFavorite;

    const fKey = lStorage.keys.favorites;
    this.isFavorite
        ? lStorage.addToArray(fKey, this.vendorCode)
        : lStorage.removeFromArray(fKey, this.vendorCode);

    this.productCards.forEach((prodCardComp) => {
        if (prodCardComp.vendorCode === this.vendorCode) {
            prodCardComp.isFavorite = this.isFavorite;
        }
    });
    this.$emit("favoriteToggled", this.vendorCode);

    // вызвать popup
    let toggleMessage = `Товар ${this.products[this.vendorCode].name} `;
    toggleMessage += this.isFavorite ? 'добавлен в "избранное"' : 'убран из списка "избранное"';
    this.addNotification({
        message: [
            toggleMessage,
            `<a class="text-link" href="/favorites">Перейти в "избранное"</a>`
        ],
        timetolvie: 3000
    });
}