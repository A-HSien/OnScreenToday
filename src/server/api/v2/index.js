"use strict";

import data_about from '../../../../db/about.js';
import _ from "lodash";
var data = require("../../../../db");

const API_v2 = (app) => {

	app.namespace("/content", function(req, res, next) {
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

	app.namespace("/contentDetail", function(req, res, next) {
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

	app.namespace("/about", function(req, res, next) {
		app.get("/", function(req, res, next) {
		  res.status(200).send(data_about);
		});
	});
}

export default API_v2;