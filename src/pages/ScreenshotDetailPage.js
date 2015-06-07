"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";


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

  		var {lang, screenshotData} = this.props;
		var hero = screenshotData[lang];
		var contents = hero.contents;
		var jsxVideo = {};

		var jsxDivs = contents.map((c)=>{
			if (c.content) {
				return <div dangerouslySetInnerHTML={{__html: c.content.html}}></div>;
			} else {
				return <noscript />;
			}
		});

		// debugger;
		var jsxHero = (<div className=" screenshot-content-container clearfix" >
			<div className="screenshot-content">
				
				<h2>{hero.title}</h2>
				<h3>{hero.subtitle}</h3>
				<div>
					<strong>By {hero.author}</strong>
				</div>
				
				<br></br>
				{jsxDivs}
			</div>
		</div>);

		if (hero.videos && hero.videos.length) {
			jsxVideo = <div className="conversation-video" dangerouslySetInnerHTML={{__html: hero.videos[0].embedHTML}} ></div>;
		}


		return <div className="screenshot detail page ">
			<SubHeader />
			<div className="screenshot-detail-container">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="screenshot-image" style={{backgroundImage: 'url(' + hero.heroImage.url + ')'}} ></div>
							<div className="caption" dangerouslySetInnerHTML={{__html: hero.heroImage.captions}}></div>
						</div>
						<div className="col-sm-6">
							{jsxHero}
							{jsxVideo}
						</div>
					</div>
				</div>
			</div>

		</div>;
	}
}

ScreenshotDetailPage = connectToStores(ScreenshotDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	debugger;
	console.log("ScreenshotDetailPage: ", props);
	var contentData = stores.ContentStore.getContentBySlug(props.slug);
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		screenshotData: contentData,
	};
});


export default ScreenshotDetailPage;
