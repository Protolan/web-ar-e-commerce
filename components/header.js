import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import favourite from "../scripts/Storage/favouriteData.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
    this.prevScrollPos = 0;
    this.favouriteButton = createRef();
  }

  componentDidMount() {
    window.addEventListener("favouriteChanged", () => {
      this.forceUpdate();
    });
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  redirectToPage = (targetPath) => {
    console.log("redirect");
    const currentPath = window.location.pathname;

    if (currentPath !== targetPath) {
      window.location.href = targetPath;
    }
  };

  favouriteClick = () => {
    window.dispatchEvent(new Event("favouriteClick"));
  };

  handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const scollMinDistant = 20;
    const headerHeight = 60;
    if (Math.abs(this.prevScrollPos - currentScrollPos) < scollMinDistant)
      return;

    if (
      this.prevScrollPos > currentScrollPos ||
      currentScrollPos <= headerHeight
    ) {
      this.setState({ isHidden: false });
    } else {
      this.setState({ isHidden: true });
    }
    this.prevScrollPos = currentScrollPos;
  };

  render() {
    const { isHidden } = this.state;
    const classes = `header header-movable ${isHidden ? "header-hide" : ""}`;
    const anyFavourite = favourite.data.length > 0;
    const number = anyFavourite
      ? html`<div class="header-counter">${favourite.data.length}</div>`
      : ``;

    return html`
      <div class="${classes}">
        <div class="header-left">
          <div class="icon-container"><img src="assets/Menu.svg" /></div>
          <div class="icon-container"><img src="assets/Search.svg" /></div>
        </div>
        <img
          src="assets/ARDIV.svg"
          onClick=${() => this.redirectToPage("/index.html")}
        />
        <div class="header-right">
          <div
            class="icon-container"
            ref=${this.favouriteButton}
            onClick=${this.favouriteClick}
          >
            ${number}
            <img
              src=${anyFavourite
                ? "assets/Favourite_Fill.svg"
                : "assets/Favourite.svg"}
            />
          </div>
          <div class="icon-container"><img src="assets/Shop.svg" /></div>
        </div>
      </div>
      <div class="header-container"></div>
    `;
  }
}
