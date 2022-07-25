// !здесь находятся переиспользуемые скрипты, которые можно импортировать в компонент/другой скрипт! //

// скрытие/сокрытие элемента по типу спойлера
export class SpoilerElem {
    constructor(button, body, media = null) {
        this.shownClass = "__shown-spoiler";
        this.height = body.offsetHeight;
        this.button = button;
        this.body = body;
        this.windowWidth = document.documentElement.clientWidth || window.innerWidth;
        body.parentNode.style.overflow = "hidden";

        this.onResize = this.onResize.bind(this);
        this.toggle = this.toggle.bind(this);

        if (media) {
            const onMediaChange = () => {
                if (mediaQuery.matches) this.setHandlers();
                else this.removeHandlers();
            }
            const mediaQuery = window.matchMedia(`(max-width: ${media}px)`);

            onMediaChange();
            mediaQuery.addEventListener("change", onMediaChange);
        }
        else this.setHandlers();
    }
    onResize() {
        const currentWindowWidth = document.documentElement.clientWidth || window.innerWidth;
        if (currentWindowWidth !== this.windowWidth) {
            const isShown = this.button.classList.contains(this.shownClass);

            this.body.style.transition = "none";
            this.show();
            this.height = this.body.offsetHeight;
            if (!isShown) this.hide();
            this.body.style.removeProperty("transition");
            this.windowWidth = currentWindowWidth;
        }
    }
    setHandlers() {
        window.addEventListener("resize", this.onResize);
        this.hide();
        this.button.addEventListener("click", this.toggle);
    }
    removeHandlers() {
        window.removeEventListener("resize", this.onResize);
        this.show();
        this.button.removeEventListener("click", this.toggle);
    }
    toggle() {
        this.button.classList.contains(this.shownClass) ? this.hide() : this.show();
    }
    hide() {
        this.button.classList.remove(this.shownClass);
        [this.body.style.maxHeight, this.body.style.padding, this.body.style.margin] = [0, 0, 0];
    }
    show() {
        this.button.classList.add(this.shownClass);
        this.body.parentNode.style.removeProperty("padding-bottom");
        this.body.style.removeProperty("padding");
        this.body.style.removeProperty("margin");
        this.body.style.maxHeight = `${this.height}px`;

    }
}

// получить товар по коду vendorCode
export function getProd(vendorCode) {
    return this.products.filter(prod => prod.vendorCode === vendorCode)[0];
}

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

export function createNode(tagName, className) {
    const node = document.createElement(tagName);
    node.className = className;
    return node;
}

export function capitalLetter(string) {
    const letters = string.split('');
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
}

export function getKeyPathValue(obj, keyPath) {
    const keys = keyPath.split(".");
    let value = obj[keys[0]];
    for (let i = 1; i < keys.length; i++) value = value[keys[i]];
    return value;
}

export function getCoords(el) {
    const coords = el.getBoundingClientRect();

    return { top: coords.top + window.pageYOffset, left: coords.left + window.pageXOffset };
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
                `Товар ${getProd.call(this, this.vendorCode).name} добавлен в корзину.`,
                {
                    node: "<span class='text-link'>Перейти</span>",
                    handler: () => this.$router.push({ name: "cart" })
                },
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
    let toggleMessage = `Товар ${getProd.call(this, this.vendorCode).name} `;
    toggleMessage += this.isFavorite ? 'добавлен в "избранное"' : 'убран из списка "избранное"';
    this.addNotification({
        message: [
            toggleMessage,
            {
                node: '<span class="text-link">Перейти в "избранное"</span>',
                handler: () => this.$router.push({ name: "favorites" })
            }
        ],
        timetolvie: 3000
    });
}