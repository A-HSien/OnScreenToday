import React from "react";

// Add promise support for browser not supporting it
import es6Promise from "es6-promise";
es6Promise.polyfill();

window.debug = require("debug");

const debug = window.debug("onscreentoday");

const mountNode = document.getElementById("root");
const dehydratedState = window.App;

function renderApp() {

  const app = require("./app");

  debug("Rehydrating state...", dehydratedState);

  app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
      throw err;
    }

    debug("State has been rehydrated");

    const Application = app.getComponent();
    const data = context.getComponentContext();
    React.render(<Application context={data} />, mountNode, () => {
      debug("Application has been mounted");
    });
  });
}

renderApp();


