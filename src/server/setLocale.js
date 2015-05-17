// Express middleware to overwrite the locale from cookie or querystring

import config from "../config";

const debug = require("debug")("isomorphic500");

const setLocale = (req, res, next) => {
  debug("Detected locale (from browser) is %s", req.locale);

  // Locale can be changed by passing ?lang=<locale> in the querystring

  if (req.query.lang) {
    // But only the supported ones!
    if (config.locales.indexOf(req.query.lang) > -1) {
      req.locale = req.query.lang;
      debug("Locale has been set from querystring: %s", req.locale);
    }
  }

  // Or by setting a `lang` cookie
  else if (req.cookies.lang) {
    if (config.locales.indexOf(req.cookies.lang) > -1) {
      req.locale = req.cookies.lang;
      debug("Locale has been set from cookie: %s", req.locale);
    }
  }

  next();
};

export default setLocale;
