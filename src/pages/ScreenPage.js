"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import Image from "../components/Image";
import Hero from '../components/Hero';
import {composeContent, createGroupList} from "../utils/Common";
import HomeAds from './home/Ads';

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
    offscreenData: PropTypes.array.isRequired,
		AdsData: PropTypes.array.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		var {lang, offscreenData, AdsData} = this.props;

		// FIXME: Do this for everything in the API
		offscreenData = offscreenData.sort((a, b) => {
			return Date.parse(a.createdAt) < Date.parse(b.createdAt);
		});

		var offscreenContents = offscreenData.map((c) => {
			return composeContent(c, lang);
		});

		var jsx = <noscript />;
		var offscreen = <noscript />;
		if (offscreenContents.length) {
			offscreen = createGroupList(offscreenContents, 2, 'screen');
			var heroContent = offscreenContents.slice(0,1)[0];
			var jsxHero = (
				<Hero
					contentUrl={heroContent.url}
					imageUrl={heroContent.heroImage.url}
					title={heroContent.type}
					subtitle={heroContent.title}
					description={heroContent.description}
				/>
			);


			jsx = <div className="screen page">
				<SubHeader />
				<div className="screen-page-main-container">
					<div className="container">
						<div>
							{jsxHero}
						</div>
						<div className="row screen-page-offscreen container">
							{offscreen.slice(1)}
						</div>
					</div>
				</div>
			</div>;
		} 

		return jsx;
	}
}

ScreenPage = connectToStores(ScreenPage, ["ContentStore", "LanguageStore"], (stores) => {
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		fullscreenData: _.filter(contentData, function(content) {return content.category.key === 'fullscreen'}),
		offscreenData: _.filter(contentData, function(content) {return content.category.key === 'offscreen'}),
		AdsData: _.filter(contentData, function(content) {return content.category.key === 'advertisement'})
	};
});

export default ScreenPage;
