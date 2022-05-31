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
// получить координаты элемента //
function getCoords(el) {
    const coords = el.getBoundingClientRect();

    return { top: coords.top + window.pageYOffset, left: coords.left + window.pageXOffset };
}

// присвоить/убрать класс __active //
function toggleActive(node, bool = null) {
    if (bool !== null) bool ? add() : remove();
    if (bool === null) node.classList.contains('__active') ? remove() : add();

    function add() {
        node.classList.add('__active');
    }
    function remove() {
        node.classList.remove('__active');
    }
}

// шапка //
class Header {
    constructor() {
        this.header = document.querySelector('.header');

        this.headerButtonHandler();
        this.fixOnScroll();
        this.setSectionPadding();
    }
    headerButtonHandler() {
        const headerBtn = this.header.querySelector('.header__menu-button');
        const body = document.body;
        headerBtn.addEventListener('click', () => this.toggleHeaderMenu());
    }
    toggleHeaderMenu() {
        const headerBtn = this.header.querySelector('.header__menu-button');

        toggleActive(headerBtn);
        headerBtn.classList.contains("__active")
            ? document.body.classList.add("__no-scroll")
            : document.body.classList.remove("__no-scroll");
    }
    fixOnScroll() {
        const compress = () => {
            window.pageYOffset > this.header.offsetHeight
                ? this.header.classList.add("__scrolled")
                : this.header.classList.remove("__scrolled");
        };

        compress();
        window.addEventListener("scroll", compress);
    }
    setSectionPadding() {
        const doSet = () => {
            const section = document.querySelector('section');
            const headerHeight = this.header.offsetHeight;
            if (section) section.style.paddingTop = `${headerHeight}px`;
        }

        doSet();
        window.addEventListener("resize", doSet);
    }
}
const headerControl = new Header();

// навигационные колонки (обычно в футере) //
function toggleNavsCol() {
    const navsList = document.querySelectorAll('.navs');
    navsList.forEach(navs => {
        const titles = navs.querySelectorAll('.navs__title');
        titles.forEach(title => {
            title.addEventListener('click', function () {
                if (title.parentNode.classList.contains('__active')) hideAll(titles);
                else {
                    hideAll(titles);
                    show(title);
                }
            });
        });
    });

    function show(title) {
        title.parentNode.classList.add('__active');
    }
    function hideAll(titles) {
        titles.forEach(title => title.parentNode.classList.remove('__active'));
    }
}
toggleNavsCol();

// анимация при прокрутке // 
function scrollAnim() {
    const animElems = Array.from(document.querySelectorAll("[data-anim]"));
    const animObjects = animElems.map(animEl => {
        const isRepeatable = animEl.dataset.anim.search(/repeat/i) >= 0 ? true : false;
        const isQueued = animEl.dataset.anim.search(/queue/i) >= 0 ? true : false;
        const durationValue = animEl.dataset.anim.match(/\d/g);
        const duration = durationValue ? parseInt(durationValue.join("")) : 500;

        animEl.style.transitionDuration = `${duration / 1000}s`;

        let animClassNum = animEl.dataset.animNum;
        if (!animClassNum) {
            animClassNum = "1";
            animEl.dataset.animNum = "1";
        }

        return { el: animEl, isRepeatable, isQueued, duration, animClass: "__animated--" + animClassNum };
    });
    const animQueue = [];
    const animPoint = document.documentElement.offsetHeight - document.documentElement.offsetHeight / 5;

    onScroll();
    window.addEventListener("scroll", onScroll);

    function onScroll() {
        const scroll = window.pageYOffset;
        animObjects.forEach(anim => {
            const animElTop = getCoords(anim.el).top;
            const isVisible = scroll >= animElTop - animPoint && scroll <= animElTop + anim.el.offsetHeight;
            anim.isVisible = isVisible;

            if (!isVisible && anim.isRepeatable) removeAnim(anim);
            else if (isVisible && !anim.el.classList.contains(anim.animClass)) anim.isQueued ? handleQueue(anim) : applyAnim(anim);
        });
    }
    function handleQueue(anim = null) {
        if (anim && !animQueue.includes(anim)) animQueue.push(anim);
        if (animQueue.length > 0) {
            for (let i = 0; i < animQueue.length; i++) {
                if (animQueue[i].isVisible) {
                    applyAnim(animQueue[i])
                        .then(handleQueue)
                        .catch(() => { return });
                    break;
                } else continue;
            }
        }
    }
    function applyAnim(anim) {
        return new Promise((resolve, reject) => {
            if (anim.isAnimating) reject();
            else {
                anim.isAnimating = true;
                anim.el.classList.add(anim.animClass);
                setTimeout(() => {
                    anim.isAnimating = false;
                    animQueue.splice(animQueue.indexOf(anim), 1);
                    resolve();
                }, anim.duration);
            }
        });
    }
    function removeAnim(anim) {
        anim.el.classList.remove(anim.animClass);
    }
}
scrollAnim();

// навигация по странице через ссылки //
function navAnchors() {
    const anchors = Array.from(document.querySelectorAll("[href^='#']")).filter(a => a.getAttribute("href").length > 1);
    anchors.forEach(a => {
        a.addEventListener("click", onClick);
    });

    function onClick(event) {
        event.preventDefault();
        const a = event.target.tagName === "A" ? event.target : event.target.querySelector("a[href='#']");
        const navElem = document.querySelector(a.getAttribute("href"));
        if (navElem) {
            if(document.querySelector(".header__menu-button.__active")) headerControl.toggleHeaderMenu();

            setTimeout(() => {
                window.scrollTo({
                    top: getCoords(navElem).top - 100,
                    behavior: "smooth"
                });
            }, 0);
        }
    }
}
navAnchors();