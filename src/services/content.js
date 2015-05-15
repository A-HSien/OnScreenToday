import { get } from "../utils/APIUtils";

var data = require("../../db");

// Fetchr service to load the about data

export default {
  name: "content",

  read(req, resource, {type}, config, done) {
    const options = {
      locale: req.locale
    };

    if (type !== "all") {
    	done(null, data[type]);
	} else {
		done(null, data);
	}
  }

};
