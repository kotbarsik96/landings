// ВАЖНО!: создать хлебные крошки (делается внутри компонента страницы), инструкция указана в assets/js/breadcrumbs.js

import { createRouter, createWebHashHistory } from "vue-router";

// для страниц с вложенной постраничной навигацией
function redirectToFirstPage(to, routeName) {
    if (!to.params.pageNumber) {
        return {
            name: routeName,
            params: { categoryId: to.params.categoryId, pageNumber: 1 }
        };
    }
    else return to;
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", name: "home", component: () => import("@/views/HomePage.vue") },
        { path: "/404", name: "404", component: () => import("@/views/NotFound.vue") },
        { path: "/:pathMatch(.*)*", redirect: { name: '404' } },
        { path: "/category", redirect: { name: "home" } },
        { path: "/category/:pathMatch(.*)*", redirect: { name: "home" } },
        {
            path: "/category/:categoryId",
            name: "category",
            redirect: (to) => redirectToFirstPage(to, "category-pagenumber"),
            children: [
                {
                    path: "page_:pageNumber(\\d+)+",
                    name: "category-pagenumber",
                    component: () => import("@/components/UI/categories-products/product-cards/ProdcardsList.vue")
                }
            ],
            component: () => import("@/views/CategoryPage.vue")
        },
        {
            path: "/wishlist", name: "wishlist", component: () => import("@/views/WishlistPage.vue")
        },
        {
            path: "/product/:productId", name: "product", component: () => import("@/views/ProductDetail.vue"),
        },
        {
            path: "/checkout",
            name: "checkout",
            meta: { footerCopyright: true },
            component: () => import("@/views/CheckoutPage.vue")
        },
        {
            path: "/blogs",
            name: "blogs",
            redirect: (to) => redirectToFirstPage(to, "blogs-pagenumber"),
            children: [
                {
                    path: "page_:pageNumber(\\d+)+",
                    name: "blogs-pagenumber",
                    component: () => import("@/components/blogs/BlogsPageList.vue")
                }
            ],
            component: () => import("@/views/BlogsPage.vue")
        },
        { path: "/blog/:blogId", name: "blog-item", component: () => import("@/views/BlogItemPage.vue") },
    ],
    scrollBehavior(to, from, savedPosition) {
        const params = { top: 0, behavior: "smooth" };

        if (to.path.includes("category") && from.path.includes("category")) {
            return params;
        }
        if (to.path.includes("blog") && from.path.includes("blog")) return savedPosition;

        return savedPosition || new Promise(resolve => {
            setTimeout(() => {
                resolve(params);
            }, 400);
        });
    }
});

export default router;