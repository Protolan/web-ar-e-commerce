import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class Footer extends Component {
  constructor(props) {
    super(props);
  }

  locationClick = () => {
    window.dispatchEvent(new Event("locationClicked"));
  };

  profileClick = () => {
    window.dispatchEvent(new Event("profileClicked"));
  };

  render() {
    return html`
      <div class="footer">
        <div class="icon-container" onClick=${this.locationClick}>
          <img src="assets/Location.svg" alt="LocationButton" />
        </div>
        <div class="icon-container" onClick=${this.profileClick}>
          <img src="assets/Profile.svg" alt="Личный кабинет" />
        </div>
        <div class="icon-container">
          <img src="assets/SocialMedia.svg" alt="Социальные сети" />
        </div>
        <div class="icon-container">
          <img src="assets/Phone.svg" alt="Звонок" />
        </div>
      </div>
      <div class="footer-container"></div>
    `;
  }
}
