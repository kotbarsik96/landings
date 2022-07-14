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
        products: {
            bikesArray: [],
            accessoriesArray: [],
        },
        bikeCategories: [],
        blogsArray: []
    }),
    actions: {
        async loadProducts({ commit }, key) {
            const request = await fetch(pathToFolder + key + ".json");
            const products = await request.json();
            const data = { key, products };
            commit("getProducts", data);
        },
        async loadCategories({ commit }){
            const request = await fetch(pathToFolder + "categories.json");
            const data = await request.json();
            commit("getBikeCategories", data);
        },
        async loadBlogs({ commit }) {
            const request = await fetch(pathToFolder + "blogs.json");
            const blogs = await request.json();
            commit("getBlogs", blogs);
        },
    },
    mutations: {
        getProducts(state, data) {
            const key = data.key + "Array"; // e.g. "bikes" + "Array"
            let products = data.products;
            if (data.key === "bikes") {
                products = modifyBikesArray(data.products);
            }
            state.products[key] = products;
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
        currency() {
            return "₴";
        },
        bikes(state) {
            return state.products.bikesArray;
        },
        accessories(state) {
            return state.products.accessoriesArray;
        },
        categories(state) {
            return state.bikeCategories;
        },
        blogs(state) {
            return state.blogsArray;
        }
    }
}