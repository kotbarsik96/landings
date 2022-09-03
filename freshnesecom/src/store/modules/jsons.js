import { kebabToCamelCase } from "@/assets/js/scripts.js";
import rootPath from "@/root-path.js";
const folderPath = `${rootPath}json`;

export default {
    state: {
        _isLoadingState: false,
        _isLoadingError: false,
    },
    actions: {
        // !filename === kebab-case!
        async loadJsonFile({ commit, dispatch }, filename, doChangeState = true) {
            // обозначить начало состояния загрузки
            if (doChangeState) commit("changeLoadingState", true);

            // если filename найдет совпадение с ключом этого объекта, будут подгружены файлы из соответствующего этому ключу массива
            const dependencies = {
                products: ["categories"],
                blogs: ["blogs-categories", "users"]
            };
            const request = await fetch(`${folderPath}/${filename}.json`);
            try {
                const data = await request.json();
                const arrayName = kebabToCamelCase(filename);
                commit("setJsonArray", { data, arrayName });

                // подгрузка зависимых данных от dependencies
                if (Object.keys(dependencies).includes(filename)) {
                    const depFiles = dependencies[filename];
                    depFiles.forEach(depFilename => {
                        dispatch("loadJsonFile", depFilename, false);
                    });
                }
            } catch (err) {
                commit("stateLoadingError");
            } finally {
                // обозначить конец состояния загрузки
                if (doChangeState) setTimeout(() => commit("changeLoadingState", false), 1000);
            }
        }
    },
    mutations: {
        setJsonArray(state, params) {
            const name = params.arrayName;
            state[name] = params.data;
        },
        changeLoadingState(state, bool) {
            const timeout = bool === true ? 0 : 1000;
            setTimeout(() => state._isLoadingState = bool, timeout);
        },
        stateLoadingError(state){
            state._isLoadingError = true;
        }
    },
    getters: {
        isLoadingState(state) {
            return state._isLoadingState;
        },
        isLoadingError(state) {
            return state._isLoadingError;
        },

        products(state) {
            return state.products || [];
        },
        categories(state) {
            return state.categories || [];
        },
        blogs(state) {
            return state.blogs || [];
        },
        users(state) {
            return state.users || [];
        },
        blogsCategories(state) {
            return state.blogsCategories || [];
        },
    }
}