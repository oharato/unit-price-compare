<template>
  <div class="pure-g">
    <div class="pure-u-1-3">
      <input type="number" v-model.number="price" />
    </div>
    <div class="pure-u-1-3">
      <input type="number" v-model.number="amount" />
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
  computed: {
    unitPrice() {
      if (!this.amount) return 0;
      return this.price / this.amount;
    },
  },
};
</script>
