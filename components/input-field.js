import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class InputField extends Component {
  constructor(props) {
    super(props);
    this.initType();
    this.reset();
    this.inputForm = createRef();
  }

  componentDidUpdate() {
    if (this.renderPromise) {
      this.renderPromise();
    }
  }

  reset = () => {
    this.setState({
      clearButton: false,
      input: "",
      error: false,
      block: false,
    });
  };

  block = () => {
    this.setState({ error: false, clearButton: false, block: true });
  };

  initType = () => {
    const type = this.props.type;
    if (type === "mail") {
      this.regex = /[^a-zA-Z0-9@._%+-]/g;
      this.placeHolder = "alan.gumerov@yandex.ru";
      this.maxLength = 50;
    } else if (type === "phoneNumber") {
      this.regex = /[^0-9+]/g;
      this.placeHolder = "+7 (___) ___ __ __";
      this.maxLength = 12;
    } else if (type === "name") {
      this.regex = /[^А-ЯЁа-яё]/g;
      this.placeHolder = "Алан";
      this.maxLength = 50;
    }
  };

  handleInput = (event) => {
    let input = event.target.value;
    if (this.state.error) {
      input = input.slice(-1);
    }
    input = input.replace(this.regex, "");
    this.setState({
      input: input,
      error: false,
      clearButton: input === "" ? false : true,
    });
  };

  checkInput = () => {
    const type = this.props.type;
    let regex;
    if (type === "mail") {
      regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    } else if (type === "phoneNumber") {
      regex = /^((\+7|7|8)+([0-9]){10})$/;
    } else if (type === "name") {
      regex = /^[А-ЯЁа-яё]+$/;
    }
    const isError = !regex.test(this.state.input);

    this.setState({ error: isError, clearButton: isError });

    return new Promise((resolve) => {
      this.renderPromise = resolve;
    });
  };

  clearInput = () => {
    this.setState({ input: "", clearButton: false, error: false });
  };

  setError = () => {
    this.setState({ error: true, clearButton: true });
  };

  render(props) {
    const classes = `input-field ${this.state.error ? "invalid" : ""}`;
    const cleatButtonClasses = `input-clear ${
      this.state.error ? "invalid" : ""
    } ${this.state.clearButton || this.state.error ? "" : "hidden"}`;
    return html`
      <div class="input-container">
        <div class="input-title">${this.props.title}</div>
        <input
          ref=${this.inputForm}
          type="text"
          maxlength=${this.maxLength}
          class=${classes}
          value=${this.state.input}
          onInput=${this.handleInput}
          placeholder=${this.placeHolder}
          readonly=${this.state.block}
        />
        <span class=${cleatButtonClasses} onClick=${this.clearInput}></span>
      </div>
    `;
  }
}
