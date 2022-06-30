import { lStorage } from "@/assets/js/scripts";

export default {
    state: {
        productsInCart: 0,
        productsInFavorites: 0
    },
    mutations: {
        localStorageChangeEventListener(state) {
            const methods = ["setItem", "removeItem"];
            const storageChangeEvent = new Event("storageChange");

            methods.forEach(method => {
                const nativeMethod = localStorage[method];
                const newMethod = function (...args) {
                    nativeMethod.call(localStorage, ...args);
                    document.dispatchEvent(storageChangeEvent);
                };
                localStorage[method] = newMethod;
            });

            refreshStorageState();
            document.addEventListener("storageChange", refreshStorageState);

            function refreshStorageState() {
                const keys = lStorage.keys;

                const inCart = lStorage.getStorage(keys.cart);
                const inFavorites = lStorage.getStorage(keys.favorites);

                if(Array.isArray(inCart)) state.productsInCart = inCart.length;
                if(Array.isArray(inFavorites)) state.productsInFavorites = inFavorites.length;
            }
        }
    },
    getters: {
        storageProductsAmount(state) {
            return {
                inCart: state.productsInCart,
                inFavorites: state.productsInFavorites
            }
        }
    }
}