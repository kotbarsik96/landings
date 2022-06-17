import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/index/HomePage";

const routes = [
  // folder: "index"
  { path: '/', name: 'home', component: HomePage },
  { path: '/guarantees', name: 'guarantees', component: () => import("@/views/index/GuaranteesPage") },
  { path: '/delivery-payment', name: 'delivery-payment', component: () => import("@/views/index/DeliveryPaymentPage") },
  { path: '/contacts', name: 'contacts', component: () => import("@/views/index/ContactsPage") },
  { path: '/catalogue', redirect: "/catalogue/page=1" },
  { path: '/catalogue/:string(\\D*\\d+)+', redirect: "/catalogue/page=1" },
  { path: '/catalogue/page=:pageNumber(\\d+)*', name: 'catalogue', component: () => import("@/views/index/CataloguePage") },
  // folder: "products"
  { path: '/cart', name: 'cart', component: () => import("@/views/products/CartPage") },
  { path: '/cart-oneclick', name: 'cart-oneclick', component: () => import("@/views/products/CartPage") },
  { path: '/favorites', name: 'favorites', component: () => import("@/views/products/FavoritesPage") },
  { path: '/order', name: 'order', component: () => import("@/views/products/OrderPage") },
  { path: '/order-oneclick', name: 'order-oneclick', component: () => import("@/views/products/OrderPage") },
  { path: '/products/:vendorCode', name: 'product', props: route => ({ vendorCode: route.params.vendorCode }), component: () => import("@/views/products/ProductPage") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition){
    return { top: 0, behavior: "smooth" }
  }
});

export default router;
