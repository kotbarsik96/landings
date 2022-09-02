export function closeByDocumentClick(event, exceptionClass, state) {
    const targ = event.target;
    const isNoItem = !targ.classList.contains(exceptionClass);
    const isNoItemChild = !targ.closest(`.${exceptionClass}`);

    if (isNoItem && isNoItemChild) {
        this[state] = false;
    }
}

// перед использованием этого метода, нужно сделать проверку $route.name, чтобы не происходил лишний redirect 
export function getRouteParamOrNotFound(paramName, arr, paramNameKey) {
    // paramName == название параметра route (пр.: categoryId);
    // arr == массив, в котором нужно искать объект, один из ключей которого == paramName (пр.: this.categories); 
    // paramNameKey == строка-ключ, который хранит в себе paramName ("id")
    if (Array.isArray(arr)) {
        const param = arr.find(el => el[paramNameKey] === paramName);
        if (param) return param;
        if (arr.length < 1) return;
        if (arr.length > 1 && !param) return setRedirect.call(this, { name: "404" });
    }
}

// делает из this.is.some.subkey this[is][some][subkey] или возвращает null;
export function getObjectValue(key, parentObj) {
    const subkeys = key.split(".");
    let object = parentObj[subkeys[0]] || null;
    if (object) {
        for (let i = 1; i < subkeys.length; i++) {
            const subkey = subkeys[i];
            object = object[subkey];
            if (!object) break;
        }
    }
    return object;
}

// находит совпадения в двух массивах или значениях объектов, возвращает массив совпадений, а если таковых нет - возвращает false
export function isCoincidingObjectsValues(obj_1, obj_2) {
    const arr_1 = Object.values(obj_1);
    const arr_2 = Object.values(obj_2);

    const coincidedValues = arr_1.filter(val => {
        return arr_2.includes(val);
    });

    return coincidedValues.length > 0 ? coincidedValues : false;
}

export function setRedirect(to) {
    const setRoute = () => {
        this.$router.push(to);
        document.removeEventListener("pageAnimationEnd", setRoute);
    }
    document.addEventListener("pageAnimationEnd", setRoute);
}

export function getCoords(el) {
    const data = el.getBoundingClientRect();

    return { top: data.top, left: data.left }
}

export function kebabToCamelCase(str) {
    return str.split("")
        .map((l, i, arr) => {
            if (l === "-") {
                const nextEl = arr[i + 1];
                if (nextEl) arr[i + 1] = nextEl.toUpperCase();
                return "";
            }
            return l;
        })
        .join("");
}

export function calcDiscount(oldPrice, currentPrice) {
    const difference = oldPrice - currentPrice;

    if (difference <= 0) return null;
    return Math.round(difference / (oldPrice / 100));
}

export function cutString(str, maxlength) {
    if (!str) return null;
    if (str.length <= maxlength) return str;

    let words = str.split(" ");
    do {
        words.splice(words.length - 1, 1);
    } while (words.join(" ").length > maxlength);
    return words.join(" ") + "...";
}

export const lStorage = {
    keys: {
        cart: "freshnesecom_cart",
        wishlist: "freshnesecom_wishlist"
    },
    defineKey(key) {
        if (this.keys[key]) key = this.keys[key];
        return key;
    },
    setItem(key, item) {
        key = this.defineKey(key);
        item = JSON.stringify(item);
        localStorage.setItem(key, item);
    },
    getItem(key) {
        key = this.defineKey(key);
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
        return null;
    },
    pushToArray(key, arrayElem) {
        key = this.defineKey(key);
        let item = this.getItem(key);
        if (!item) item = [];
        if (Array.isArray(item)) item.push(arrayElem);
        this.setItem(key, item);
    },
};

// чтобы работало, нужно добавить в data() запись mediaQueries: { [mdValue]: false }; в methods: mediaQueriesHandlers; в mounted(): this.mediaQueriesHandlers
export function mediaQueriesHandlers() {
    for (let md in this.mediaQueries) {
        const query = window.matchMedia(`(max-width: ${md}px)`);
        this.mediaQueries[md] = query.matches;
        query.addEventListener("change", () => {
            this.mediaQueries[md] = query.matches;
        });
    }
}

export function injectShared(componentName, sharedData) {
    const componentData = { name: componentName };
    for (let key in sharedData) {
        componentData[key] = sharedData[key];
    }
    return componentData;
}

// если нет mediaValue, то, чтобы работало, нужно, чтобы у элемента-родителя был data-hideable="true"
// елси body = null, show() и hide() будут применяться к parent;
export function initSpoilerElem(btn, body = null, mediaValue = null) {
    const parent = btn.parentNode;
    if (!body) body = parent;
    const height = body.offsetHeight;
    const shownClass = "__shown-elem";

    // обработчик ставится при mediaQuery.matches и убирается при обратной ситуации
    if (mediaValue) {
        const mediaQuery = window.matchMedia(`(max-width: ${mediaValue}px)`);
        toggleHandler("add");
        mediaQuery.addEventListener("change",);
        mediaQuery.addEventListener("change", function () {
            mediaQuery.matches ? toggleHandler("add") : toggleHandler("remove");
        });
    }
    // обработчик ставится при data-hideable и убирается при data-hideable="false"
    else {
        callback();
        const observer = new MutationObserver(callback);
        observer.observe(parent, { attributes: true });

        function callback() {
            const isHideable = parent.dataset.hideable == "true";
            isHideable ? toggleHandler("add") : toggleHandler("remove");
        }
    }

    function toggle() {
        body.classList.contains(shownClass) ? hide() : show();
    }
    function show(isHandlerDisabled = false) {
        body.style.removeProperty("padding");
        body.style.maxHeight = isHandlerDisabled ? 'none' : `${height + 100}px`;
        body.style.marginTop = "-5px";
        body.classList.add(shownClass);
    }
    function hide() {
        body.style.padding = "0";
        body.style.maxHeight = "0px";
        body.classList.remove(shownClass);
    }
    function toggleHandler(action) {
        // action === "remove" || "add"
        if (action === "remove") show(true);
        if (action === "add") toggle();
        btn[`${action}EventListener`]("click", toggle);
    }
}

export function checkNumberValue(val, params) {
    // params = { min: 0, max: 1000 }
    // проверка на ввод только чисел
    if (val) {
        let valStr = val.toString();
        val = parseInt(valStr.replace(/\D/g, ""));
    }
    if (!val && val != 0) return val = params.min;

    // проверка на соответствие params.min и params.max
    if (params.min && val < params.min) val = params.min;
    if (params.max && val > params.max) val = params.max;
    return val;
}