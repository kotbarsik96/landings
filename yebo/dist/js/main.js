window.onload = function (){

    let isMobile = {
        Android: function (){
            return navigator.userAgent.match(/Android/i); 
        },
        BlackBerry: function (){
            return navigator.userAgent.match(/BlackBerry/i);
        },
        IOS: function (){
            return navigator.userAgent.match(/iPhone|ipad|iPod/i);
        },
        Opera: function (){
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function (){
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function (){
            return (
                isMobile.Android() || 
                isMobile.BlackBerry() ||
                isMobile.IOS() || 
                isMobile.Opera() || 
                isMobile.Windows()
            );
        }
    }


    adaptiveHeader();

    adaptiveFooter();
    
    makeNote();

    window.addEventListener('scroll', function(){
        adaptiveHeader();
        adaptiveFooter();
        makeNote();
    });

    // проверка на то, используется ли мобильное устройство
    function makeNote(){
        if(isMobile.any() != null){
            document.body.classList.add('__mobile');
        }
        else{
            document.body.classList.remove('__mobile');
        }
    }
    // адаптировать шапку
    function adaptiveHeader(){
        // навигация
        const header = document.querySelector('.header');
        const headerHeight = header.offsetHeight;
        const scrollTop = window.pageYOffset;
        if(scrollTop >= headerHeight){
            // навигация
            document.querySelector('.nav').classList.add('__scrolled');
            // шапка
            header.classList.remove('__fixed');
        }
        else{
            // навигация
            document.querySelector('.nav').classList.remove('__scrolled');
            // шапка
            header.classList.add('__fixed');
        }
    }
    // адаптировать футер
    function adaptiveFooter(){
        const footer = document.querySelector('.footer');
        const mainHeight = document.querySelector('.main').offsetHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        const md = headerHeight + mainHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const mdNav = md - windowHeight;
        if(scrollTop >= mdNav){
            // навигация
            document.querySelector('.nav').classList.add('__hidden');
            // футер
            if(document.body.classList.contains('__mobile')){
                footer.classList.remove('__fixed');
            }
            else{
                footer.classList.add('__fixed');
            }
        }
        else{
            // навигация
            document.querySelector('.nav').classList.remove('__hidden');
            // футер
            footer.classList.remove('__fixed');
        }
    }
}
// собираем объекты, которым заданы правила для адаптирования
let adaptiveObjects = document.querySelectorAll('[data-adaptive]');

adaptive(adaptiveObjects);

function adaptive(adaptiveObjects){
    // применяем адаптив для каждого объекта отдельно
    for(let i = 0; i < adaptiveObjects.length; i++){
        // объявляем объект и собираем о нем инфу: граница медиа запроса,
        // старый и новый родительские контейнеры
        let obj = adaptiveObjects[i];
        let objInfo = obj.dataset.adaptive.split(', ');

        let objAdaptiveValue = objInfo[0];
        let objNewParent = document.querySelector('.' + objInfo[1]);
        let objOldParent = obj.parentNode;

        // активируем функцию при загрузке и при каждом изменении ширины viewport'a
        dynamicAdaptive(obj, objAdaptiveValue, objNewParent, objOldParent, i);
        window.addEventListener('resize', function (){
            dynamicAdaptive(obj, objAdaptiveValue, objNewParent, objOldParent, i);
        });


        function dynamicAdaptive(obj, objAdaptiveValue, objNewParent, objOldParent, i){
            let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            let objOldParentName = objOldParent.className.split(' ')[0];
                objOldParentName = objOldParentName + '__old' + '__' + i;
            // если нужен адаптив - перемещаем объекты в 
            // новый родительский элемент
            if(window.matchMedia('(max-width: ' + objAdaptiveValue + 'px)').matches){
                objOldParent.classList.add(objOldParentName);

                objNewParent.append(obj);
            }
            // если НЕ нужен адаптив
            else{
                // если адаптив уже был применен - возвращаем объекты обратно
                // в старый родительский элемент
                if(objOldParent.classList.contains(objOldParentName)){
                    objOldParent.append(obj);
                }
            }
        }
    }
}
// обозначаем все блоки с artboard-картинками
let artboardImages = document.querySelectorAll('.artboard__image');

//
for(let artboardImage of artboardImages){
    // создание ссылки
    let bicycleLink = document.createElement('a');
    let shopNowLink = document.createElement('a');
    bicycleLink.setAttribute('href', '#');
    shopNowLink.setAttribute('href', '#');

    // создание блока с велосипедом
    let bicycleBlock = document.createElement('div');
    bicycleBlock.classList.add('image__bicycle');
    let bicycleImage = document.createElement('img');
    bicycleImage.setAttribute('src', '../img/icons/bicycle.svg');
    bicycleBlock.append(bicycleImage);
    bicycleBlock.append(bicycleLink);
    
    // создание блока с надписью "shop now"
    let shopBlock = document.createElement('div');
    shopBlock.classList.add('image__shop-now');
    let shopText = document.createElement('span');
    shopText.append('Shop now');
    shopBlock.append(shopText);
    shopBlock.append(shopNowLink);

    // вставка блоков
    artboardImage.append(bicycleBlock);
    artboardImage.append(shopBlock);

    // обработчики на наведение-удаление мышки
    artboardImage.addEventListener('mouseover', function(){
        artboardImage.classList.add('_active');
    });
    artboardImage.addEventListener('mouseleave', function(){
        artboardImage.classList.remove('_active');
    });
}
let swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    keyboard: {
        enabled: true,
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 110,
        slideShadows: false,
    }
});

document.addEventListener('DOMContentLoaded', function(){

    let links = document.querySelectorAll('a[data-goto]');
    if(links.length > 0){
        for(let link of links){
            link.addEventListener('click', function(e){
                // получаем данные о элементе, до которого нужно проскроллить
                const gotoObj = document.querySelector(link.dataset.goto);
                let gotoVal = getCoords(gotoObj).top;
                gotoVal -= document.querySelector('.nav').offsetHeight;

                // выполняем скролл до элемента
                window.scrollTo({
                    top: gotoVal,
                    behavior: 'smooth'
                });

                // функция для получения координат элемента
                function getCoords(el){
                    let box = el.getBoundingClientRect();

                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset
                    }
                }

                e.preventDefault();
            });
        }
    }
    
});