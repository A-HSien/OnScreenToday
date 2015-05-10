// Fetchr service to load the language data


var ls = {};
var KEY = "screen-lang";

export default {
  name: "lang",

  read(req, resource, params, config, done) {

    var val = ls[KEY];
    if (!val) {
      val = {lang: "eng"};
    }
    // console.log("services/language.js: ", data_about);
    done(null, val);
  },

  update(req, resource, params, body, config, done) {

    ls[KEY] = body;
    done(null, body)
  }

  //update: function(req, resource, params, body, config, callback) {}
};
