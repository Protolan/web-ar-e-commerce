import storage from "./storage.js";

class FavouriteData {
  constructor() {
    this.init();
  }

  init() {
    let savedData = storage.load("favourite");
    if (savedData == null) {
      this.data = [];
      storage.save("favourite", this.data);
    } else {
      this.data = savedData;
    }
  }

  add(item) {
    if (!this.data.includes(item)) {
      this.data.push(item);
      this.invokeEvent();
      storage.save("favourite", this.data);
    }
  }

  remove(item) {
    const index = this.data.indexOf(item);
    if (index !== -1) {
      this.data.splice(index, 1);
      storage.save("favourite", this.data);
      this.invokeEvent();
    }
  }

  invokeEvent() {
    console.log(this.data);
    window.dispatchEvent(new Event("favouriteChanged"));
  }
}

const favourite = new FavouriteData(); // Создаем единственный экземпляр Storage

export default favourite;
