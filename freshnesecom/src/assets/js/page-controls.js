// здесь собраны методы (и computed, и обычные) для страниц, на которых используется постраничный вывод с помощью указания страницы в адресной строке. Наличие всех этих методов необходимо для работы.
// также в data обязательно указать pageRouteName (с которым в params указывается pageNumber), например, "category-pagenumber"
// если страница отображает список карточек, можно воспользоваться также transition-anims.js для TransitionGroup

export default {
    computed: {
        // используется в обязательном pagesArray (нужно вручную, указав srcArray и maxElemsOnPage), берет полный массив и разбивает на несколько массивов, каждый из которых представляет страницу
        createPagesArray(srcArray, maxElemsOnPage) {
            // для получения нужной страницы: pagesArray[pageNumber - 1]
            const array = [...srcArray];
            const pages = [];
            do {
                const page = array.splice(0, maxElemsOnPage);
                pages.push(page);
            }
            while (array.length > 0);
            return pages;
        },
        pagesAmount() { // зависит от this.pagesArray
            return this.pagesArray.length;
        },
        pageNumber() {
            return parseInt(this.$route.params.pageNumber) || 1;
        }
    },
    methods: {
        checkRoutePageNumber() {
            if (this.pagesAmount && this.pageRouteName) {
                const pageNumber = this.$route.params.pageNumber;
                if (!pageNumber || pageNumber < 1) {
                    this.$router.push({
                        name: this.pageRouteName,
                        params: { pageNumber: 1 },
                    });
                }
                if (pageNumber > this.pagesAmount) {
                    this.$router.push({
                        name: this.pageRouteName,
                        params: { pageNumber: this.pagesAmount },
                    });
                }
            }
        },
        setPage(num) {
            // на <PaginationControls></PaginationControls>:
            // @page-number-click="setPage($event)"
            // @next-button-click="setPage(pageNumber + 1)"
            // @prev-button-click="setPage(pageNumber - 1)"
            this.$router.push({
                name: this.pageRouteName,
                params: { pageNumber: num },
            });
        },
    },
    watch: {
        pageNumber() {
            this.checkRoutePageNumber();
        },
        pagesArray(arr) {
            if (arr.length > 0) this.checkRoutePageNumber();
        },
    }
}