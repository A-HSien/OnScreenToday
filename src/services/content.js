"use strict"

import { get } from "../utils/APIUtils";
import configSetting from "../config";

// Fetchr service to load the content data
export default {
  name: "content",

  read(req, resource, {type}, config, done) {
  	var category = type;
  	var publishStat = configSetting.publishStatus;
    get("/getContentByType", {category, publishStat}, done);
  }

};
