// GENERAL //===========================================================================================
function getCoords(elem) {
    const coords = elem.getBoundingClientRect();
    return { top: coords.top + window.pageYOffset }
}

// HEADER, FOOTER //====================================================================================
class Header {
    constructor() {
        this.header = document.querySelector('.header');

        this.toggleMenu();
        this.setActiveNavItem();
    }
    toggleMenu() {
        const burger = this.header.querySelector('.button.burger');
        const menu = this.header.querySelector('.header-nav');
        burger.addEventListener('click', onClick);

        function onClick() {
            burger.classList.toggle('__active');
            burger.classList.contains('__active') ? menu.classList.add('__active') : menu.classList.remove('__active');
        }
    }
    setActiveNavItem() {
        const navItems = Array.from(this.header.querySelectorAll('.header-nav__item'));
        onScroll();
        window.addEventListener('scroll', onScroll);

        function onScroll() {
            const screenPartSize = document.documentElement.clientHeight / 3;

            navItems.forEach(nav => {
                const anchor = nav.querySelector('a[href*="#"]');
                const href = anchor.getAttribute('href');
                const elem = document.querySelector(href);
                if (elem) {
                    const elemPos = getCoords(elem).top;
                    const elemHeight = elem.offsetHeight;
                    if (window.pageYOffset + screenPartSize >= elemPos && window.pageYOffset <= elemPos + elemHeight) setActiveItem(nav);
                }
            });
        }
        function setActiveItem(nav) {
            navItems.forEach(item => item.classList.remove('__active'));
            nav.classList.add('__active');
        }
    }
}
const header = new Header();

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

// VIDEO //=============================================================================================
class Video {
    constructor(obj) {
        this.classes = obj;
        this.videoList = Array.from(document.querySelectorAll('.video'));

        this.videoList.forEach(videoBlock => {
            this.createControls(videoBlock);
        });
    }
    createControls(videoBlock) {
        const playBtn = document.createElement('div');
        const pauseBtn = document.createElement('div');
        playBtn.className = "video__button video__play";
        pauseBtn.className = "video__button video__pause";
        videoBlock.append(playBtn);

        const obj = {
            playBtn: playBtn,
            pauseBtn: pauseBtn,
            videoBlock: videoBlock
        };
        this.initControls(obj);
    }
    initControls(obj) {
        const toggle = this.toggle;
        obj.videoBlock.addEventListener('click', () => toggle(obj));
    }
    toggle(obj) {
        const video = obj.videoBlock.querySelector('video');

        if (!obj.videoBlock.querySelector('.video__pause')) play();
        else if (!obj.videoBlock.querySelector('.video__play')) pause();

        function play() {
            video.play();
            obj.playBtn.remove();
            obj.videoBlock.append(obj.pauseBtn);
            setTimeout(() => obj.pauseBtn.style.visibility = 'hidden', 1500);
        }
        function pause() {
            obj.pauseBtn.style.visibility = 'visible';
            video.pause();
            obj.pauseBtn.remove();
            obj.videoBlock.append(obj.playBtn);
        }
    }
}
const videoMethods = new Video({
    playBtnClass: '.video__play',
    pauseBtnClass: '.video__pause'
});

// ONSCROLL ANIM //=====================================================================================
function scrollAnim() {
    const animElemsList = Array.from(document.querySelectorAll('.anim'));
    if (animElemsList.length > 0) {
        const animValue = 4;
        const animsArray = [];

        getAnimsInfo();
        setScrollHandler();

        function getAnimsInfo() {
            animElemsList.forEach(animElem => {
                let elemValue = animElem.dataset.animValue;
                if (!elemValue) elemValue = animValue;
                const coords = getCoords(animElem);

                const obj = {
                    animElem: animElem,
                    animHeight: animElem.offsetHeight,
                    animValue: elemValue
                }
                animsArray.push(obj);
            });
        }
        function setScrollHandler() {
            anim();
            window.addEventListener('scroll', anim);

            function anim() {
                animsArray.forEach(animObj => {
                    const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / animObj.animValue;
                    const animCoords = getCoords(animObj.animElem);

                    if (window.pageYOffset >= animCoords.top - animPoint && window.pageYOffset < animCoords.top + animObj.animHeight) {
                        setAnim(animObj.animElem);
                    }
                    else removeAnim(animObj.animElem);
                });
            }
        }
        function setAnim(animElem) {
            animElem.classList.add('animated');
        }
        function removeAnim(animElem) {
            if (animElem.classList.contains('reanim')) {
                animElem.classList.remove('animated');
            }
        }
    }
}

scrollAnim();

// SMOOTH SCROLL //=====================================================================================
function smoothScroll() {
    const anchors = Array.from(document.querySelectorAll('a[href*="#"]'));
    anchors.forEach(a => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            const elem = document.querySelector(id);
            a.addEventListener('click', function (event) {
                event.preventDefault();
                scroll(elem);
            });
        }
    });

    function scroll(elem) {

        elem.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
        });
    }
}
smoothScroll();