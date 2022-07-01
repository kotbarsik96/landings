import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import HomePage from "@/views/index/HomePage";

const routes = [
  // folder: "index"
  { path: '/:pathValue(.*)*', name: 'not-found', component: () => import("@/views/index/NotFound") },
  { path: '/', name: 'home', component: HomePage },
  { path: '/guarantees', name: 'guarantees', component: () => import("@/views/index/GuaranteesPage") },
  { path: '/delivery-payment', name: 'delivery-payment', component: () => import("@/views/index/DeliveryPaymentPage") },
  { path: '/contacts', name: 'contacts', component: () => import("@/views/index/ContactsPage") },
  {
    path: '/catalogue',
    redirect: { name: 'catalogue-list', params: { pageNumber: 1 } },
    name: 'catalogue',
    component: () => import("@/views/index/CataloguePage"),
    children: [
      {
        path: 'page=:pageNumber(\\d+)+',
        name: 'catalogue-list',
        component: () => import("@/views/index/CatalogueListPage")
      },
      { path: 'page=:pageNumber(\\D*)', redirect: { name: 'catalogue-list', params: { pageNumber: 1 } } },
      { path: ':pathValue(.*)*', redirect: { name: 'catalogue-list', params: { pageNumber: 1 } } },
    ]
  },
  // folder: "products"
  { path: '/cart', name: 'cart', component: () => import("@/views/products/CartPage") },
  { path: '/cart-oneclick', name: 'cart-oneclick', component: () => import("@/views/products/CartPage") },
  { path: '/favorites', name: 'favorites', component: () => import("@/views/products/FavoritesPage") },
  { path: '/order', name: 'order', component: () => import("@/views/products/OrderPage") },
  { path: '/order-oneclick', name: 'order-oneclick', component: () => import("@/views/products/OrderPage") },
  {
    path: '/products/:vendorCode',
    name: 'product',
    props: route => ({ vendorCode: route.params.vendorCode }),
    component: () => import("@/views/products/ProductPage"),
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // если to.name и from.name совпадают с строками из списка, прокрутка не происходит
    const exceptionCompNames = ["catalogue", "catalogue-list"];

    return savedPosition || new Promise(resolve => {
      exceptionCompNames.forEach(name => {
        if (to.name === name && from.name === name) resolve();
      });

      setTimeout(() => {
        resolve({ top: 0, behavior: "smooth" })
      }, 1000);
    });
  }
});

export default router;
