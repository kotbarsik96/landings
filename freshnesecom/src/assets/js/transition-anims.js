import { gsap } from "gsap";

// добавление: импортировать интересующий набор и оператором spread прописать в methods

// к компоненту Transition(Group) копировать следующее:
// @before-enter="onBeforeEnter"
// @enter="onEnter"
// @leave="onLeave"

export const pageListItems = {
    // требования: data: this.duration 
    // methods: this.changeProdCardComponent (вызывается в onLeave в onComplete, нужен для корректного отображения компонентов в связке с анимацией)

    onBeforeEnter(el) {
        gsap.set(el, {
            opacity: 0,
            x: -300,
            height: 0,
            padding: 0,
            margin: 0,
        });
    },
    onEnter(el, done) {
        setTimeout(() => {
            el.style.removeProperty("height");
            el.style.removeProperty("padding");
            el.style.removeProperty("margin");
        }, this.duration * 1000);

        gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: this.duration,
            delay: this.duration * 2,
            onComplete: done,
        });
    },
    onLeave(el, done) {
        gsap.to(el, {
            opacity: 0,
            x: 300,
            duration: this.duration,
            onComplete: () => {
                this.changeCardComponent();
                done();
            },
        });
    },
}