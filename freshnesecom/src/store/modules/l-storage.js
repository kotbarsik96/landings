import { lStorage } from "@/assets/js/scripts.js";

export default {
    state: {
        cart: [],
        wishlist: []
    },
    actions: {
        getLocalStorageToState({ commit, state }) {
            const keys = Object.keys(state);
            const update = () => keys.forEach(key => commit("syncWithState", key));

            update();
            document.addEventListener("lStorageChange", update);
            window.addEventListener("storage", update);
        }
    },
    mutations: {
        syncWithState(state, key) {
            const item = lStorage.getItem(key);
            state[key] = item;
        }
    },
    getters: {
        cart(state) {
            return state.cart || [];
        },
        wishlist(state) {
            return state.wishlist || [];
        },
        cartTotalPrice(state, getters, rootState) {
            let total = 0;
            getters.cart.forEach(item => {
                const prod = rootState.jsons.products.find(el => el.id == item.productId);
                if(prod) total += prod.price * item.amount;
            });
            return total;
        }
    }
}