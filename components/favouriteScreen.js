import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import { GoodPreview } from "../../components/goodPreview.js";
import database from "../scripts/database.js";
import favourite from "../scripts/Storage/favouriteData.js";

export class FavouriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      buttonShow: false,
      buttonDisplay: false,
    };
    this.arButton = createRef();
  }

  componentDidMount() {
    window.addEventListener("favouriteChanged", () => {
      this.forceUpdate();
    });

    if (this.arButton.current) {
      this.arButton.current.style.display = "";
    }
    window.addEventListener("favouriteClick", this.show);
  }

  componentWillUnmount() {
    window.removeEventListener("favouriteClick", this.show);
  }

  show = () => {
    this.setState({ isHidden: false });
    setTimeout(() => {
      this.setState({ buttonShow: true, buttonDisplay: true });
    }, 500);
  };

  exit = () => {
    this.setState({ buttonShow: false });
    setTimeout(() => {
      this.setState({ isHidden: true, buttonDisplay: false });
      window.dispatchEvent(new Event("favouriteExit"));
    }, 200);
  };

  getContent = () => {
    let goods = Object.values(database.goods);
    goods = goods.filter((good) => {
      return favourite.data.includes(good.name);
    });

    if (goods.length < 1) {
      console.log("start");
      return html`<div class="favourite-empty">Список пуст</div>
        <div class="action-button">Перейти к покупкам</div> `;
    } else {
      goods = goods.map(
        (good) => html`<${GoodPreview} good=${good}></${GoodPreview}>`
      );
      return html`${goods}
        <div
          ref=${this.arButton}
          class="ar-button fav ${this.state.buttonShow ? "display" : ""} ${this
            .state.buttonDisplay
            ? ""
            : "hidden"}"
        >
          Посмотреть в AR
        </div>
        <div class="ar-button-container"></div> `;
    }
  };

  render() {
    const classes = `favourite overlay ${this.state.isHidden ? "" : "open"}`;
    return html`
      <div class=${classes}>
        <div class="overlay-header">
          <h1>Избранное</h1>
          <img
            src="assets/ExitButton.svg"
            alt="Кнопка Выхода"
            onClick=${this.exit}
          />
        </div>
        <div class="favourite-container">${this.getContent()}</div>
      </div>
    `;
  }
}
