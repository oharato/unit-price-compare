"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");

const STORAGE_KEY="unit-price-compare-data";
const HISTORY_KEY="unit-price-compare-history";

function unitPriceApp(){
  return{
    compares:JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")||Array(11).fill().map(()=>({price:null,amount:null})),
    history:[],
    toastMessage:"",
    
    init(){
      this.$watch("compares",v=>localStorage.setItem(STORAGE_KEY,JSON.stringify(v)),{deep:true})
    },
    
    calcUnitPrice(c){
      return c.amount?c.price/c.amount:0
    },
    
    clearAll(){
      this.compares=this.compares.map(()=>({price:null,amount:null}))
    },
    
    saveToHistory(){
      if(!this.compares.some(c=>c.price||c.amount))return;
      const h=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");
      h.unshift({date:new Date().toISOString(),data:JSON.parse(JSON.stringify(this.compares))});
      localStorage.setItem(HISTORY_KEY,JSON.stringify(h));
      this.showToast("履歴に保存しました")
    },
    
    showHistory(){
      this.history=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");
      this.$refs.historyModal.showModal()
    },
    
    closeHistory(){
      this.$refs.historyModal.close()
    },
    
    clearHistory(){
      if(confirm("すべての履歴を削除しますか？")){
        localStorage.removeItem(HISTORY_KEY);
        this.history=[];
        this.showToast("履歴を削除しました")
      }
    },    
    deleteHistoryEntry(index){
      this.history.splice(index,1);
      localStorage.setItem(HISTORY_KEY,JSON.stringify(this.history));
      this.showToast("履歴を削除しました")
    },    
    loadHistoryEntry(e){
      this.compares=JSON.parse(JSON.stringify(e.data))
    },
    
    formatDate(iso){
      return new Date(iso).toLocaleString("ja-JP")
    },
    
    showToast(msg){
      this.toastMessage=msg;
      this.$refs.toast.classList.add("show");
      setTimeout(()=>this.$refs.toast.classList.remove("show"),2000)
    }
  }
}
