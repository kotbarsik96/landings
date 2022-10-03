import { lStorage } from "@/assets/js/scripts";

export default {
    state: {
        productsInCart: 0,
        productsInFavorites: 0
    },
    mutations: {
        localStorageChangeEventListener(state) {
            refreshStorageState();
            document.addEventListener("storageChange", refreshStorageState);

            function refreshStorageState() {
                setTimeout(() => {
                    const keys = lStorage.keys;

                    const inCart = lStorage.getStorage(keys.cart);
                    const inFavorites = lStorage.getStorage(keys.favorites);

                    if (Array.isArray(inCart)) state.productsInCart = inCart.length;
                    if (Array.isArray(inFavorites)) state.productsInFavorites = inFavorites.length;
                }, 100);
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