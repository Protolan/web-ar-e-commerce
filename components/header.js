import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
    this.prevScrollPos = 0;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

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

  headerHTML = (classes) => {};

  render() {
    const { isHidden } = this.state;
    const classes = `header header-movable ${isHidden ? "header-hide" : ""}`;

    return html`
      <div class="${classes}">
        <div class="header-left">
          <img src="assets/Menu.svg" />
          <img src="assets/Search.svg" />
        </div>
        <img src="assets/ARDIV.svg" />
        <div class="header-right">
          <img src="assets/Favourite.svg" />
          <img src="assets/Shop.svg" />
        </div>
      </div>
      <div class="header-container"></div>
    `;
  }
}
