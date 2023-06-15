import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataEntered: true,
      clearButton: false,
      isHidden: true,
      phoneNumber: "",
    };
  }

  componentDidMount() {
    window.addEventListener("profileClicked", this.show);
  }

  componentWillUnmount() {
    window.removeEventListener("profileClicked", this.show);
  }

  show = () => {
    this.setState({ isHidden: false });
  };

  exit = () => {
    this.setState({ isHidden: true });
    window.dispatchEvent(new Event("authExit"));
  };

  handlePhoneNumberChange = (event) => {
    let phoneNumber = event.target.value;
    if (this.state.phoneNumber === "") {
      phoneNumber = "+7";

      this.setState({ phoneNumber, clearButton: true });
      return;
    } else {
      if (phoneNumber === "+") {
        phoneNumber = "";
        this.setState({ phoneNumber, clearButton: false });
        return;
      }
    }

    // Проверяем, что введенный номер соответствует формату "+7xxxxxxxxxx"
    const regex = /^(\+7)\d*$/;
    if (!regex.test(phoneNumber)) {
      // Если номер не соответствует формату, удаляем последний введенный символ
      phoneNumber = phoneNumber.slice(0, -1);
    }

    // Обновляем состояние с новым номером
    this.setState({ phoneNumber });
  };

  handleLettersOnly = (event) => {
    const inputText = event.target.value;
    const lettersOnly = inputText.replace(/[^a-zA-Z]/g, "");
  };

  clearInput = () => {
    this.setState({ phoneNumber: "", clearButton: false });
  };

  render() {
    const classes = `auth overlay ${this.state.isHidden ? "" : "open"}`;
    const cleatButtonClasses = `input-clear ${
      this.state.clearButton ? "" : "hidden"
    }`;
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
          <div class="input-container">
            <div class="input-title">Телефон</div>
            <input
              type="text"
              maxlength="12"
              class="input-field"
              value=${this.state.phoneNumber}
              onInput=${this.handlePhoneNumberChange}
              placeholder="+7 (___) ___ __ __"
            />
            <span class=${cleatButtonClasses} onClick=${this.clearInput}></span>
          </div>
          <div class="action-button">Получить код в SMS</div>
        </div>
      </div>
    `;
  }
}
