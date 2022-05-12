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
});