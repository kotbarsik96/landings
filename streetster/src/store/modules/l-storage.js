import { lStorage, checkRequiredFields } from "@/assets/js/scripts.js";

export default {
    state() {
        return {
            cartArray: []
        }
    },
    actions: {
        addStorageEventEmitters() {
            return new Promise(resolve => {
                // при вызове этих методов будут сгенерированы события
                const methods = ["setItem", "removeItem", "clear"];
                for (let method of methods) {
                    const srcMethod = localStorage[method];
                    localStorage[method] = function () {
                        srcMethod.apply(this, arguments);
                        const event = new Event("changeLocalStorage");
                        document.dispatchEvent(event);
                    }
                }
                resolve();
            });
        },
        addStorageArraysHandlers({ state, commit }) {
            const storageArraysKeys = Object.keys(state).map(key => key.replace("Array", ""));

            // записать массив из localStorage в state (для этого нужно, чтобы у ключа массива в state была подстрока "Array", напр. cartArray)
            getStateArrays();
            document.addEventListener("changeLocalStorage", getStateArrays);

            function getStateArrays() {
                storageArraysKeys.forEach(key => {
                    const storageArr = lStorage.getItem(key);
                    if (Array.isArray(storageArr)) {
                        commit("getStateArray", { key, array: storageArr });
                    }
                });
            }
        }
    },
    mutations: {
        getStateArray(state, arrayData) {
            // требуемые поля, содержащиеся в объектах массива arrayData.array
            const reqFields = {
                cart: [
                    { key: "accessories", type: [Array] },
                    { key: "bikeId", type: "string" },
                    { key: "orderId", type: "number" },
                    { key: "params", type: Object, children: [{ key: "color", type: Object }] },
                    { key: "prices", type: Object, children: [{ key: "bike", type: "number" }] },
                    { key: "title", type: "string" },
                ]
            };

            // если arrayData.key содержится в reqFields, провести проверку и фильтрацию массива
            if (Object.keys(reqFields).includes(arrayData.key)) {
                arrayData.array = arrayData.array.filter(obj => checkRequiredFields(obj, reqFields[arrayData.key]));
            }
            const stateArrKey = arrayData.key + "Array";
            state[stateArrKey] = arrayData.array;
            // если массивы в state и localStorage не совпадают, отправить отфильтрованный массив в localStorage
            if(state[stateArrKey].length !== lStorage.getItem(arrayData.key).length) lStorage.setItem(arrayData.key, arrayData.array)
        }
    },
    getters: {
        cart(state) {
            return state.cartArray || [];
        }
    },
}