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

checkWebpSupport();;


document.addEventListener('DOMContentLoaded', function (){

    function getCoords(elem){
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    }
}

function scrollAnim(){
    let animObjects = document.querySelectorAll('.anim__object');
    if(animObjects.length > 0){
        for(let obj of animObjects){
            let animCoords = getCoords(obj);
            let animHeight = obj.offsetHeight;
            let scrollHeight = window.pageYOffset;
            let animValue = 4;
            let animPoint = window.innerHeight - window.innerHeight / animValue;

            if((window.pageYOffset > animCoords.top - animPoint) && (window.pageYOffset < animHeight + animCoords.top)){
                applyAnim();
            }
            else{
                removeAnim();
            }
            

            function applyAnim(){
                obj.classList.add('__animated');
            }
            function removeAnim(){
                if(!obj.classList.contains('__lock-anim')){
                    obj.classList.remove('__animated');
                }
            }
        }
    }
}

scrollAnim();

window.addEventListener('scroll', function (){
    scrollAnim();
});;

    // burger
    function openMenuBurger(){
        // burger click
        const burger = document.querySelector('.burger');
        const headerMenu = document.querySelector('.header__menu');
        burger.addEventListener('click', function (){
            headerMenu.classList.toggle('__active');
        });
        // document click
        document.addEventListener('click', function (e){
            const menu = document.querySelector('.menu');
            const menuList = menu.querySelector('.menu__list');
            const menuItem = menu.querySelector('.menu__item');
            if(headerMenu.classList.contains('__active')){
                if(e.target != burger && e.target != menu && e.target != menuList && e.target != menuItem){
                    headerMenu.classList.remove('__active');
                }
            }
        });
    }


    // fixed header when scroll
    function fixHeader(){
        const header = document.querySelector('.header');
        const headerHeight = header.offsetHeight;
        const windowScroll = window.pageYOffset;
        if(windowScroll > headerHeight){
            header.classList.add('__fixed');
        }
        else{
            header.classList.remove('__fixed');
        }
    }


    // menu titles toggle
    function menuTitleToggle(){
        // click on title
        const titles = document.querySelectorAll('.menu-title');
        for(let title of titles){
            // listener to every title
            title.addEventListener('click', function (){
                // add to currently clicked title
                title.classList.toggle('__active');
                // close all other titles
                for(let other of titles){
                    if(other != title){
                        other.classList.remove('__active');
                    }
                }
            }); 
        }
        // click on document
        document.addEventListener('click', function (e){
            const check = e.target.classList.contains('menu-title') || e.target.classList.contains('menu-list');
            if(!check){
                for(let title of titles){
                    title.classList.remove('__active');
                }
            }
        });
    }

    // footer padding calc
    function footerPadding(){
        const extremeBlock = document.querySelector('.offers__extreme');
        const footer = document.querySelector('.footer');
        const offersContainer = document.querySelector('.offers__container');

        const height = extremeBlock.offsetHeight;
        // min-width: 1360px
        if(window.matchMedia('(min-width: 1439px)').matches){
            extremeBlock.style.bottom = `-${height * 0.7}px`;
            footer.style.paddingTop = `${height * 0.9}px`;
            offersContainer.style.paddingBottom = `${height}px`;
        }
        // max-width: 1359px
        else{
            extremeBlock.style.bottom = `-${height * 0.48}px`;
            footer.style.paddingTop = `${height * 0.61}px`;
            offersContainer.style.paddingBottom = `${height}px`;
        }
    }

    



    openMenuBurger();
    fixHeader();
    menuTitleToggle();
    footerPadding();


    window.addEventListener('scroll', function (){
        fixHeader();
    });
    window.addEventListener('resize', function (){
        footerPadding();
    })
});