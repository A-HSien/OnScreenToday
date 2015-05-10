"use strict";
module.exports = API;

var data_conversation = require('../db/conversation.js');
var data_screenshot = require('../db/screenshot.js');
var data_view = require('../db/view.js');
var data_user = require('../db/user.js');
var data_about = require('../db/about.js');
var data_tunedin = require('../db/tunedin.js');
var _ = require('lodash');

function API (app) {
	

	/*==========  API  ==========*/
	app.get('/api/v1/conversations', function(req, res, next) {
		res.status(200).send(data_conversation);
	});

	app.get('/api/v1/conversation', function(req, res, next) {
		var conversation = _.filter(data_conversation, function (item) {
			console.log(item.slug);

			return item.slug === req.query.slug;
		});
		res.status(200).send(conversation[0]);
	});

	app.get('/api/v1/screenshot', function(req, res, next) {
		var screenshot = _.filter(data_screenshot, function (item) {
			return parseInt(item.id, 10) === parseInt(req.query.id, 10);
		});
		res.status(200).send(screenshot[0]);
	});

	app.get('/api/v1/screenshots', function(req, res, next) {
		res.status(200).send(data_screenshot);
	});

	app.get('/api/v1/views', function(req, res, next) {
		res.status(200).send(data_view);
	});

	app.get('/api/v1/view', function(req, res, next) {
		var view = _.filter(data_view, function (item) {
			return parseInt(item.id, 10) === parseInt(req.query.id, 10);
		});
		res.status(200).send(view[0]);
	});

	app.get('/api/v1/tunedins', function(req, res, next) {
		res.status(200).send(data_tunedin);
	});

	

	app.get('/api/v1/user/:id', function(req, res, next) {
		var params = req.params;
		res.status(200).send(data_user[params.id]);

	});

	app.get('/api/v1/about', function(req, res, next) {
		res.status(200).send(data_about);

	});

	app.get('/api/v1/lang', function(req, res, next) {
		console.log("lang");
		res.status(200).send({
			lang: "eng"
		});

	});


	// Note: the "/*" is necessary here for 'react-route' 
	// app.get('/*', function(req, res, next) {
		// res.render("pages/home");
	// });

}