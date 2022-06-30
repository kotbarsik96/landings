import { createStore } from "vuex";
import products from "@/store/modules/products";
import lStorageStore from "@/store/modules/l-storage";
import notifications from "@/store/modules/notifications";

export default createStore({
  modules: {
    products,
    lStorageStore,
    notifications
  }
})
