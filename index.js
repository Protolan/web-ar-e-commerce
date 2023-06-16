"use strict";

import { render } from "https://esm.sh/preact";
import { Header } from "./components/header.js";
import html from "./scripts/html.js";
import { Footer } from "./components/footer.js";
import { LocationScreen } from "./components/locationScreen.js";
import { AuthScreen } from "./components/authScreen.js";
import { RangeSlider } from "./components/RangeSlider.js";
import { Carousel } from "./components/carousel.js";
import { GoodPreview } from "./components/goodPreview.js";

async function initializeDatabase(filePaths) {
  try {
    const filePromises = filePaths.map((filePath) => {
      return fetch(filePath).then((response) => response.json());
    });

    const fileContents = await Promise.all(filePromises);

    return fileContents;
  } catch (error) {
    console.error("Ошибка при инициализации JSON-файлов:", error);
    throw error;
  }
}

function tryRenderComponent(pasteID, Component, cssPath) {
  const element = document.getElementById(pasteID);
  if (element) {
    addStylesheet(cssPath);
    render(Component, element);
  }
}

function addStylesheet(cssPath) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = cssPath;
  document.head.appendChild(linkElement);
}

function createRenderComponent(Component, cssPath) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  addStylesheet(cssPath);
  render(Component, element);
}

async function start() {
  const database = [
    `database/cities/cities.json`,
    `database/goods/lere.json`,
    `database/goods/lins.json`,
    `database/goods/numo.json`,
    `database/goods/amrano.json`,
    `database/goods/turyado.json`,
  ];
  const files = await initializeDatabase(database);

  const cities = files[0].cities;
  const lere = files[1];
  const lins = files[2];
  const numo = files[3];
  const amrano = files[4];
  const turyado = files[5];

  tryRenderComponent("header", html`<${Header} />`, "styles/header.css");
  tryRenderComponent("footer", html`<${Footer} />`, "styles/footer.css");

  addStylesheet("styles/overlay.css");
  addStylesheet("styles/input-field.css");
  addStylesheet("styles/buttons.css");
  addStylesheet("styles/carousel.css");

  createRenderComponent(
    html`<${LocationScreen} cities=${cities} />`,
    "styles/location.css"
  );

  createRenderComponent(html`<${AuthScreen} />`, "styles/auth.css");

  tryRenderComponent(
    "slider",
    html`<${RangeSlider} min=${0} max=${100} />`,
    "styles/slider.css"
  );

  tryRenderComponent(
    "goods-carousel1",
    html`<${Carousel}>
      <${GoodPreview} good=${lere}/>
      <${GoodPreview} good=${lins}/>
      <${GoodPreview} good=${numo}/>
      <${GoodPreview} good=${amrano}/>
      <${GoodPreview} good=${turyado}/>
    </${Carousel}>`,
    "styles/goodPreview.css"
  );

  // createRenderComponent(
  //   html`
  //   <${Carousel} height=${300}>
  //     <img src="assets/images/lere.png"/>
  //     <img src="assets/images/lins.png"/>
  //     <img src="assets/images/Numo.png"/>
  //     <img src="assets/images/Turyado.png"/>
  //     <img src="assets/images/amrano.png"/>
  //   </${Carousel}>
  // `,
  //   "styles/carousel.css"
  // );
}

start();
