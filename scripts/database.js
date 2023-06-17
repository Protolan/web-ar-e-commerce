class Database {
  constructor() {
    this.initialization = Promise.all([
      this.createGoods(),
      this.createCities(),
      this.createCategories(),
    ]);
  }

  async createGoods() {
    this.goods = await this.createBase([
      `database/goods/lere.json`,
      `database/goods/lins.json`,
      `database/goods/numo.json`,
      `database/goods/amrano.json`,
      `database/goods/turyado.json`,
    ]);
  }

  async createCities() {
    let cities = await this.createBase([`database/cities/cities.json`]);
    this.cities = cities.cities.cities;
  }

  async createCategories() {
    let categories = await this.createBase([`database/categories.json`]);
    this.categories = categories.categories;
  }

  async createBase(filePaths) {
    try {
      const fileContents = {};

      const filePromises = filePaths.map((filePath) => {
        const fileName = filePath.split("/").pop().replace(".json", "");
        return fetch(filePath)
          .then((response) => response.json())
          .then((json) => {
            fileContents[fileName] = json;
          });
      });

      await Promise.all(filePromises);

      return fileContents;
    } catch (error) {
      console.error("Ошибка при инициализации JSON-файлов:", error);
      throw error;
    }
  }
}

const database = new Database(); // Создаем единственный экземпляр Database

export default database;
