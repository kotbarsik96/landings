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