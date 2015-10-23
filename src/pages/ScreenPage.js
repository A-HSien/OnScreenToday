"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import Image from "../components/Image";
import {composeContent, createGroupList} from "../utils/Common";


import _ from "lodash";

if (process.env.BROWSER) {
  require("../style/pages/Screen.scss");
}


class ScreenPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	lang: PropTypes.string.isRequired,
    fullscreenData: PropTypes.array.isRequired,
    offscreenData: PropTypes.array.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {

  		var {lang, fullscreenData, offscreenData} = this.props;
  		var fullscreenContents = fullscreenData.map((c) => {
			return composeContent(c, lang);
		});
		var offscreenContents = offscreenData.map((c) => {
			return composeContent(c, lang);
		});
		var jsx = <noscript />;
		if (fullscreenContents.length) {
			var fullscreenList = fullscreenContents.slice(0,2);
			var offscreenList = offscreenContents;

			if (fullscreenList && fullscreenList.length) {
				fullscreen = createGroupList(fullscreenList, 1, 'fullscreen');
			}

			if (offscreenList && offscreenList.length) {
				offscreen = createGroupList(offscreenList, 2, 'offscreen');
			}


			jsx = <div className="screen page">
				<SubHeader />
				<div className="screen-page-main-container">
					<div className="container">
						<div className="col-sm-8">
							<div className="screen-page-fullscreen">
								{fullscreen}
							</div>
							<div className="screen-page-offscreen">
								{offscreen}
							</div>
						</div>
					</div>
				</div>
			</div>;
		} 

		return jsx;
	}

	// createGroupList(items, n) {
	// 	var jsxRow = [],
	// 		jsxItems = [],
	// 		item;


	// 	for(var i = 0; i < items.length; i++) {
	// 		item = items[i];
	// 		if (i % n === 0 && i !== 0) {
	// 			jsxRow.push(<div key={i}  className="row screenshot-list-row">
	// 				{jsxItems}
	// 			</div>);

	// 			jsxItems = [];
	// 		}

	// 		jsxItems.push(<div key={item.title} className={"screenshot-list-item " + "col-sm-"+ 12/n} >
	// 			<NavLink href={item.url} className="screenshot-item-link">
	// 				<div className="screenshot-item-header">
	// 				</div>
 //                    {(item.heroImage)? <div className="screenshot-image" style={{backgroundImage: "url(" +item.heroImage.url+ ")"}}></div> : <noscript />}
	// 				<div className="screenshot-title">{item.title}</div>
	// 			</NavLink>
	// 		</div>);

	// 	}

	// 	if (jsxItems.length) {
	// 		jsxRow.push(<div key={jsxItems.length}  className="row screenshot-list-row">
	// 				{jsxItems}
	// 			</div>);
	// 	}


	// 	return jsxRow;
	// }


}

ScreenshotPage = connectToStores(ScreenPage, ["ContentStore", "LanguageStore"], (stores) => {
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		fullscreenData: _.filter(contentData, function(content) {return content.category.key === 'fullscreen'}),
		offscreenData: _.filter(contentData, function(content) {return content.category.key === 'offscreen'})

	};
});

export default ScreenshotPage;
