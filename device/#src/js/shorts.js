// отложенная загрузка слайдера свайпера
const swiperLoad = new Promise(resolve => {
    setTimeout(() => {
        const script = document.createElement("script");
        script.src = "../js/swiper-bundle.min.js";
        document.body.append(script);
        setTimeout(() => {
            resolve();
        }, 500);
    }, 1000);
});
swiperLoad.then(() => {
    // MAIN-SLIDER //=========================================================================
    const mainSlider = new Swiper('.main-slider', {
        pagination: {
            el: '.main-slider__pagination',
            type: 'bullets',
            clickable: true,
        },
        autoplay: {
            delay: 7500
        },
        speed: 0,
        allowTouchMove: false
    });

    // CONSUMER-SLIDER //=====================================================================
    const consumerSlider = new Swiper('.consumer-info__slider', {
        speed: 0,
        allowTouchMove: false
    });
    function initPagination() {
        const consumerBlocks = document.querySelectorAll('.consumer-info');
        consumerBlocks.forEach(block => {
            const pagButtons = block.querySelectorAll('.consumer-info__pagination-button');
            const slider = block.querySelector('.consumer-info__slider');
            const slides = Array.from(slider.querySelectorAll('.consumer-info__slide'));

            let sliderInstance = consumerSlider;
            if (consumerSlider.length > 0) {
                for (let i = 0; i < consumerSlider.length; i++) {
                    const inst = consumerSlider[i];
                    if (inst.el === slider) sliderInstance = inst;
                }
            }
            setActive(slides, pagButtons, sliderInstance);

            const array = [];
            for (let i = 0; i < pagButtons.length; i++) {
                const btn = pagButtons[i];
                const slideIndex = i;
                const obj = { btn: btn, slide: slides[i], slideIndex: slideIndex };
                array.push(obj);
            }

            array.forEach(info => {
                info.btn.addEventListener('click', () => {
                    if (info.btn && info.slide) {
                        sliderInstance.slideTo(info.slideIndex);
                        activeBtn(pagButtons, info.btn);
                    }
                });
            });
        });

        function activeBtn(pagButtons, btn) {
            pagButtons.forEach(btn => btn.classList.remove('__active'));
            btn.classList.add('__active');
        }
        function setActive(slides, pagButtons, sliderInstance) {
            const index = 0;
            const btn = pagButtons[index];
            const slide = slides[index];

            sliderInstance.slideTo(index);
            activeBtn(pagButtons, btn);
        }
    }
    initPagination();
});

// COORDS //==============================================================================
function getCoords(elem) {
    const coords = elem.getBoundingClientRect();

    return { top: coords.top, left: coords.left };
}

// TOGGLING //============================================================================
function toggleBody(btn, body, mediaValue = null) {
    if (!mediaValue) mediaValue = 767;
    const media = window.matchMedia(`(max-width: ${mediaValue}px)`);
    const bodyHeight = body.offsetHeight;
    onChange();
    media.addEventListener('change', onChange);

    function onChange() {
        if (media.matches) {
            close();
            btn.addEventListener('click', toggle);
        }
        else {
            btn.removeEventListener('click', toggle);
            open();
        }
    }

    function toggle() {
        btn.classList.contains('__active') ? close() : open();
    }
    function open() {
        btn.classList.add('__active');
        body.style.maxHeight = `${bodyHeight * 2}px`;
        body.style.removeProperty('padding');
    }
    function close() {
        btn.classList.remove('__active');
        body.style.cssText = `
        max-height: 0px;
        padding: 0px;
    `;
    }
}

// MAPS LOADING BY INTERSECTION OBSERVER //===============================================
function deferredMapsLoading() {
    const mapContainer = document.querySelector("#map");
    if (!mapContainer) return;

    const options = { threshold: 1.0 };
    const callback = (entries) => {
        const tg = entries[0];
        const top = tg.boundingClientRect.top;
        const isReadyToLoadMaps = (top <= document.documentElement.offsetHeight || window.offsetHeight)
            || (tg.isIntersecting);
        if (isReadyToLoadMaps && !isMapLoaded) {
            loadMaps();
            isMapLoaded = true;
            observer.unobserve(target);
        }
    };
    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector("#intersection-load-maps");
    let isMapLoaded = false;

    observer.observe(target);

    function loadMaps() {
        const iframe = document.createElement("iframe");
        console.log(iframe);
        iframe.src = "https://yandex.ru/map-widget/v1/?um=constructor%3Aac473187741f5d897b5dc10b78069cc6f6aea0f00ad658742fb27e942ee63ca2&amp;source=constructor";
        iframe.frameborder = "0";
        mapContainer.append(iframe);
    }
}
deferredMapsLoading();

