import { get } from "../utils/APIUtils";
var data_conversation = require('../../db/conversation.js');

// Fetchr service to load the about data

export default {
  name: "conversation",

  read(req, resource, params, config, done) {
    const options = {
      locale: req.locale
    };

    // console.log("services/about.js: ", data_about);
    done(null, data_conversation);
  }

};
