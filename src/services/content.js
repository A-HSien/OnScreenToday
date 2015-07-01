"use strict"

import { get } from "../utils/APIUtils";
import configSetting from "../config";
import data_tunedin from '../../db/tunedin.js';
import data_callforartist from '../../db/callforartist.js';

// Fetchr service to load the content data
export default {
  name: "content",

  read(req, resource, {type}, config, done) {
  	var category = type;
  	var publishStat = configSetting.publishStatus;

  	if (type === 'tunedin') {
  		// console.log("data_tunedin: ", data_tunedin);
  		done(null, data_tunedin);
  	} else if (type === 'callforartist') {
  		done(null, data_callforartist);
  	} else {
    	get("/getContentByType", {category, publishStat}, done);
  	}
  }

};
