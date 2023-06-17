"use strict";

import { render } from "https://esm.sh/preact";
import html from "../html.js";
import database from "../database.js";
import profile from "../Storage/profileData.js";

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

const logOut = () => {
  profile.logOut();
  window.location.href = "./index.html";
};

async function start() {
  await database.initialization;
  pasteRenderComponent(
    "profile-buttons",
    html`
      <div class="profile-categories">
        <div class="profile-category-button current">Личный кабинет</div>
        <div class="profile-category-button">Мои заказы</div>
      </div>
    `
  );

  pasteRenderComponent(
    "profile-content",
    html`
      <div class="profile-panel">
        <div class="profile-panel-title">Профиль</div>
        <div class="profile-panel-data">
          <div>
            ${profile.data.current.name} ${profile.data.current.surname}
          </div>
          <div>${profile.data.current.mail}</div>
          <div>${profile.data.current.phone}</div>
        </div>
        <div class="profile-exit" onClick=${logOut}>Выйти</div>
      </div>
    `
  );
}

start();
