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