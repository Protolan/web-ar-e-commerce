import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class GoodTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
    this.cities = this.createLocationHTML(props.cities);
  }

  componentDidMount() {
    window.addEventListener("locationClicked", this.show);
  }

  componentWillUnmount() {
    window.removeEventListener("locationClicked", this.show);
  }

  show = () => {
    this.setState({ isHidden: false });
  };

  locationPicked = (city) => {
    this.setState({ isHidden: true });
    window.dispatchEvent(new CustomEvent("locationPicked", { detail: city }));
  };

  locationExit = () => {
    this.setState({ isHidden: true });
    window.dispatchEvent(new Event("locationExit"));
  };

  createLocationHTML = (cityArray) => {
    return cityArray.map(
      (value) =>
        html`<div class="city-pick" onClick=${this.locationPicked}>
          ${value}
        </div>`
    );
  };

  render() {
    const classes = `location overlay ${this.state.isHidden ? "" : "open"}`;
    return html`
      <div class=${classes}>
        <div class="overlay-header">
          <h1>Укажите свой город</h1>
          <img src="assets/ExitButton.svg" onClick=${this.locationExit} />
        </div>
        <div class="location-container">${this.cities}</div>
      </div>
    `;
  }
}
