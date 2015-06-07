import { get } from "../utils/APIUtils";

// Fetchr service to load the about data

export default {
  name: "about",

  read(req, resource, params, config, done) {

  	get("/about", null, done);
  }

};
