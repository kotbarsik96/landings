function scrollAnim() {
    let animObjects = document.querySelectorAll('[class*="anim__object"]');
    if (animObjects.length > 0) {
        for (let obj of animObjects) {
            let animCoords = getCoords(obj);
            let animHeight = obj.offsetHeight;
            let scrollHeight = window.pageYOffset;
            let animValue = 5;
            let animPoint = window.innerHeight - window.innerHeight / animValue;

            if ((window.pageYOffset > animCoords.top - animPoint) && (window.pageYOffset < animHeight + animCoords.top)) {
                applyAnim();
            }
            else {
                removeAnim();
            }


            function applyAnim() {
                obj.classList.add('__animated');
            }
            function removeAnim() {
                if (obj.classList.contains('__unlock-anim')) {
                    obj.classList.remove('__animated');
                }
            }
        }
    }
}

function typeTextAnim() {
    const timeoutDflt = 150;

    const texts = document.querySelectorAll('[class*="anim__object-text"]');
    texts.forEach(text => initTextTyping(text));

    function initTextTyping(textNode) {
        saveTextContent(textNode);
        const hasAnimatedClass = textNode.classList.contains('__animated');
        // поставить обработчик DOM-мутаций
        if (!hasAnimatedClass) {
            const observer = new MutationObserver(onMutation);
            observer.observe(textNode, { attributes: true, attributeOldValue: true });
        }
        // просто анимировать текст
        if (hasAnimatedClass) type(textNode);
    }
    function onMutation(mtList) {
        mtList.forEach(mutn => {
            const textNode = mutn.target;
            if (mutn.attributeName === 'class') {
                const wasntAnimated = !mutn.oldValue.split(' ').includes('__animated');
                const isAnimated = textNode.classList.contains('__animated');
                if (wasntAnimated && isAnimated) type(textNode);
            }
        });
    }
    function type(textNode) {
        const content = textNode.textContent;
        const dataset = textNode.dataset.textContent;
        if (textNode.dataset.isTyping !== 'true') {
            textNode.dataset.isTyping = 'true';
            textNode.textContent = '';

            const lettersArray = dataset.split('');
            for (let i = 0; i < lettersArray.length; i++) {
                const timeout = timeoutDflt * i;
                const letter = lettersArray[i];

                setTimeout(() => {
                    textNode.textContent += letter;
                    if (i === lettersArray.length - 1) {
                        textNode.dataset.isTyping = 'false';
                    }
                }, timeout);
            }
        }
    }
    function saveTextContent(textNode) {
        const dataset = textNode.dataset.textContent;
        if (!dataset) textNode.dataset.textContent = textNode.textContent;
        textNode.textContent = '';
    }
}

typeTextAnim();
scrollAnim();
window.addEventListener('scroll', scrollAnim);