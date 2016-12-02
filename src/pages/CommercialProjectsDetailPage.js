"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";
import {composeContent} from "../utils/Common";
import SocialButtons from '../components/SocialButtons';

import _ from "lodash";


if (process.env.BROWSER) {
	require("../style/pages/CommercialProjectsDetail.scss");
}


class CommercialProjectsDetailPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	slug: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
    commercialProjectData: PropTypes.object.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {

  	var {lang, commercialProjectData} = this.props;

		var hero = composeContent(commercialProjectData, lang);
		// debugger;
		var jsxHero = (<div className="commercial-project-content-container clearfix" >
			<div className="commercial-project-content">
				
				<h2>{hero.title}</h2>
				<div className="content-meta">
					<strong>By {hero.author}</strong>
					<div>{hero.createdAt}</div>
					<SocialButtons/>
				</div>
				
				<br></br>
				<div dangerouslySetInnerHTML={{__html: hero.article}}></div>
			</div>
		</div>);
		var jsxContent;

		if (hero.heroImage && hero.heroImage.url) {
			jsxContent = (
				<div className="row">
					<div className="commercial-project-image" style={{backgroundImage: 'url(' + hero.heroImage.url + ')'}} ></div>
					<div className="commercial-project-image-caption" dangerouslySetInnerHTML={{__html: hero.heroImage.caption}}></div>
					{jsxHero}
				</div>
			);
		}
		else {
			jsxContent = (
				<div className="row">
					{jsxHero}
				</div>
			);
		}

		return <div className="commercial-project detail page ">
			<SubHeader />
			<div className="commercial-project-detail-container">
				<div className="container-narrow">
					{jsxContent}
				</div>
			</div>

		</div>
	}
}

CommercialProjectsDetailPage = connectToStores(CommercialProjectsDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	// console.log("ViewDetailPage: ", props);
	var contentData = stores.ContentStore.getContentBySlug(props.slug);
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		commercialProjectData: contentData,
	};
});


export default CommercialProjectsDetailPage;
