<template>
   <div class="select" :class="{ '__active': isShown }" @click="isShown = !isShown">
      <div class="select__selected">{{ selectedOption.title }}</div>
      <div class="select__options">
         <label class="option" v-for="opt in options" :key="opt.value">
            {{ opt.title }}
            <input
               type="radio"
               :name="inputName"
               :value="opt.value"
               @change="setSelected(opt)"
               ref="selectInput"
            />
         </label>
      </div>
   </div>
</template>

<script>
export default {
   name: "UserSelect",
   props: {
      inputName: {
         type: String,
         defalut: Date.now(),
      },
      options: {
         type: Array,
         required: true,
      },
      modelValue: Object
   },
   emits: ["update:modelValue"],
   data() {
      return {
         selectedOption: {},
         isShown: false,
      };
   },
   methods: {
      initSelect() {
        const input = this.$refs.selectInput[0];
         input.checked = true;
         input.dispatchEvent(new Event("change"));
      },
      setSelected(opt) {
        this.selectedOption = opt;
        this.isShown = false;
        this.$emit("update:modelValue", opt);
      },
   },
   mounted() {
      this.initSelect();
   },
};
</script>