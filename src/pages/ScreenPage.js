"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import Image from "../components/Image";
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

  		var {lang, fullscreenData, offscreenData, AdsData} = this.props;
  		var fullscreenContents = fullscreenData.map((c) => {
			return composeContent(c, lang);
		});
		var offscreenContents = offscreenData.map((c) => {
			return composeContent(c, lang);
		});
		var AdsContents = AdsData.map((c) => {
			return composeContent(c, lang);
		});

		var jsx = <noscript />;
		var fullscreen = <noscript />;
		var offscreen = <noscript />;
		if (fullscreenContents.length) {
			var fullscreenList = fullscreenContents.slice(0,2);
			var offscreenList = offscreenContents;

			if (fullscreen && fullscreen.length) {
				//fullscreen = createLink(fullscreenList, 1, 'screen');
			}

			if (offscreenList && offscreenList.length) {
				offscreen = createGroupList(offscreenList, 2, 'screen');
			}


			jsx = <div className="screen page">
				<SubHeader />
				<div className="screen-page-main-container">
					<div className="container">
						<div className="col-sm-9">

							<div className="row screen-page-fullscreen">
								<div className="screen-hero-header">
									<strong>FULL SCREEN</strong>
								</div>
								<div key={fullscreenList[0].title} className="screen-list-item col-sm-12" >
									<NavLink href={fullscreenList[0].subtitle} target="blank" className="screen-item-link">

					                    <div className="screen-image" style={{backgroundImage: "url(" +fullscreenList[0].heroImage.url+ ")"}}></div>
										<div className="screen-title"><strong>{fullscreenList[0].title}</strong></div>
										<div className="screen-time">{fullscreenList[0].createdAt}</div>
									</NavLink>
								</div>
								<div key={fullscreenList[1].title} className="screen-list-item col-sm-12" >
									<NavLink href={fullscreenList[1].subtitle} target="blank" className="screen-item-link">

					                    <div className="screen-image" style={{backgroundImage: "url(" +fullscreenList[1].heroImage.url+ ")"}}></div>
										<div className="screen-title"><strong>{fullscreenList[1].title}</strong></div>
										<div className="screen-time">{fullscreenList[1].createdAt}</div>
									</NavLink>
								</div>
								<div className="screen-hero-footer">
								</div>
							</div>
							<div className="row screen-page-offscreen">
								<div className="screen-offscreen-header">
									<strong>OFF SCREEN</strong>
								</div>
								{offscreen}
							</div>
						</div>
						<div className="col-sm-3">
							<div className="row">
								<div className="col-xs-12 col-sm-10 col-sm-offset-2">
								<HomeAds ads={AdsContents} />
								</div>
							</div>
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