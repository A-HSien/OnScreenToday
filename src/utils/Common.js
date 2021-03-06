"use strict";

import _ from "lodash";
import React, { PropTypes, Component } from "react";
import { NavLink } from "flux-router-component";

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

const CommonUtils = {

	composeContent(item, lang) {
		var composed = {};
		var defaultData = {
			url: "#",
			heroImage: {},
			images: [],
			author: "",
			type: "",
			article: "",
			keywords: "",
			subtitle: "",
			title: "",
			createdAt: ""
		};
		// console.log("item: ", item);
		if (_.isArray(item)) {
			item = item[0];
		}

		if (item) {
			var type = _.get(item, 'category.key');
			var nameKey = lang === "eng" ? "name" : "name_" + lang;
			var name = _.get(item, "author." + nameKey);
			var time = new Date(item.createdAt);
			var year = time.getFullYear();
			var month = checkTime(time.getMonth() + 1);
			var date = checkTime(time.getDate());
			//var hour = checkTime(time.getHours());
			//var minute = checkTime(time.getMinutes());
			//var second = checkTime(time.getSeconds());
			//var ap = (hour>11)?"PM":"AM";

			composed = _.extend({
				url: "/" + type + "/" + item.slug,
				heroImage: item.heroImage ? item.heroImage[0] : undefine,
				images: item.heroImage,
				author: _.get(name, 'first') + " " + _.get(name, "last"),
				type: item.type,
				createdAt: year + "-" + month + "-" + date
			}, item['content'][lang]);
		}

		//console.log("composed data: ", composed);

		return _.extend(defaultData, composed);
	},

	createGroupList(items, n, type) {
		var jsxRow = [],
			jsxItems = [],
			item;

		for (var i = 0; i < items.length; i++) {
			item = items[i];
			if (i % n === 0 && i !== 0) {
				jsxRow.push(<div key={i} className={"row " + type + "-list-row"}>
					{jsxItems}
				</div>);

				jsxItems = [];
			}

			jsxItems.push(<div key={item.title} className={type + "-list-item " + "col-sm-" + 12 / n} >
				<NavLink href={item.url} className={type + "-item-link"}>
					<div className={type + "-item-header"}>
					</div>
					{(item.heroImage) ? <div className={type + "-image"} style={{ backgroundImage: "url(" + item.heroImage.url + ")" }}></div> : <noscript />}
					<div className={type + "-title"}><strong>{item.title}</strong></div>
					<div className={type + "-subtitle"}>{item.subtitle}</div>
					<div className={type + "-time"}>{item.createdAt}</div>
					<div className={type + "-item-footer"}>
					</div>
				</NavLink>
			</div>);

		}

		if (jsxItems.length) {
			jsxRow.push(<div key={items.length} className={"row " + type + "-list-row"}>
				{jsxItems}
			</div>);
		}


		return jsxRow;
	}

}

export default CommonUtils;
