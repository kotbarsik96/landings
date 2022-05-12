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
// получить координаты блока
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
    }
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

        this.toggleHeaderMenu();
        this.setMainPadding();
        window.addEventListener('resize', this.setMainPadding.bind(this));
    }
    toggleHeaderMenu() {
        const headerBtn = this.header.querySelector('.header__menu-button');
        headerBtn.addEventListener('click', function () { toggleActive(headerBtn) });
    }
    setMainPadding() {
        const main = document.querySelector('.main');
        const headerHeight = this.header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    }
}
new Header();

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

// скролл к блокам
function scrollNav() {
    const navButtons = document.querySelectorAll('a[href*="#"]');
    navButtons.forEach(btn => {
        const id = btn.getAttribute('href').split('#')[1];
        if (id.length > 0) btn.addEventListener('click', onClick);
    });

    function onClick(event) {
        event.preventDefault();
        const btn = this;
        const id = btn.getAttribute('href');    
        const block = document.querySelector(id);

        const headerHeight = document.querySelector('.header').offsetHeight;
        const coord = getCoords(block).top - headerHeight - 60;
        window.scrollTo({
            top: coord,
            behavior: 'smooth'
        });
    }
}
scrollNav();
function scrollAnim() {
    let animObjects = document.querySelectorAll('[class*="anim__object"]');
    if (animObjects.length > 0) {
        for (let obj of animObjects) {
            let animCoords = getCoords(obj);
            let animHeight = obj.offsetHeight;
            let scrollHeight = window.pageYOffset;
            let animValue = 5;
            let animPoint = window.innerHeight - window.innerHeight / animValue;

            if ((window.pageYOffset > animCoords.top - animPoint) && (window.pageYOffset < animHeight + animCoords.top)) {
                applyAnim();
            }
            else {
                removeAnim();
            }


            function applyAnim() {
                obj.classList.add('__animated');
            }
            function removeAnim() {
                if (obj.classList.contains('__unlock-anim')) {
                    obj.classList.remove('__animated');
                }
            }
        }
    }
}

function typeTextAnim() {
    const timeoutDflt = 150;

    const texts = document.querySelectorAll('[class*="anim__object-text"]');
    texts.forEach(text => initTextTyping(text));

    function initTextTyping(textNode) {
        saveTextContent(textNode);
        const hasAnimatedClass = textNode.classList.contains('__animated');
        // поставить обработчик DOM-мутаций
        if (!hasAnimatedClass) {
            const observer = new MutationObserver(onMutation);
            observer.observe(textNode, { attributes: true, attributeOldValue: true });
        }
        // просто анимировать текст
        if (hasAnimatedClass) type(textNode);
    }
    function onMutation(mtList) {
        mtList.forEach(mutn => {
            const textNode = mutn.target;
            if (mutn.attributeName === 'class') {
                const wasntAnimated = !mutn.oldValue.split(' ').includes('__animated');
                const isAnimated = textNode.classList.contains('__animated');
                if (wasntAnimated && isAnimated) type(textNode);
            }
        });
    }
    function type(textNode) {
        const content = textNode.textContent;
        const dataset = textNode.dataset.textContent;
        if (textNode.dataset.isTyping !== 'true') {
            textNode.dataset.isTyping = 'true';
            textNode.textContent = '';

            const lettersArray = dataset.split('');
            for (let i = 0; i < lettersArray.length; i++) {
                const timeout = timeoutDflt * i;
                const letter = lettersArray[i];

                setTimeout(() => {
                    textNode.textContent += letter;
                    if (i === lettersArray.length - 1) {
                        textNode.dataset.isTyping = 'false';
                    }
                }, timeout);
            }
        }
    }
    function saveTextContent(textNode) {
        const dataset = textNode.dataset.textContent;
        if (!dataset) textNode.dataset.textContent = textNode.textContent;
        textNode.textContent = '';
    }
}

typeTextAnim();
scrollAnim();
window.addEventListener('scroll', scrollAnim);