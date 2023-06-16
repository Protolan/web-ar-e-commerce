import { Component, createRef } from "https://esm.sh/preact";
import html from "../scripts/html.js";

export class Carousel extends Component {
  carouselRef = createRef();

  state = {
    currentIndex: 0,
    animate: true,
    height: 300,
  };

  startX = 0;
  threshold = 100;
  loadedCount = 0;

  resetChildrenStyles() {
    const children = this.props.children;

    // Устанавливаем стили transitionDuration и animationDuration на ноль
    children.forEach((child) => {
      child.props.style = {
        ...child.props.style,
        transitionDuration: "0s",
        animationDuration: "0s",
      };
    });

    this.forceUpdate(); // Обновляем компонент для применения новых стилей

    setTimeout(() => {
      // Удаляем все инлайн стили с элементов через 100 миллисекунд
      children.forEach((child) => {
        delete child.props.style;
      });

      this.forceUpdate(); // Обновляем компонент после удаления стилей
    }, 100);
  }

  componentDidMount() {
    this.resetChildrenStyles();
    const container = this.carouselRef.current;
    this.images = container.querySelectorAll("img");

    this.images.forEach((image) => {
      image.addEventListener("load", this.handleImageLoad);
    });
    window.addEventListener("resize", this.setHeight);
  }
  componentWillUnmount() {
    this.images.forEach((image) => {
      image.removeEventListener("load", this.handleImageLoad);
    });
    window.removeEventListener("resize", this.setHeight);
  }

  handleImageLoad = () => {
    this.loadedCount++;
    if (this.loadedCount === this.images.length) {
      this.setHeight();
    }
  };

  setHeight = () => {
    const container = this.carouselRef.current;
    this.setState({ height: container.firstChild.clientHeight });
  };

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
        style=${`height: ${this.state.height}px`}
        ref=${this.carouselRef}
        onTouchStart=${this.handleTouchStart}
        onTouchEnd=${this.handleTouchEnd}
      >
        ${this.renderSlides()}
      </div>
      <${CarouselPointer}
        currentIndex=${this.state.currentIndex}
        totalSlides=${this.props.children.length}
      />
    `;
  }
}

class CarouselPointer extends Component {
  render() {
    const { currentIndex, totalSlides } = this.props;
    const gradienWidth = 100 / totalSlides;

    const pointerStyles = {
      background: `linear-gradient(to right, var(--primary-color) ${gradienWidth}%, transparent ${gradienWidth}%)`,
      transform: `translateX(${currentIndex * (100 / totalSlides)}%)`,
    };

    return html`
      <div class="carousel-pointer-container">
        <div class="carousel-pointer" style=${pointerStyles}></div>
      </div>
    `;
  }
}
