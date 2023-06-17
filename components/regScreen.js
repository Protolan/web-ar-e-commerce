"use strict";

import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";
import { InputField } from "./input-field.js";
import { DigitInput } from "./digitInput.js";
import profile from "../scripts/Storage/profileData.js";

export class RegScreen extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = Array.from({ length: 4 }, () => createRef());
    this.state = {
      isEntered: false,
    };
  }

  componentDidMount() {}

  reset = () => {
    this.setState({
      isEntered: false,
    });
    for (const input of this.inputRefs) {
      input.current.reset();
    }
  };

  onButtonClick = async () => {
    const promises = this.inputRefs.map((input) => input.current.checkInput());
    await Promise.all(promises);
    if (this.inputRefs.some((input) => input.current.state.error)) {
      return;
    }
    if (profile.findProfileByPhone(this.inputRefs[2].current.input) != null) {
      phone.setError();
      return;
    }
    for (const input of this.inputRefs) {
      input.current.block();
    }
    this.setState({
      isEntered: true,
    });
  };

  onCodeEntered = () => {
    const inputs = this.inputRefs.map((input) => input.current.state.input);
    profile.addProfile({
      name: inputs[0],
      surname: inputs[1],
      phone: inputs[2],
      mail: inputs[3],
    });
    if (this.props.onCompleted) {
      profile.logIn(inputs[2]);
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
      <${InputField} ref=${this.inputRefs[0]} title="Имя" type="name" />
      <${InputField} ref=${this.inputRefs[1]} title="Фамилия" type="name" />
      <${InputField}
        ref=${this.inputRefs[2]}
        title="Телефон"
        type="phoneNumber"
      />
      <${InputField} ref=${this.inputRefs[3]} title="Почта" type="mail" />
      ${this.getCurrentView()}
    `;
  }
}
