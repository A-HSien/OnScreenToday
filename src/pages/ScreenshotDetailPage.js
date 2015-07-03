"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";
import {composeContent} from "../utils/Common";


import _ from "lodash";


if (process.env.BROWSER) {
	require("../style/pages/ScreenshotDetail.scss");
}


class ScreenshotDetailPage extends BaseComponent {

	constructor() {
		super();
	}
  static propTypes = {
	slug: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
    screenshotData: PropTypes.object.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }
  render() {
  	// debugger;
  		var {lang, screenshotData} = this.props;
		var hero = composeContent(screenshotData, lang);
		var contents = hero.contents;
		var jsxContent = <noscript />;

		// debugger;
		var jsxHero = (<div className=" screenshot-content-container clearfix" >
			<div className="screenshot-content">
				
				<h2>{hero.title}</h2>
				<h3><i>{hero.subtitle}</i></h3>
				<div>
					<strong>By {hero.author}</strong>
				</div>
				
				<br></br>
				<div dangerouslySetInnerHTML={{__html: hero.article}}></div>
			</div>
		</div>);

		if (hero.heroImage && hero.heroImage.url) {
			jsxContent = (<div className="row">
				<div className="col-sm-6">
					<div className="screenshot-image" style={{backgroundImage: 'url(' +  hero.heroImage.url+ ')'}} ></div>
				</div>
				<div className="col-sm-6">
					{jsxHero}
				</div>
			</div>);
		} else {
			jsxContent = (<div className="row">
				{jsxHero}
			</div>);
		}

		return <div className="screenshot detail page ">
			<SubHeader />
			<div className="screenshot-detail-container">
				<div className="container">
					{jsxContent}
				</div>
			</div>

		</div>;
	}
}

ScreenshotDetailPage = connectToStores(ScreenshotDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	// console.log("ScreenshotDetailPage: ", props);
	var contentData = stores.ContentStore.getContentBySlug(props.slug);
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		screenshotData: contentData,
	};
});


export default ScreenshotDetailPage;
