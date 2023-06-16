"use strict";

import { render } from "https://esm.sh/preact";
import html from "../html.js";
import { Header } from "../../components/header.js";
import { Footer } from "../../components/footer.js";
import { LocationScreen } from "../../components/locationScreen.js";
import { AuthScreen } from "../../components/authScreen.js";
import database from "../database.js";

function addStylesheet(cssPath) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = cssPath;
  document.head.appendChild(linkElement);
}

function createRenderComponent(Component) {
  const element = document.createElement("div");
  render(Component, element);
  return element;
}

async function start() {
  addStylesheet("styles/overlay.css");
  addStylesheet("styles/input-field.css");
  addStylesheet("styles/buttons.css");
  addStylesheet("styles/header.css");
  addStylesheet("styles/footer.css");
  addStylesheet("styles/location.css");
  addStylesheet("styles/auth.css");
  await database.initialization;
  document.body.append(
    createRenderComponent(html`<${LocationScreen} cities=${database.cities} />`)
  );
  document.body.append(createRenderComponent(html`<${AuthScreen} />`));
  document.body.prepend(createRenderComponent(html`<${Header} />`));
  document.body.append(createRenderComponent(html`<${Footer} />`));
}

start();
