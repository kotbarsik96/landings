function modifyProducts(loadedProducts) {
    loadedProducts.forEach(prod => {
        if (!prod.refProducts || prod.refProducts.length === 0) prod.refProducts = createRefs(prod.vendorCode);
        prod.sale = defineSale(prod);
    });

    return loadedProducts;

    function createRefs(vendorCode) {
        const refs = [];
        const otherCodes = loadedProducts.map(prod => prod.vendorCode);
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
    function defineSale(prod) {
        const oldPrice = prod["old-price"];
        const hasDiscount = typeof oldPrice === "number" && oldPrice > 0;
        const hasWrongSaleValue = prod.sale === "нет" || !prod.sale;

        if (hasDiscount && hasWrongSaleValue) return {
            type: "со скидкой",
            percent: 100 - Math.round(prod.price / (oldPrice / 100))
        };
        return prod.sale || { type: "нет" };
    }
}


import rootPath from "@/assets/root-path";

export default {
    state: {
        products: [],
        productCards: [],
        maxProductRating: 5
    },
    actions: {
        async loadProducts({ commit }) {
            commit("changeFetchingState", true);

            const query = await fetch(rootPath + "json/products.json");
            try {
                const products = await query.json();
                commit("modifyAndGetProducts", products);
            } catch (err) {
                commit("setNoProducts")
            }
            finally {
                commit("changeFetchingState", false);
            }
        }
    },
    mutations: {
        modifyAndGetProducts(state, loadedProducts) {
            loadedProducts = modifyProducts(loadedProducts);
            state.products = loadedProducts;
        },
        setNoProducts(state) {
            state.isProductsLoadError = true;
        },
        addProductCardComponent(state, component) {
            state.productCards.push(component);
        }
    },
    getters: {
        products: (state) => state.products,
        productCards: (state) => state.productCards,
        maxProductRating: (state) => state.maxProductRating,
        isProductsLoadError: (state) => state.isProductsLoadError
    },
}