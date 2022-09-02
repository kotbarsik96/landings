export default {
    state: {
        modals: []
    },
    mutations: {
        addModal(state, component) {
            // component = String ("ModalCart", "ModalDefault"), Object ({ name: "ModalText", params: { text: "..." } })
            state.modals.push(component);
        },
        removeModal(state) {
            const modals = state.modals;
            const lastIndex = state.modals.length - 1;
            modals.splice(lastIndex, 1);
            state.modals = modals;
        },
        removeAllModals(state) {
            state.modals = [];
        }
    },
    getters: {
        modals(state) {
            return state.modals || [];
        }
    }
}