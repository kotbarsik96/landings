import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/index/HomePage";

const routes = [
  // folder: "index"
  { path: '/sites/audiofree/dist/:pathValue(.*)*', name: 'not-found', component: () => import("@/views/index/NotFound") },
  { path: '/sites/audiofree/dist/', name: 'home', component: HomePage },
  { path: '/sites/audiofree/dist/guarantees', name: 'guarantees', component: () => import("@/views/index/GuaranteesPage") },
  { path: '/sites/audiofree/dist/delivery-payment', name: 'delivery-payment', component: () => import("@/views/index/DeliveryPaymentPage") },
  { path: '/sites/audiofree/dist/contacts', name: 'contacts', component: () => import("@/views/index/ContactsPage") },
  {
    path: '/sites/audiofree/dist/catalogue',
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
  { path: '/sites/audiofree/dist/cart', name: 'cart', component: () => import("@/views/products/CartPage") },
  { path: '/sites/audiofree/dist/cart-oneclick', name: 'cart-oneclick', component: () => import("@/views/products/CartPage") },
  { path: '/sites/audiofree/dist/favorites', name: 'favorites', component: () => import("@/views/products/FavoritesPage") },
  { path: '/sites/audiofree/dist/order', name: 'order', component: () => import("@/views/products/OrderPage") },
  { path: '/sites/audiofree/dist/order-oneclick', name: 'order-oneclick', component: () => import("@/views/products/OrderPage") },
  {
    path: '/sites/audiofree/dist/products/:vendorCode',
    name: 'product',
    props: route => ({ vendorCode: route.params.vendorCode }),
    component: () => import("@/views/products/ProductPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
