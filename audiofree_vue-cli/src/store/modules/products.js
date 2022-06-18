function modifyProducts(loadedProducts) {
    const modifiedProducts = {};
    Object.assign(modifiedProducts, loadedProducts);

    for (let vendorCode in modifiedProducts) {
        const prod = modifiedProducts[vendorCode];
        if (!prod.refProducts || prod.refProducts.length === 0) prod.refProducts = createRefs(vendorCode);
    }

    return modifiedProducts;

    function createRefs(vendorCode) {
        const refs = [];
        const otherCodes = Object.keys(modifiedProducts);
        const currentIndex = otherCodes.indexOf(vendorCode);
        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                const ref = otherCodes[currentIndex - i];
                addCurrentOrOther(ref, i);
            }
            else {
                const ref = otherCodes[currentIndex + i];
                addCurrentOrOther(ref, i);
            }
        }
        return refs;

        function addCurrentOrOther(ref, i) {
            if (ref) refs.push(ref);
            else {
                const otherRef = otherCodes[0 + i];
                otherRef ? refs.push(otherRef) : false;
            }
        }
    }
}

export default {
    state: {
        products: {},
        productCards: [],
        maxProductRating: 5
    },
    actions: {
        async loadProducts({ commit }) {
            const query = await fetch("/sites/audiofree_vue-cli/dist/json/products.json");
            const products = await query.json();
            commit("modifyAndGetProducts", products);
        }
    },
    mutations: {
        modifyAndGetProducts(state, loadedProducts) {
            loadedProducts = modifyProducts(loadedProducts);
            state.products = loadedProducts;
        },
        addProductCardComponent(state, component){
            state.productCards.push(component);
        }
    },
    getters: {
        products: (state) => state.products,
        productCards: (state) => state.productCards,
        maxProductRating: (state) => state.maxProductRating
    },
}