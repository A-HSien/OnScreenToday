import { get } from "../utils/APIUtils";
import data_about from '../../db/about.js';

// Fetchr service to load the about data

export default {
  name: "about",

  read(req, resource, params, config, done) {
    const options = {
      locale: req.locale
    };

    // console.log("services/about.js: ", data_about);
    done(null, data_about);
  }

};
