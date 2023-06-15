import { Component } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class Carousel extends Component {
  state = {
    currentIndex: 0,
    animate: false,
  };

  startX = 0;
  threshold = 100;

  handleTouchStart = (event) => {
    this.startX = event.touches[0].clientX;
  };

  handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = this.startX - endX;

    if (Math.abs(diffX) > this.threshold) {
      this.setState({ animate: true });
      if (diffX > 0) {
        this.setState((prevState) => ({
          currentIndex:
            (prevState.currentIndex + 1) % this.props.children.length,
        }));
      } else {
        this.setState((prevState) => ({
          currentIndex:
            (prevState.currentIndex - 1 + this.props.children.length) %
            this.props.children.length,
        }));
      }
    }
  };

  renderSlides() {
    const { children } = this.props;
    const { currentIndex, animate } = this.state;

    return children.map(
      (child, index) => html`
        <div
          class="carousel-item ${index === currentIndex
            ? "active"
            : ""} ${animate ? "animate" : ""}"
        >
          ${child}
        </div>
      `
    );
  }

  render() {
    return html`
      <div
        class="carousel"
        style=${`height: ${this.props.height}px`}
        onTouchStart=${this.handleTouchStart}
        onTouchEnd=${this.handleTouchEnd}
      >
        ${this.renderSlides()}
      </div>
    `;
  }
}
