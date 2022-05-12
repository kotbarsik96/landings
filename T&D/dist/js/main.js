function checkWebpSupport() {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            resolve(document.querySelector('body').classList.add('webp'));
        }
        img.onerror = function () {
            reject(document.querySelector('body').classList.remove('webp'));
        }
        img.src = 'img/check-webp/check.webp';
    })
}

checkWebpSupport();
function initShorts() {
    class Header {
        constructor() {
            this.header = document.querySelector('.header');

            this.toggleMenuListener();
            this.scrollHandler();
            this.setPaddingTop();
            this.toggleCartMenu();
        }
        toggleMenuListener() {
            const burger = this.header.querySelector('.burger');
            burger.addEventListener('click', () => {
                const menu = burger.parentNode.querySelector('.toggling-menu');
                burger.classList.toggle('__active');
                if (burger.classList.contains('__active')) menu.classList.add('__active');
                else menu.classList.remove('__active');
            });
        }
        scrollHandler() {
            const header = this.header;
            const headerTop = this.header.querySelector('.header-top');
            let prevPoint = window.pageYOffset;
            window.addEventListener('scroll', onScroll);

            function onScroll() {
                let newPoint = window.pageYOffset;
                if (prevPoint < newPoint) onScrollDown();
                if (prevPoint > newPoint) onScrollUp();
                prevPoint = newPoint;
            }
            function onScrollUp() {
                header.style.top = '0px';
            }
            function onScrollDown() {
                header.style.top = `-${headerTop.offsetHeight}px`;
            }
        }
        setPaddingTop() {
            const main = document.querySelector('.main');
            const headerHeight = this.header.offsetHeight + 'px';
            if (main) main.style.paddingTop = headerHeight;
        }
        toggleCartMenu(){
            const btns = Array.from(document.querySelectorAll('.button--cart'));
            const menu = this.header.querySelector('.cart');
            if(btns.length > 0 && menu){
                btns.forEach(btn => btn.addEventListener('click', onClick));
                menu.addEventListener('click', onClick);
            }

            function onClick(event){
                const scrollWidth = getScrollWidth();
                if(this.classList.contains('button--cart') || event.target.classList.contains('cart')) {
                    menu.classList.toggle('__active');
                    menu.classList.contains('__active') ? toggleScroll(false, scrollWidth) : toggleScroll(true);
                }
            }
            function toggleScroll(isScroll, scrollWidth = 0){
                const body = document.querySelector('body');
                const header = body.querySelector('.header');
                if(isScroll){
                    body.style.removeProperty('overflow');
                    body.style.removeProperty('padding-right');
                    header.style.removeProperty('padding-right');
                }
                else{
                    body.style.overflow = 'hidden';
                    body.style.paddingRight = `${scrollWidth}px`;
                    header.style.paddingRight = `${scrollWidth}px`;
                }
            }
            function getScrollWidth(){
                const div = document.createElement('div');
                div.style.cssText = `
                    width: 50px;
                    height: 50px;
                    overflow: scroll;
                `;
                document.body.append(div);
                const scrollWidth = div.offsetWidth - div.clientWidth;
                div.remove();
                return scrollWidth;
            }
        }
    }
    const header = new Header();

    function toggleNavItems() {
        const navItems = document.querySelectorAll('.nav');
        navItems.forEach(nav => {
            const titles = nav.querySelectorAll('.nav__title');
            titles.forEach(title => {
                title.addEventListener('click', () => {
                    if (title.parentNode.classList.contains('__active')) hideAll(titles);
                    else show(title, titles);
                });
            });
        });

        function show(title, titles) {
            hideAll(titles);
            title.parentNode.classList.add('__active');
        }
        function hideAll(titles) {
            titles.forEach(i => i.parentNode.classList.remove('__active'));
        }
    }
    toggleNavItems();

    function onlyNumbers() {
        const inputs = document.querySelectorAll('input[data-only-number]');
        inputs.forEach(inp => {
            inp.addEventListener('input', function () {
                let val = inp.value;
                inp.value = val.replace(/\D/g, '');
            });
        });
    }
    onlyNumbers();
}

function getStorage(key) {
    if (typeof (key) === 'string') {
        let storage = JSON.parse(localStorage.getItem(key));
        if(!storage) storage = [];
        return storage;
    }
}
function setStorage(key, obj) {
    if (typeof (key) === 'string') {
        const strObj = JSON.stringify(obj);
        localStorage.setItem(key, strObj);
    }
}
function initBrowsing() {
    const browsings = Array.from(document.querySelectorAll('.browsing'));
    if (browsings.length > 0) {
        browsings.forEach(browsing => {
            const brWrapper = browsing.querySelector('.browsing__wrapper');
            const brButtons = Array.from(browsing.querySelectorAll('[data-browsing-button]'));

            const pairsArray = [];
            brButtons.forEach(btn => {
                const name = btn.dataset.browsingButton;
                const elem = brWrapper.querySelector(`[data-browsing-elem="${name}"]`);
                const obj = { name: name, elem: elem };
                pairsArray.push(obj);

                btn.addEventListener('click', moveWrapper);
            });
            moveWrapper();

            function moveWrapper(event = null) {
                if (event) {
                    const btn = this;
                    const elem = brWrapper.querySelector(`[data-browsing-elem="${btn.dataset.browsingButton}"]`);
                    pairsArray.forEach(pair => {
                        if (pair.elem === elem) moveByClick(pair, btn);
                    });
                }
                else moveDefault();
            }
            function moveByClick(pair, btn) {
                setActive(btn, pair.elem);

                const pairIndex = pairsArray.indexOf(pair);
                brWrapper.style.cssText = `
                    transform: translate(-${pairIndex * 100}%, 0);
                    max-height: ${pair.elem.offsetHeight}px;
                `;
            }
            function moveDefault() {
                const pair = pairsArray[0];

                const btn = browsing.querySelector(`[data-browsing-button="${pair.name}"]`);
                setActive(btn, pair.elem);
                brWrapper.style.cssText = `
                    transform: translate(0, 0);
                    max-height: ${pair.elem.offsetHeight}px;
                `;
            }
            function setActive(btn, elem) {
                brButtons.forEach(b => b.classList.remove('__active'));
                pairsArray.forEach(pair => pair.elem.classList.remove('__active'));
                btn.classList.add('__active');
                elem.classList.add('__active');
            }
        });
    }
}
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