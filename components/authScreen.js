import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import { LogScreen } from "./logScreen.js";
import { RegScreen } from "./regScreen.js";

export class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.logScreen = createRef();
    this.state = {
      isHidden: true,
      enter: true,
    };
  }

  componentDidMount() {
    window.addEventListener("profileClicked", this.show);
  }

  componentWillUnmount() {
    window.removeEventListener("profileClicked", this.show);
  }

  switchLog = () => {
    if (this.state.enter) return;
    this.setState({ enter: true });
  };

  switchReg = () => {
    if (!this.state.enter) return;
    this.setState({ enter: false });
  };

  show = () => {
    this.logScreen.current.reset();
    this.setState({ isHidden: false, enter: true });
  };

  exit = () => {
    this.setState({ isHidden: true });
    window.dispatchEvent(new Event("authExit"));
  };

  render() {
    const classes = `auth overlay ${this.state.isHidden ? "" : "open"}`;
    const isEnter = this.state.enter;
    return html`
      <div class=${classes}>
        <div class="overlay-header">
          <h1>Вход</h1>
          <img
            src="assets/ExitButton.svg"
            alt="Кнопка Выхода"
            onClick=${this.exit}
          />
        </div>
        <div class="auth-container">
          <div class="auth-switcher">
            <div
              onClick=${this.switchLog}
              class="auth-switcher-text-container ${isEnter ? "outline" : ""}"
            >
              <div>Войти</div>
            </div>
            <div
              onClick=${this.switchReg}
              class="auth-switcher-text-container ${isEnter ? "" : "outline"}"
            >
              <div>Регистрация</div>
            </div>
          </div>
          ${isEnter
            ? html`<${LogScreen}
                ref=${this.logScreen}
                onCompleted=${this.exit}
              />`
            : html`<${RegScreen}
                ref=${this.logScreen}
                onCompleted=${this.exit}
              />`}
        </div>
      </div>
    `;
  }
}
