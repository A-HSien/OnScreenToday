"use strict"

import { get } from "../utils/APIUtils";

// Fetchr service to load the content data
export default {
  name: "content",

  read(req, resource, {type}, config, done) {
  	var category = type;
    get("/getContentByType", {category}, done);
  }

};
