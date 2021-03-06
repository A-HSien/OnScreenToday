// Utils to send requests to the 500px API endpoint

import request from "superagent";
import { assign } from "lodash";

import config from "../config";

const debug = require("debug")("onscreentoday");

const APIUtils = {

  get(endpoint, query, done) {
    if (arguments.length === 2) {
      done = query;
      query = {};
    }

    const url = `${config.apiRoot}${endpoint}`;

    debug("Sending GET request to %s", url, query);

    // Customer key is required by the API
    // query = assign(query, {
    //   "api_key": config.apiKey
    // });

    // query = assign(query, {
    //   "consumer_key": config.consumerKey
    // });

    // console.log("APIUtils url", url);
    request.get(url)
      .query(query)
      .end((err, res) => {
        debug("Received response %s from %s", res, url);

        if (err) {
          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status;
          }

          return done(err);
        }
        if (res) {
          done(null, res.body);
        } else {
          done(null, "an empty response");
        }
      });
  }

};

export default APIUtils;
