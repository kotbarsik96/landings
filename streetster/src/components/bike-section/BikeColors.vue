<template>
   <div class="colors params">
      <div class="colors__text params__text">Доступно в цветах:</div>
      <form class="colors__circles params__figures">
         <label
            class="colors__wrapper param__wrapper"
            v-for="(color, colorIndex) in bike.colors.list"
            :key="colorIndex"
         >
            <input
               type="radio"
               :name="`param-color-${bike.id}`"
               ref="colorInput"
               :data-color-code="color.code"
               @change="changeColor(color)"
            />
            <div class="colors__circle-big param__item">
               <div
                  class="colors__circle-small param__subitem"
                  :style="'background-color:' + color.code"
               ></div>
            </div>
         </label>
      </form>
   </div>
</template>

<script>
export default {
    name: "BikeColors",
    props: {
        bike: {
            type: Object,
            required: true
        },
        modelValue: String
    },
    emits: ["update:modelValue", "update:colorData"],
    data(){
        return {
            colorCode: ""
        }
    },
    methods: {
        setCheckedInput(index){
            const input = this.$refs.colorInput[index];
            input.checked = true;
            input.dispatchEvent(new Event("change"));
        },
        changeColor(color){
            this.$emit("update:modelValue", color.code);
            this.$emit("update:colorData", color);
        }
    },
    watch: {
        modelValue(newVal){
            this.colorCode = newVal;
        },
        colorCode(newVal){
            const index = this.$refs.colorInput.findIndex(inp => inp.dataset.colorCode === newVal);
            this.setCheckedInput(index);
        }
    },
    mounted(){
        this.setCheckedInput(0);
    }
};
</script>