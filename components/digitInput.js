import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class DigitInput extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = Array.from({ length: props.count }, () => createRef());
    this.state = {
      digits: Array.from({ length: props.count }, () => ""),
      focusedIndex: 0,
    };
  }

  handleDigitInput = (event, index) => {
    const regex = /^\d$/;
    const { value } = event.target;
    const { digits } = this.state;

    if (value === "") {
      digits[index] = value;
      this.setState({ digits });
      return;
    }
    if (!regex.test(value)) {
      this.setState({ digits });
      return;
    }
    digits[index] = value;
    if (index < digits.length - 1) {
      this.state.focusedIndex = index + 1;
      // Если есть следующий индекс и введена цифра, переключаем фокус на следующее поле
      this.inputRefs[index + 1].current.focus();
    } else {
      this.inputRefs[index].current.blur();
      if (this.props.onFilled) {
        this.props.onFilled();
      }
    }
  };

  handleDigitKeyDown = (event, index) => {
    const { digits } = this.state;

    if (event.key === "Backspace" && index > 0 && digits[index] === "") {
      this.state.focusedIndex = index - 1;
      // Если нажата клавиша Backspace и текущее поле пустое, переключаем фокус на предыдущее поле
      this.inputRefs[index - 1].current.focus();
    }
  };

  handleInputClick = (event) => {
    const { focusedIndex } = this.state;
    console.log(focusedIndex);
    this.inputRefs[focusedIndex].current.focus();
  };

  render() {
    const { digits } = this.state;

    return html`
      <div class="digit-input-container">
        ${digits.map(
          (digit, index) => html`
            <input
              ref=${this.inputRefs[index]}
              type="text"
              class="digit-input"
              value=${digit}
              onClick=${(event) => this.handleInputClick(event)}
              onInput=${(event) => this.handleDigitInput(event, index)}
              onKeyDown=${(event) => this.handleDigitKeyDown(event, index)}
            />
          `
        )}
      </div>
    `;
  }
}
