import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/:pathMatch(.*)*", redirect: { name: "404" } },
        { path: "/404", name: "404", meta: { isBlackHeader: true }, component: () => import("@/views/NotFoundPage.vue") },
        { path: "/", name: "home", component: () => import("@/views/HomePage.vue") },
        { path: "/contacts", name: "contacts", component: () => import("@/views/ContactsPage.vue") },
        { path: "/bike/:bikeId", name: "bike-page", meta: { isBlackHeader: true }, component: () => import("@/views/BikePage.vue") },
        { path: "/cart", name: "cart", meta: { isBlackHeader: true }, component: () => import("@/views/CartPage.vue") },
        { path: "/category", redirect: { name: "home" } },
        { path: "/category/:categoryTitle", name: "category", component: () => import("@/views/CategoryPage.vue") },
        { path: "/blogs", name: "blog-page", meta: { isBlackHeader: true }, component: () => import("@/views/blogs/BlogPage.vue") },
        { path: "/blog-item/:blogId", name: "blog-item", meta: { isBlackHeader: true }, component: () => import("@/views/blogs/BlogItem.vue") },
    ],
    scrollBehavior(to) {
        const isContactsReqs = to.name === "contacts" && to.params["contacts-reqs"];
        const exceptions = [isContactsReqs];
        
        for(let except of exceptions) if (except) return false;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    top: 0,
                    behavior: "smooth"
                });
            }, 750);
        });
    }
});