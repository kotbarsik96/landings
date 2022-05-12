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