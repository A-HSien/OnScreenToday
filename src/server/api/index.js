"use strict";

import API_v1 from "./v1";
const debug = require("debug")("onscreentoday");
const URL_NAMESPACE = "/api";
const API_VERSION_1 = "/v1";

const API = (app) => {
  debug("API");

  app.namespace(URL_NAMESPACE, function (req, res, next) {
    
    app.namespace(API_VERSION_1, function(req, res, next) {
      API_v1(app);
    });
  });


};

export default API;