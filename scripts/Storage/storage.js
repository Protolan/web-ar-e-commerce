class Storage {
  constructor() {
    console.log("initStorage");
  }

  save(key, value) {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  load(key) {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue);
    }
    return null;
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

const storage = new Storage(); // Создаем единственный экземпляр Storage

export default storage;
