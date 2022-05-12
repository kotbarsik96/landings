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