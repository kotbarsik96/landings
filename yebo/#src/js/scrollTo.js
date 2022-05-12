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