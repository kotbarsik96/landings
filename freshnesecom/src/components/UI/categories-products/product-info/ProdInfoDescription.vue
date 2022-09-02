<template>
    <div>
        <div
            class="info-tab__text-block text-block"
            v-for="block in product.description"
            :key="block.title"
        >
            <h5 class="text-block__title">{{ block.title }}</h5>
            <p class="text-block__text" v-if="block.text">
                {{ block.text }}
            </p>
            <div class="text-block__table table" v-if="block.table">
                <div
                    class="table__col"
                    v-for="col in block.table"
                    :key="col.title"
                >
                    <div class="table__title">{{ col.title }}</div>
                    <div
                        class="table__cell"
                        v-for="(cell, index) in col.cells"
                        :key="index"
                    >
                        {{ cell }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProdInfoDescriptions",
    props: {
        product: Object,
    },
};
</script>