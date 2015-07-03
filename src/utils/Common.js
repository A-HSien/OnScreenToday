"use strict";

import _ from "lodash";
import React, { PropTypes, Component } from "react";
import { NavLink } from "flux-router-component";

const CommonUtils = {

	composeContent(item, lang) {
		// console.log("composeContent item:", item);
		if (_.isArray(item)) {
			item = item[0];
		}
		var defaultData = {
			url: "#",
			heroImage: {},
			images: [],
			author: "",
			type: "",
			article: "",
			keywords: "",
			subtitle: "",
			title: ""
		};
		var composed = {};
		var type = _.get(item, 'category.key');
		var nameKey = lang === "eng" ? "name" : "name_" + lang;
		var name = item.author[nameKey]; 
		
		composed = _.extend({
			url: "/" + type + "/" + item.slug,
			heroImage: item.heroImage ? item.heroImage[0] : undefine,
			images: item.heroImage,
			author: name.first + " " + name.last,
			type: item.type 
		}, item['content'][lang]);
		// console.log("composeContent name: ", name);

		return _.extend(defaultData, composed);
	},

	createGroupList(items, n, type) {
		var jsxRow = [],
			jsxItems = [],
			item;


		for(var i = 0; i < items.length; i++) {
			item = items[i];
			if (i % n === 0 && i !== 0) {
				jsxRow.push(<div key={i}  className={"row " + type + "-list-row"}>
					{jsxItems}
				</div>);

				jsxItems = [];
			}

			jsxItems.push(<div key={item.title} className={type+"-list-item " + "col-sm-"+ 12/n} >
				<NavLink href={item.url} className={type+ "-item-link"}>
					<div className={type+ "-item-header"}>
					</div>
                    {(item.heroImage)? <div className={type + "-image"} style={{backgroundImage: "url(" +item.heroImage.url+ ")"}}></div> : <noscript />}
					<div className={type + "-title"}>{item.title}</div>
				</NavLink>
			</div>);

		}

		if (jsxItems.length) {
			jsxRow.push(<div key={jsxItems.length}  className={"row "+ type + "-list-row"}>
					{jsxItems}
				</div>);
		}


		return jsxRow;
	}

}

export default CommonUtils;
