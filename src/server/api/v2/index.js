"use strict";

import data_about from '../../../../db/about.js';
import _ from "lodash";
var mcache = require('memory-cache');
var data = require("../../../../db");

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    console.log("cache key", key);
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

const API_v2 = (app) => {

	app.namespace("/content", cache(10), function(req, res, next) {
		app.get("/", function(req, res, next) {
			var type = req.query.type;
			if (type) {
				if (data[type]) {
					res.status(200).send(data[type]);
				} else if (type === "all") {
					res.status(200).send(data);
				} else {
					res.status(404).send("Can't find the data according to the type.");
				}
			} else {
				res.status(406).send("The data type is not specified.");
			}
		});
	});

	app.namespace("/contentDetail", cache(10), function(req, res, next) {
		app.get("/", function(req, res, next) {
			var type = req.query.type;
			var slug = req.query.slug;
			var content = data[type];

			var result = _.find(content, function (item) {
				return item.slug === slug;
			});

			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send("null");
			}
		});
	});

	app.namespace("/about", cache(10), function(req, res, next) {
		app.get("/", function(req, res, next) {
		  res.status(200).send(data_about);
		});
	});
}

export default API_v2;