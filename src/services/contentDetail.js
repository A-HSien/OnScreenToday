"use strict";
var data = require("../../db");
import { _ } from "lodash";

// Fetchr service to load the about data

export default {
  name: "contentDetail",

  read(req, resource, {slug, type}, config, done) {

  	var _data = data[type];
  	var result = _.find(_data, function (item) {
			console.log(item.slug);

			return item.slug === slug;
		});
    done(null, result);
  }

};
