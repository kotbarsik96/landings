import { createStore } from "vuex";
import jsons from "@/store/modules/jsons.js";
import lStorage from "@/store/modules/l-storage.js";

export default createStore({
    modules: {
        jsons,
        lStorage
    }
});