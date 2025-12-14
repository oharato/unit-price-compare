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

const STORAGE_KEY = "unit-price-compare-data";
const HISTORY_KEY = "unit-price-compare-history";

// Load saved data from localStorage
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved data", e);
    }
  }
  return [
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
    { price: null, amount: null },
  ];
}

const app = new Vue({
  el: "#app",
  components: {
    compare: httpVueLoader("compare.vue"),
  },
  data: {
    compares: loadData(),
    history: [],
  },
  watch: {
    compares: {
      handler(newVal) {
        // Auto-save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  methods: {
    clearAll() {
      this.compares = this.compares.map(() => ({ price: null, amount: null }));
    },
    saveToHistory() {
      // Check if there's any data to save
      const hasData = this.compares.some(c => c.price || c.amount);
      if (!hasData) return;

      const historyEntry = {
        date: new Date().toISOString(),
        data: JSON.parse(JSON.stringify(this.compares)),
      };
      
      // Load existing history
      const saved = localStorage.getItem(HISTORY_KEY);
      let history = [];
      if (saved) {
        try {
          history = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
      
      // Add new entry and save
      history.unshift(historyEntry);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      
      alert("履歴に保存しました");
    },
    showHistory() {
      // Load history from localStorage
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        try {
          this.history = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse history", e);
          this.history = [];
        }
      } else {
        this.history = [];
      }
      
      // Show modal
      const modal = document.getElementById("historyModal");
      if (modal) {
        modal.showModal();
      }
    },
    closeHistory() {
      const modal = document.getElementById("historyModal");
      if (modal) {
        modal.close();
      }
    },
    loadHistoryEntry(entry) {
      this.compares = JSON.parse(JSON.stringify(entry.data));
      this.closeHistory();
    },
    formatDate(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString("ja-JP");
    },
  },
});
