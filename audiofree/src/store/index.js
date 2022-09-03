import { createStore } from "vuex";
import products from "@/store/modules/products";
import lStorageStore from "@/store/modules/l-storage";
import notifications from "@/store/modules/notifications";

export default createStore({
    state: {
        isFetching: false
    },
    mutations: {
        changeFetchingState(state, isFetchingState) {
            const timeout = isFetchingState ? 0 : 1000;
            setTimeout(() => { state.isFetching = isFetchingState }, timeout);
        }
    },
    getters: {
        isFetching(state) {
            return state.isFetching;
        }
    },
    modules: {
        products,
        lStorageStore,
        notifications
    }
})
