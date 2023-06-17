import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import profile from "../scripts/Storage/profileData.js";

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loged: profile.data.current != null,
    };
  }

  componentDidMount() {
    window.addEventListener("logedIn", this.setLogState);
    window.addEventListener("logedOut", this.setLogState);
  }

  setLogState = () => {
    this.setState({
      loged: profile.data.current != null,
    });
  };

  locationClick = () => {
    window.dispatchEvent(new Event("locationClicked"));
  };

  goAuth = () => {
    window.dispatchEvent(new Event("profileClicked"));
  };

  goProfile = () => {
    this.redirectToPage(`/profile.html`);
  };

  redirectToPage = (targetPath) => {
    const currentPath = window.location.pathname;

    if (currentPath !== targetPath) {
      window.location.href = targetPath;
    }
  };

  profileButton = () => {
    const loged = this.state.loged;
    if (loged) {
      return html` <div class="icon-container">
        <img
          src="assets/Profile_Fill.svg"
          alt="Личный кабинет"
          onClick=${this.goProfile}
        />
      </div>`;
    } else {
      return html` <div class="icon-container" onClick=${this.goAuth}>
        <img src="assets/Profile.svg" alt="Личный кабинет" />
      </div>`;
    }
  };

  render() {
    return html`
      <div class="footer">
        <div class="icon-container" onClick=${this.locationClick}>
          <img src="assets/Location.svg" alt="LocationButton" />
        </div>
        ${this.profileButton()}
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
