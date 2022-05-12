function initBrowsing() {
    const browsings = Array.from(document.querySelectorAll('.browsing'));
    if (browsings.length > 0) {
        browsings.forEach(browsing => {
            const brWrapper = browsing.querySelector('.browsing__wrapper');
            const brButtons = Array.from(browsing.querySelectorAll('[data-browsing-button]'));

            const pairsArray = [];
            brButtons.forEach(btn => {
                const name = btn.dataset.browsingButton;
                const elem = brWrapper.querySelector(`[data-browsing-elem="${name}"]`);
                const obj = { name: name, elem: elem };
                pairsArray.push(obj);

                btn.addEventListener('click', moveWrapper);
            });
            moveWrapper();

            function moveWrapper(event = null) {
                if (event) {
                    const btn = this;
                    const elem = brWrapper.querySelector(`[data-browsing-elem="${btn.dataset.browsingButton}"]`);
                    pairsArray.forEach(pair => {
                        if (pair.elem === elem) moveByClick(pair, btn);
                    });
                }
                else moveDefault();
            }
            function moveByClick(pair, btn) {
                setActive(btn, pair.elem);

                const pairIndex = pairsArray.indexOf(pair);
                brWrapper.style.cssText = `
                    transform: translate(-${pairIndex * 100}%, 0);
                    max-height: ${pair.elem.offsetHeight}px;
                `;
            }
            function moveDefault() {
                const pair = pairsArray[0];

                const btn = browsing.querySelector(`[data-browsing-button="${pair.name}"]`);
                setActive(btn, pair.elem);
                brWrapper.style.cssText = `
                    transform: translate(0, 0);
                    max-height: ${pair.elem.offsetHeight}px;
                `;
            }
            function setActive(btn, elem) {
                brButtons.forEach(b => b.classList.remove('__active'));
                pairsArray.forEach(pair => pair.elem.classList.remove('__active'));
                btn.classList.add('__active');
                elem.classList.add('__active');
            }
        });
    }
}