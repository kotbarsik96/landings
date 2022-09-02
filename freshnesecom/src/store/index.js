import { createStore } from "vuex";
import jsons from "@/store/modules/jsons.js";
import lStorageModule from "@/store/modules/l-storage.js";
import modals from "@/store/modules/modals.js";
import breadcrumbs from "@/store/modules/breadcrumbs.js";

export default createStore({
    modules: {
        jsons,
        lStorageModule,
        modals,
        breadcrumbs
    }
})