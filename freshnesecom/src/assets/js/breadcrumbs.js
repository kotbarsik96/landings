// импортировать createBreadcrumbs и добавить в methods
// добавить в emits: ["breadcrumbs-change"]
// добавить в data|computed: pageRouteTitle ("Список желаемого", "Блоги"...)
// !ЕСЛИ перед страницей идут другие страницы, кроме Главной, нужно указать информацию о них в previousBreadcrumbs (Главная уже указана, ее не надо). Должна представлять собой объект/массив объектов. 
// Пример previousBreadcrumbs: { title: this.productCategory.title, routeTo: { name: this.product.category, params: { categoryId: this.product.category } } }
// вызвать createBreadcrumbs в хуке created(), а также, если pageRouteTitle в computed, повесить на него watch и вызывать createBreadcrumbs

export default function createBreadcrumbs() {
    // имена маршрутов страниц, на которых нет хлебных крошек
    const exceptions = ["home", "404"];
    // имена маршрутов страниц, перед которыми есть другие страницы
    const nestedBreadcrumbsPages = ["product", "blog-item"];
    const routeName = this.$route.name;

    if (exceptions.includes(routeName)) return this.$emit("breadcrumbs-change", []);

    const pageTitle = this.pageRouteTitle;
    const routeParams = this.$route.params;
    const breadcrumbs = [
        { title: "Главная", routeTo: { name: "home" } },
    ];

    if (nestedBreadcrumbsPages.includes(routeName)) createNestedBreadcrumbs.call(this);
    else createCommonBreadcrumbs.call(this);

    for (let bcmb of breadcrumbs) {
        if (!bcmb) {
            this.$emit("breadcrumbs-change", []);
            return;
        }
    }
    this.$emit("breadcrumbs-change", breadcrumbs);

    // требует только pageRouteTitle
    function createCommonBreadcrumbs() {
        const breadcrumb = { title: pageTitle, routeTo: { name: routeName, params: routeParams } };
        breadcrumbs.push(breadcrumb);
    }
    // требует previousBreadcrumbs
    function createNestedBreadcrumbs() {
        const previous = this.previousBreadcrumbs;

        if (!Array.isArray(previous)) breadcrumbs.push(previous);
        else previous.forEach(obj => breadcrumbs.push(obj));

        if (pageTitle && routeParams) createCommonBreadcrumbs();
    }
}