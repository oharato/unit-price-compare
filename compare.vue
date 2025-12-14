<template>
  <div class="pure-g">
    <div class="pure-u-1-3">
      <input type="number" :value="price" @input="$emit('update:price', $event.target.value ? Number($event.target.value) : null)" />
    </div>
    <div class="pure-u-1-3">
      <input type="number" :value="amount" @input="$emit('update:amount', $event.target.value ? Number($event.target.value) : null)" />
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
