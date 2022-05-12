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