// HEADER //==============================================================================
class Header {
    constructor() {
        this.header = document.querySelector('.header');

        this.toggleMenu();
    }
    toggleMenu() {
        const btn = this.header.querySelector('.burger');
        const menu = this.header.querySelector('.header__main');
        toggleBody(btn, menu, 767);
    }
}
const header = new Header();

// CATALOGUE HOVER //=====================================================================
function catalogueHoverInit() {
    const catItems = document.querySelectorAll('.catalogue-item');
    catItems.forEach(item => {
        const image = item.querySelector('.catalogue-item__image');
        const hoverElem = document.createElement('div');
        hoverElem.className = 'catalogue-item__hover';
        hoverElem.innerHTML = `
            <button class="catalogue-item__hover-button button">
                В корзину
            </button>
            <div class="catalogue-item__hover-option">
                Добавить к сравнению 
            </div>
        `;
        image.append(hoverElem);

        image.addEventListener('mouseover', () => image.querySelector('.catalogue-item__hover').classList.add('__active'));
        image.addEventListener('mouseleave', () => image.querySelector('.catalogue-item__hover').classList.remove('__active'));
    });
}
catalogueHoverInit();

// FILTER //==============================================================================
class Range {
    constructor() {
        // сбор всех ползунков
        const ranges = document.querySelectorAll('.range');
        if (ranges.length > 0) {
            ranges.forEach(range => {
                // инициализация каждого ползунка
                this.initRange(range);
            });
        }
    }
    initRange(range) {
        // переменные
        const rangeWrapper = range.querySelector('.range__wrapper');
        const rangeBar = range.querySelector('.range__bar');
        const rangeScale = range.querySelector('.range__scale');
        const rangeCircleMin = range.querySelector('.range__circle--min');
        const rangeCircleMax = range.querySelector('.range__circle--max');
        const rangeValueMin = range.querySelector('.range__min');
        const rangeValueMax = range.querySelector('.range__max');
        onResize = onResize.bind(this);

        // ставим в исходное положение ползунки
        let barWidth = rangeBar.offsetWidth - rangeCircleMax.offsetWidth;
        onResize();

        // обновляем весь range при изменении ширины экрана
        window.addEventListener('resize', onResize);

        // обработчик на нажатие на линию/ползунки
        onPointerDown = onPointerDown.bind(this);
        rangeWrapper.addEventListener('pointerdown', onPointerDown);

        function onResize() {
            barWidth = rangeBar.offsetWidth - rangeCircleMax.offsetWidth;

            rangeCircleMin.style.left = `${0}px`;
            rangeCircleMax.style.left = `${barWidth}px`;
            this.drawScale(rangeScale, rangeCircleMin, rangeCircleMax);
            this.setValues(range, barWidth);
            this.drawScale(rangeScale, rangeCircleMin, rangeCircleMax);
            this.setValues(range, barWidth);
        }
        function onPointerDown(event) {
            event.preventDefault();
            // обработчик на линию
            if (event.target != rangeCircleMin && event.target != rangeCircleMax) {
                let newCoord = event.clientX - getCoords(rangeWrapper).left;
                const nearestCircle = this.nearestCircle(newCoord, rangeCircleMin, rangeCircleMax);
                // если newCoord выходит за пределы длины линии - поставить его в конечное положение
                newCoord = this.checkIfOutsideBar(newCoord, barWidth, rangeCircleMin);
                // если выходов за пределы линии/столкновений нет - переместить ползунок
                nearestCircle.style.left = `${newCoord - rangeCircleMin.offsetWidth / 2}px`;
            }
            // обработчик на ползунки
            if (event.target == rangeCircleMin || event.target == rangeCircleMax) {
                onMove = onMove.bind(this);
                // убрать браузерный drag'n'drop
                event.target.ondragstart = function () { return false; };

                // перемещение ползунка
                document.addEventListener('pointermove', onMove);
                // отжатый курсор - убрать все обработчики
                document.addEventListener('pointerup', () => {
                    document.removeEventListener('pointermove', onMove);
                    rangeWrapper.onpointerup = null;
                });

                function onMove(docEvent) {
                    let coordX = docEvent.clientX - getCoords(rangeWrapper).left;
                    // проверка новой координаты на выход за границы линии
                    coordX = parseInt(this.checkIfOutsideBar(coordX, barWidth, rangeCircleMin)) - event.target.offsetWidth / 2;
                    // проверка новой координаты на столкновение с другим ползунком
                    if (event.target == rangeCircleMin && coordX >= parseInt(getComputedStyle(rangeCircleMax).left)) {
                        coordX = `${parseInt(getComputedStyle(rangeCircleMax).left)}px`;
                    }
                    if (event.target == rangeCircleMax && coordX <= parseInt(getComputedStyle(rangeCircleMin).left)) {
                        coordX = `${parseInt(getComputedStyle(rangeCircleMin).left)}px`;
                    }
                    // перемещение
                    moveAt(coordX);
                    // обновление шкалы и значений
                    this.drawScale(rangeScale, rangeCircleMin, rangeCircleMax);
                    this.setValues(range, barWidth);
                }
                function moveAt(coordX) {
                    event.target.style.left = `${coordX}px`;
                }
            }
            // обновить линию между ползунками
            this.drawScale(rangeScale, rangeCircleMin, rangeCircleMax);
            // обновить значения в "от" и "до"
            this.setValues(range, barWidth);
            rangeWrapper.onpointerup = null;
        }
    }
    checkIfOutsideBar(newCoord, barWidth, rangeCircleMin) {
        // аналогично "0", учитывает размер ползунка
        const minBorderValue = rangeCircleMin.offsetWidth / 2;

        if (newCoord > barWidth) return barWidth + minBorderValue;
        if (newCoord < rangeCircleMin.offsetWidth / 2) return minBorderValue;
        if (newCoord >= minBorderValue && newCoord <= barWidth) return newCoord;
    }
    nearestCircle(newCoord, rangeCircleMin, rangeCircleMax) {
        const minCoord = parseInt(getComputedStyle(rangeCircleMin).left);
        const maxCoord = parseInt(getComputedStyle(rangeCircleMax).left);
        if (Math.abs(newCoord - minCoord) < Math.abs(newCoord - maxCoord)) return rangeCircleMin;
        if (Math.abs(newCoord - minCoord) > Math.abs(newCoord - maxCoord)) return rangeCircleMax;
    }
    drawScale(rangeScale, rangeCircleMin, rangeCircleMax) {
        const width = parseInt(getComputedStyle(rangeCircleMax).left) - parseInt(getComputedStyle(rangeCircleMin).left);
        rangeScale.style.cssText = `
            position: absolute;
            top: 0;
            width: ${width}px;
            left: ${getComputedStyle(rangeCircleMin).left};
        `;
    }
    moveAt(rangeCircle, coordX) {
        rangeCircle.style.left = `${coordX - rangeCircle / 2}px`;
    }
    setValues(range, barWidth) {
        // найти соотношение значений к 1 пикселю left
        const borders = range.dataset.rangeBorders.split(', ');
        const borderMin = parseInt(borders[0]);
        const borderMax = parseInt(borders[1]);
        const ratio = (borderMax - borderMin) / barWidth;

        // посчитать итоговые значения, исходя из положений ползунков
        const minCoord = parseInt(getComputedStyle(range.querySelector('.range__circle--min')).left);
        const maxCoord = parseInt(getComputedStyle(range.querySelector('.range__circle--max')).left);
        const valueMin = Math.round(ratio * minCoord);
        const valueMax = Math.round(ratio * maxCoord);

        // подставить итоговые значения
        const spanMin = range.querySelector('.range__min').querySelector('span');
        const spanMax = range.querySelector('.range__max').querySelector('span');
        spanMin.innerHTML = valueMin;
        spanMax.innerHTML = valueMax;
    }
}
class Filter {
    constructor() {
        this.initRanges();
        this.filterToggle();
    }
    initRanges() {
        new Range();
    }
    filterToggle() {
        const filter = document.querySelector('.filter');
        if (filter) {
            const title = filter.querySelector('.filter__title');
            const body = filter.querySelector('.filter__body');
            let mediaValue = filter.dataset.hideFilterMedia;
            if (!parseInt(mediaValue)) mediaValue = 859;
            toggleBody(title, body, 859);
        }
    }
}
const filter = new Filter();