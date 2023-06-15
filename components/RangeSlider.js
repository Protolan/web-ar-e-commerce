"use strict";

import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class RangeSlider extends Component {
  componentDidMount() {
    this.fromSlider = this.base.querySelector("#fromSlider");
    this.toSlider = this.base.querySelector("#toSlider");
    this.fromInput = this.base.querySelector("#fromInput");
    this.toInput = this.base.querySelector("#toInput");
    this.sliderColor = "#D6D6D6";
    this.rangeColor = "#3a3b3d";

    this.fillSlider(this.fromSlider, this.toSlider, this.toSlider);
    this.setToggleAccessible(this.toSlider);

    this.fromSlider.oninput = () =>
      this.controlFromSlider(this.fromSlider, this.toSlider, this.fromInput);
    this.toSlider.oninput = () =>
      this.controlToSlider(this.fromSlider, this.toSlider, this.toInput);
    this.fromInput.oninput = () =>
      this.controlFromInput(
        this.fromSlider,
        this.fromInput,
        this.toInput,
        this.toSlider
      );
    this.toInput.oninput = () =>
      this.controlToInput(
        this.toSlider,
        this.fromInput,
        this.toInput,
        this.toSlider
      );
  }

  getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(from, to, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
    to right,
    ${this.sliderColor} 0%,
    ${this.sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${this.rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${this.rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${this.sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${this.sliderColor} 100%)`;
  }

  setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector("#toSlider");
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, controlSlider);
    this.setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  render() {
    const minValue = this.props.min;
    const maxValue = this.props.max;
    return html`
      <div class="range_container">
        <div class="form_control">
          <div class="form-container">
            <div>от</div>
            <input
              type="number"
              class="rangeInput"
              id="fromInput"
              value=${minValue}
              min=${minValue}
              max=${maxValue}
            />
          </div>
          <div class="form-container">
            <div>до</div>
            <input
              type="number"
              id="toInput"
              class="rangeInput"
              value=${maxValue}
              min=${minValue}
              max=${maxValue}
            />
          </div>
        </div>
        <div class="sliders_control">
          <input
            id="fromSlider"
            type="range"
            value=${minValue}
            min=${minValue}
            max=${maxValue}
          />
          <input
            id="toSlider"
            type="range"
            value=${maxValue}
            min=${minValue}
            max=${maxValue}
          />
        </div>
      </div>
    `;
  }
}
