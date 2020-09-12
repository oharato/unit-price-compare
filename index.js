window.addEventListener("load", function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("serviceWorker registed.");
      })
      .catch(function (error) {
        console.warn("serviceWorker error.", error);
      });
  }
});
const app = new Vue({
  el: "#app",
  components: {
    compare: httpVueLoader("compare.vue"),
  },
  data: {
    compares: [{ price: null, amount: null }],
  },
  methods: {
    add() {
      this.compares.push({ price: null, amount: null });
    },
  },
});
