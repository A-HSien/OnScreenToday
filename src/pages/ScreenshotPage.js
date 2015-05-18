"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import Image from "../components/Image";


import _ from "lodash";

if (process.env.BROWSER) {
  require("../style/pages/Screenshot.scss");
}


class ScreenshotPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	lang: PropTypes.string.isRequired,
    screenshots: PropTypes.array.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {

  		var {screenshots, lang} = this.props;
		var jsx = <noscript />;
		if (screenshots.length) {
			var cloned = _.clone(screenshots);
			var hero = cloned.slice(0,1)[0][lang];

			var jsxHero = (<div className="screenshot-hero row clearfix" >
				<NavLink href={hero.url} >
				<Image imageUrl={hero.heroImage.url} extraClassnames="screenshot-image" />
				<div className="screenshot-hero-title">{hero.title}</div>
				</NavLink>
			</div>);


			jsx = <div className="screenshot page">
				<SubHeader />
				<div className="screenshot-page-main-container">
					<div className="container">
						<div className="screenshot-page-hero">
							{jsxHero}
						</div>
						<div className="screenshot-page-main">
						</div>
					</div>
				</div>
			</div>;
		} 

		return jsx;
	}

	createGroupList(items, n) {
		var jsxRow = [],
			jsxItems = [],
			item;

		for(var i = 0; i < items.length; i++) {
			item = items[i];
			if (i % n === 0 && i !== 0) {
				jsxRow.push(<div key={i}  className="row screenshot-list-row">
					{jsxItems}
				</div>);

				jsxItems = [];
			}

			jsxItems.push(<div key={item.title} className={"screenshot-list-item " + "col-sm-"+ 12/n} >
				<Link to={item.url} className="screenshot-item-link">
					<div className="screenshot-item-header">
					</div>
                    {(item.img_hero && item.img_hero.length)? <div className="screenshot-image" style={{backgroundImage: "url(" +item.img_hero+ ")"}}></div> : <noscript />}
					<div className="screenshot-title">{item.title}</div>
				</Link>
			</div>);

		}

		if (jsxItems.length) {
			jsxRow.push(<div key={jsxItems.length}  className="row screenshot-list-row">
					{jsxItems}
				</div>);
		}


		return jsxRow;
	}


}

ScreenshotPage = connectToStores(ScreenshotPage, ["ContentStore", "LanguageStore"], (stores) => {
	debugger;
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		screenshots: contentData,
	};
});

export default ScreenshotPage;