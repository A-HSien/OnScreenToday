/**
 * [mongo description] For db
 * @type {[type]}
 */
var mongo = require('mongoskin');

var dbcfg = {
	user: "screen",
	password: 'gQfvKhXB0wdaG181',
	url: 'screen-shard-00-00-0sm2g.mongodb.net:27017,screen-shard-00-01-0sm2g.mongodb.net:27017,screen-shard-00-02-0sm2g.mongodb.net:27017/admin?ssl=true&replicaSet=Screen-shard-0&authSource=admin'
};

module.exports = mongo.db(
	'mongodb://'
	+dbcfg.user
	+':'
	+dbcfg.password
	+'@'
	+dbcfg.url
	);
