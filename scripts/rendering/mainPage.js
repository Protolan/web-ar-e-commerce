"use strict";

import { render } from "https://esm.sh/preact";
import html from "../html.js";
import { Carousel } from "../../components/carousel.js";
import { GoodPreview } from "../../components/goodPreview.js";
import database from "../database.js";

function addStylesheet(cssPath) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = cssPath;
  document.head.appendChild(linkElement);
}

function pasteRenderComponent(pasteID, Component) {
  const element = document.getElementById(pasteID);
  if (element) {
    render(Component, element);
  }
}

async function start() {
  addStylesheet("styles/goodPreview.css");
  addStylesheet("styles/carousel.css");
  await database.initialization;
  const goods = database.goods;
  pasteRenderComponent(
    "goods-carousel1",
    html`<${Carousel}>
          <${GoodPreview} good=${goods.lere}/>
          <${GoodPreview} good=${goods.lins}/>
          <${GoodPreview} good=${goods.numo}/>
          <${GoodPreview} good=${goods.amrano}/>
          <${GoodPreview} good=${goods.turyado}/>
        </${Carousel}>`
  );
  pasteRenderComponent(
    "goods-carousel2",
    html`<${Carousel}>
          <${GoodPreview} good=${goods.turyado}/>
          <${GoodPreview} good=${goods.lere}/>
          <${GoodPreview} good=${goods.lins}/>
          <${GoodPreview} good=${goods.numo}/>
          <${GoodPreview} good=${goods.amrano}/>
        </${Carousel}>`
  );
  pasteRenderComponent(
    "goods-carousel3",
    html`<${Carousel}>
          <${GoodPreview} good=${goods.lere}/>
          <${GoodPreview} good=${goods.lins}/>
          <${GoodPreview} good=${goods.numo}/>
          <${GoodPreview} good=${goods.amrano}/>
          <${GoodPreview} good=${goods.turyado}/>
        </${Carousel}>`
  );
}

start();
