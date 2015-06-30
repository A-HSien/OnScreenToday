"use strict";
import { get } from "../utils/APIUtils";
var data = require("../../db");
import { _ } from "lodash";
import configSetting from "../config";

// Fetchr service to load the about data

export default {
  name: "contentDetail",

  read(req, resource, {slug, type}, config, done) {
  	var category = type;
  	var publishStat = configSetting.publishStatus;
  	get("/getContentDetailByType", {slug, category, publishStat}, done);
  }

};
