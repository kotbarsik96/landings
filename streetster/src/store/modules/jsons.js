import rootPath from "@/root-path.js";
import { cutTxt } from "@/assets/js/scripts.js";

const pathToFolder = rootPath + "json/";

function modifyBikesArray(array) {
    return array.map(bike => {
        if (!bike.otherModels) bike.otherModels = addOtherModels(bike);

        return bike;
    });

    function addOtherModels(bike) {
        const currentBikeIndex = array.indexOf(bike);
        const otherBikesAmount = 3;
        const otherBikes = [];

        for (let i = 0; i < otherBikesAmount; i++) {
            const index = i + currentBikeIndex;
            const otherBike = array[index] || array[Math.abs(array.length - index)];
            if (otherBike) otherBikes.push(otherBike.id);
        }

        return otherBikes;
    }
}

export default {
    state: () => ({
        isFetching: false,

        products: {
            bikesArray: [],
            accessoriesArray: [],
        },
        bikeCategories: [],
        blogsArray: []
    }),
    actions: {
        async loadProducts({ commit }) {
            // названия json'ов, содержащих в себе товары
            const productTypes = ["bikes", "accessories"];
            for (let prodType of productTypes) doLoad(prodType);

            async function doLoad(prodType) {
                commit("changeFetchingState", true);
                const request = await fetch(pathToFolder + prodType + ".json");

                try {
                    const products = await request.json();
                    const data = { prodType, products };
                    commit("getProducts", data);
                } catch (err) {
                    commit("getProducts", { prodType, products: [] });
                } finally {
                    commit("changeFetchingState", false);
                }
            }
        },
        async loadCategories({ commit }) {
            commit("changeFetchingState", true);

            const request = await fetch(pathToFolder + "categories.json");
            try {
                const data = await request.json();
                commit("getBikeCategories", data);
            } catch (err) {
                commit("getBikeCategories", []);
            } finally {
                commit("changeFetchingState", false);
            }
        },
        async loadBlogs({ commit }) {
            commit("changeFetchingState", true);

            const request = await fetch(pathToFolder + "blogs.json");
            try {
                const blogs = await request.json();
                commit("getBlogs", blogs);
            } catch (err) {
                commit("getBlogs", []);
            } finally {
                commit("changeFetchingState", false);
            }
        },
    },
    mutations: {
        changeFetchingState(state, isFetchingState) {
            const timeout = isFetchingState ? 0 : 1000;
            setTimeout(() => {
                state.isFetching = isFetchingState;
            }, timeout);
        },

        getProducts(state, data) {
            const prodType = data.prodType + "Array"; // e.g. "bikes" + "Array"
            let products = data.products;
            if (data.prodType === "bikes") {
                products = modifyBikesArray(data.products);
            }
            state.products[prodType] = products;
        },
        getBikeCategories(state, categories) {
            state.bikeCategories = categories;
        },
        getBlogs(state, blogs) {
            blogs.forEach(bl => {
                bl["preview-text-min"] = createPreviewTextMin(bl);
            });
            state.blogsArray = blogs;

            function createPreviewTextMin(blogData) {
                let txt = blogData["preview-text"];
                const limit = 120;

                if (txt) {
                    if (txt.length <= limit) return txt;
                    return cutTxt(txt, limit);
                }
            }
        }
    },
    getters: {
        isFetching(state) {
            return state.isFetching;
        },

        currency() {
            return "₴";
        },
        bikes(state) {
            return state.products.bikesArray || [];
        },
        accessories(state) {
            return state.products.accessoriesArray || [];
        },
        categories(state) {
            return state.bikeCategories || [];
        },
        blogs(state) {
            return state.blogsArray || [];
        }
    }
}