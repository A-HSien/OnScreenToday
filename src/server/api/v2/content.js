/*===========================================
=            API for the content            =
===========================================*/
"use strict";

import ContentModelDB from "'../../../../mongodb/db-content.js'";
import ContentCategoryModelDB from "'../../../../mongodb/db-category.js'";


const CONTENT_TYPE_CONVERSATION = 'conversation';

const ContentAPI = {

	getContent: function(req, res, next) {
		var type = req.query.type;
		var categoryId;

		if (type) {
			ContentCategoryModelDB.findData({
				key: type
			}, {}, function(err, items) {
				if (items.length) {
					categoryId = items[0]._id;
					
				}
			});
		} else {
			res.status(406).send("The data type is not specified.");
		}
	}
};

export default ContentAPI;
/*-----  End of API for the content  ------*/

