import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class GoodTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      isGoods: true,
    };
  }

  componentDidMount() {
    window.addEventListener("categoryClicked", this.show);
  }

  componentWillUnmount() {
    window.removeEventListener("categoryClicked", this.show);
  }

  show = () => {
    this.setState({ isHidden: false });
  };

  exit = () => {
    this.setState({ isHidden: true });
    window.dispatchEvent(new Event("categoryExit"));
  };

  getCurrentCategories = () => {
    console.log(this.props.categories.goods);
    const categories = this.state.isGoods
      ? this.props.categories.goods
      : this.props.categories.rooms;
    return categories.map(
      (value) =>
        html`<div class="good-type-item">
          <div class="good-type-item">
            <div class="good-type-str">
              <img class="icon-container " src=${value.image} />
              <div>${value.name}</div>
              <img class="good-type-arrow" src="assets/Arrow.svg" />
            </div>
          </div>
          <div class="divider"></div>
        </div>`
    );
  };

  setGoods = () => {
    this.setState({ isGoods: true });
  };
  setRooms = () => {
    this.setState({ isGoods: false });
  };

  render() {
    const classes = `good-type overlay ${this.state.isHidden ? "" : "open"}`;
    return html`
      <div class=${classes}>
        <div class="overlay-header">
          <h1>Категории</h1>
          <img src="assets/ExitButton.svg" onClick=${this.exit} />
        </div>
        <div class="good-type-container">
          <div class="good-type-categories">
            <div
              onClick=${this.setGoods}
              class="good-type-category-button ${this.state.isGoods
                ? "current"
                : ""}"
            >
              Товары
            </div>
            <div
              onClick=${this.setRooms}
              class="good-type-category-button ${this.state.isGoods
                ? ""
                : "current"}"
            >
              Комнаты
            </div>
          </div>
          <div class="good-type-list">${this.getCurrentCategories()}</div>
        </div>
      </div>
    `;
  }
}
