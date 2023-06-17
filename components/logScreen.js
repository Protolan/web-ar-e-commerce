"use strict";

import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import { InputField } from "./input-field.js";
import { DigitInput } from "./digitInput.js";
import profile from "../scripts/Storage/profileData.js";

export class LogScreen extends Component {
  constructor(props) {
    super(props);
    this.phone = createRef();
    this.state = {
      isEntered: false,
    };
  }

  reset = () => {
    this.setState({
      isEntered: false,
    });
    this.phone.current.reset();
  };

  onButtonClick = async () => {
    const phone = this.phone.current;
    await phone.checkInput();
    if (!phone.state.error) {
      if (profile.findProfileByPhone(phone.state.input) == null) {
        phone.setError();
        return;
      }
      phone.block();
      this.setState({
        isEntered: true,
      });
    }
  };

  onCodeEntered = () => {
    if (this.props.onCompleted) {
      profile.logIn(this.phone.current.state.input);
      this.props.onCompleted();
    }
  };

  getCurrentView = () => {
    if (!this.state.isEntered) {
      return html`<div onClick=${this.onButtonClick} class="action-button">
        Получить код в SMS
      </div>`;
    } else {
      return html`<${DigitInput} onFilled=${this.onCodeEntered} count="4" />`;
    }
  };

  render() {
    return html`
      <${InputField} ref=${this.phone} title="Телефон" type="phoneNumber" />
      ${this.getCurrentView()}
    `;
  }
}
