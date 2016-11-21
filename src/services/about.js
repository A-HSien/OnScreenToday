import { get } from "../utils/APIUtils";

// Fetchr service to load the about data
import data_about from '../../db/about.js';

export default {
  name: "about",

  read(req, resource, params, config, done) {
		get("/about", null, done);
  }

};
