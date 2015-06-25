/**
 * [mongo description] For db
 * @type {[type]}
 */
var mongo = require('mongoskin');

var dbcfg = {
	user: "screen",
	password: '2015screen',
	url: 'dogen.mongohq.com:10023/screen'
};

module.exports = mongo.db(
	'mongodb://'
	+dbcfg.user
	+':'
	+dbcfg.password
	+'@'
	+dbcfg.url
	);