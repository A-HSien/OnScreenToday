"use strict";

import _ from "lodash";

const CommonUtils = {

	composeContent(item, lang) {
		// console.log("composeContent item:", item);
		if (_.isArray(item)) {
			item = item[0];
		}
		var type = item.category.key;
		var nameKey = lang === "eng" ? "name" : "name_" + lang;
		var name = item.author[nameKey]; 

		console.log("composeContent name: ", name);

		return _.extend({
			url: "/" + type + "/" + item.slug,
			heroImage: item.heroImage[0],
			images: item.heroImage,
			author: name.first + " " + name.last,
			type: item.type 
		}, item['content'][lang]);
	}

}

export default CommonUtils;
