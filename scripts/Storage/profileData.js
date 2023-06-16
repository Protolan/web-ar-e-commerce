import profile from "./storage.js";

class ProfileData {
  constructor() {
    this.init();
  }

  init() {
    let savedData = storage.load("profile");
    if (savedData == null) {
      this.data = {
        current: null,
        profiles: [],
      };
      storage.save("profile", this.data);
    } else {
      this.data = savedData;
    }
  }

  addProfile(profileData) {
    const profile = findProfileByPhone(profileData.phone);
    if (profile != null) return;
    let newProfile = {
      phone: profileData.phone,
      name: profileData.name,
      mail: profileData.mail,
      orders: [],
    };
    this.data.profiles.push(newProfile);
    storage.save("profile", this.data);
  }

  logIn(phone) {
    const profile = findProfileByPhone(phone);
    if (profile != null) {
      this.data.current = profile;
      storage.save("profile", this.data);
      window.dispatchEvent(new Event("logedIn"));
    }
  }

  logOut() {
    if (this.data.current != null) {
      this.data.current = null;
      storage.save("profile", this.data);
      window.dispatchEvent(new Event("logedOut"));
    }
  }

  addOrder(item) {
    if (this.data.current == null) return;
    this.data.current.orders.push(item);
    storage.save("profile", this.data);
  }

  removeOrder(id) {
    if (this.data.current == null) return;
    const order = this.findOrderById(id);
    if (order === null) return;
    const orders = this.data.current.orders;
    orders.splice(orders.indexOf(order), 1);
  }

  findProfileByPhone(phone) {
    return data.profiles.find((profile) => profile.phone === phone);
  }

  findOrderById(id) {
    if (this.data.current == null) return null;
    return this.data.current.orders.find((order) => order.id === id);
  }

  invokeEvent() {
    console.log(this.data);
    window.dispatchEvent(new Event("profileChanged"));
  }
}

const profile = new ProfileData(); // Создаем единственный экземпляр Storage

export default profile;
