import storage from "./storage.js";

class ShopData {
  constructor() {
    this.init();
  }

  init() {
    let savedData = storage.load("shop");
    if (savedData == null) {
      this.data = [];
      storage.save("shop", this.data);
    } else {
      this.data = savedData;
    }
  }

  add(item) {
    if (!this.data.includes(item)) {
      this.data.push(item);
      this.invokeEvent();
      storage.save("shop", this.data);
    }
  }

  remove(item) {
    const index = this.data.indexOf(item);
    if (index !== -1) {
      this.data.splice(index, 1);
      storage.save("shop", this.data);
      this.invokeEvent();
    }
  }

  invokeEvent() {
    console.log(this.data);
    window.dispatchEvent(new Event("shopChanged"));
  }
}

const shop = new ShopData(); // Создаем единственный экземпляр Storage

export default shop;
