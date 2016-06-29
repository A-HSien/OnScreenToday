import { get } from "../utils/APIUtils";

// Fetchr service to load the about data
import data_about from '../../db/about.js';

export default {
  name: "about",

  read(req, resource, params, config, done) {
    console.log("service read about:", data_about);
  	done(null, data_about);

  	// get("/about", null, done);
  }

};
