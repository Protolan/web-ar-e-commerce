import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import favourite from "../scripts/Storage/favouriteData.js";

export class GoodPreview extends Component {
  componentDidMount() {
    window.addEventListener("favouriteChanged", () => {
      this.forceUpdate();
    });
  }

  toggleFavourite = () => {
    const good = this.props.good;
    const isFavourite = favourite.data.includes(good.name);
    if (isFavourite) {
      favourite.remove(good.name);
    } else {
      favourite.add(good.name);
    }
  };

  render() {
    const good = this.props.good;
    const onSale = good.sale != null;
    const isFavourite = favourite.data.includes(good.name);
    const previousPrice = !onSale
      ? ``
      : html`<div class="good-preview-previous-price previous-cost">
          ${good.sale}
        </div> `;
    return html`
      <div class="good-preview">
        <img class="good-preview-img" src=${good.images[0]} alt=${good.name} />
        <div class="good-preview-desc">
          <div class="good-preview-title">${good.name}</div>
          <div class="good-preview-price-container">
            <div class="good-preview-price ${onSale ? "sale-cost" : ""}">
              ${good.cost}
            </div>
            ${previousPrice}
          </div>
          <img
            onClick=${this.toggleFavourite}
            class="good-preview-fav-button"
            src=${isFavourite
              ? "assets/Favourite_Fill.svg"
              : "assets/Favourite.svg"}
            alt="Кнпока добавить в избранное"
          />
        </div>
      </div>
    `;
  }
}
