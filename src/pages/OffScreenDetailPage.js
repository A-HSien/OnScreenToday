"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";
import {composeContent} from "../utils/Common";
import Image from "../components/Image";

import _ from "lodash";


if (process.env.BROWSER) {
	require("../style/pages/ScreenDetail.scss");
}


class OffScreenDetailPage extends BaseComponent {

	constructor() {
		super();
	}
  static propTypes = {
	slug: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
    offscreenData: PropTypes.object.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }
  render() {
  	// debugger;
  		var {lang, offscreenData} = this.props;
		var hero = composeContent(offscreenData, lang);
		var contents = hero.contents;
		var jsxContent = <noscript />;

		// debugger;
		var jsxHero = (<div className="screen-content-container clearfix" >
			<div className="screen-content">
				
				<h2>{hero.title}</h2>
				<h3><i>{hero.subtitle}</i></h3>
				<div>
					<strong>By {hero.author}</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hero.createdAt}
				</div>
				
				<br></br>
				<div dangerouslySetInnerHTML={{__html: hero.article}}></div>
			</div>
		</div>);

		if (hero.heroImage && hero.heroImage.url) {
			jsxContent = (<div className="row">
				<div className="col-sm-6">
					<div className="screen-image" style={{backgroundImage: 'url(' +  hero.heroImage.url+ ')'}} ></div>
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

		return <div className="screen detail page ">
			<SubHeader />
			<div className="screen-detail-container">
				<div className="container">
					{jsxContent}
				</div>
			</div>

		</div>;
	}
}

OffScreenDetailPage = connectToStores(OffScreenDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	// console.log("ScreenshotDetailPage: ", props);
	var contentData = stores.ContentStore.getContentBySlug(props.slug);
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		offscreenData: contentData,
	};
});


export default OffScreenDetailPage;
