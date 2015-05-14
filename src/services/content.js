import { get } from "../utils/APIUtils";

var data = require("../../db");

// Fetchr service to load the about data

export default {
  name: "content",

  read(req, resource, {type}, config, done) {
    const options = {
      locale: req.locale
    };

    // console.log("services/about.js: ", data_about);
    done(null, data[type]);
  }

};
