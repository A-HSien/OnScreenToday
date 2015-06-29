"use strict";
import { get } from "../utils/APIUtils";
var data = require("../../db");
import { _ } from "lodash";

// Fetchr service to load the about data

export default {
  name: "contentDetail",

  read(req, resource, {slug, type}, config, done) {
  	var category = type;
  	get("/getContentDetailByType", {slug, category}, done);
  }

};
