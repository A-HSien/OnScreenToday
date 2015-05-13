"use strict";
var data_conversation = require('../../db/conversation.js');
import { _ } from "lodash";

// Fetchr service to load the about data

export default {
  name: "conversationDetail",

  read(req, resource, {slug}, config, done) {

  	var conversation = _.find(data_conversation, function (item) {
			console.log(item.slug);

			return item.slug === slug;
		});
    // console.log("services/about.js: ", data_about);
    done(null, conversation);
  }

};
