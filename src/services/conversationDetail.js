"use strict";
var data_conversation = require('../../db/conversation.js');

// Fetchr service to load the about data

export default {
  name: "conversationDetail",

  read(req, resource, {slug}, config, done) {

  	var conversation = _.filter(data_conversation, function (item) {
			console.log(item.slug);

			return item.slug === slug;
		});
    // console.log("services/about.js: ", data_about);
    done(null, conversation);
  }

};
