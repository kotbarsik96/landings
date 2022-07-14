export function getProdById(array, id) {
    return array.find(item => item.id === id);
}

// obj = объект, ключи которого проверяются в reqFields
// reqFields = Array, где его элементы выглядят так: { key: "params", type: Object, children: [ { key: "color", type: Object } ] }
export function checkRequiredFields(obj, reqFields) {
    const objKeys = Object.keys(obj);
    for (let field of reqFields) {
        if (objKeys.includes(field.key)) {
            const property = obj[field.key];
            let isTypeMatch = false;

            // выяснить, совпадает ли field.type
            if (Array.isArray(field.type)) {
                field.type.forEach(fieldType => {
                    if (isFieldType(property, fieldType)) isTypeMatch = true;
                });
            } else if (isFieldType(property, field.type)) isTypeMatch = true;

            if (!isTypeMatch) return false;

            // если field.children нет, перейти к следующему field; если есть - пройтись по field.children
            if (!field.children) continue;
            else {
                if (checkRequiredFields(property, field.children)) continue;
                else return false;
            }
        }
        else return false;
    };
    return true;

    function isFieldType(property, fieldType) {
        if (typeof fieldType === "string") return typeof property === fieldType;
        else return property instanceof fieldType;
    }
}

export function capitalLetter(str) {
    let words = str.split(" ");
    words = words.map(word => {
        const letters = word.split("");
        letters[0] = letters[0].toUpperCase();;
        return letters.join("");
    });
    return words.join(" ");
}

export function createDocumentElement(tagName, className) {
    const el = document.createElement(tagName);
    el.className = className;
    return el;
}

// превращает obj[key1.key2.key3] в obj[key1][key2][key3]
export function parseKey(obj, key) {
    const subKeys = key.split(".");
    let parsed = obj[subKeys[0]];
    for (let i = 1; i < subKeys.length; i++) {
        const subK = subKeys[i];
        if (subK) parsed = parsed[subK];
    }

    return parsed;
}

export const isKey = (keyToTest) => /\[.+\]/g.test(keyToTest);
export const removeBrackets = (str) => str.replace(/\[/g, "").replace(/\]/g, "");

export function cutTxt(txt, symbolsLimit) {
    const cutForLetters = txt.split("");
    const dif = txt.length - symbolsLimit;
    cutForLetters.splice(symbolsLimit - 1, dif);
    const cutForWords = cutForLetters.join("").split(" ");
    cutForWords.splice(cutForWords.length - 1, 1);
    return cutForWords.join(" ") + "...";
}

export const lStorage = {
    keys: {
        cart: "streetster_cart",
    },
    getItem(key) {
        const storageKey = this.keys[key] || key;
        const item = localStorage.getItem(storageKey);
        return item ? JSON.parse(item) : null;
    },
    setItem(key, value) {
        const storageKey = this.keys[key];
        const stringifiedVal = JSON.stringify(value);
        localStorage.setItem(storageKey, stringifiedVal);
    }
}