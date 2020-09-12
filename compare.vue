<template>
  <div class="pure-g">
    <div class="pure-u-1-3">
      <input type="number" v-model.number="localPrice" />
    </div>
    <div class="pure-u-1-3">
      <input type="number" v-model.number="localAmount" />
    </div>
    <div class="pure-u-1-3">
      <input type="number" v-model.number="unitPrice" readonly />
    </div>
  </div>
</template>
<style scoped>
input[type="number"] {
  max-width: 90%;
  text-align: end;
}
</style>
<script>
module.exports = {
  props: {
    price: {
      type: Number,
    },
    amount: {
      type: Number,
    },
  },
  data() {
    return {
      localPrice: this.price,
      localAmount: this.amount,
    };
  },
  watch: {
    localPrice(v) {
      this.$emit("update:price", v);
    },
    localAmount(v) {
      this.$emit("update:amount", v);
    },
  },
  computed: {
    unitPrice() {
      if (!this.localAmount) return 0;
      return this.localPrice / this.localAmount;
    },
  },
};
</script>
