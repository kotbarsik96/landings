// BURGER //
const burger = document.querySelector('.burger');
const body = document.querySelector('body');
body.classList.remove('__no-scroll');
burger.addEventListener('click', function (){
    const header = document.querySelector('.header');
    burger.classList.toggle('__active');
    header.classList.toggle('__active');
    body.classList.toggle('__no-scroll');
});