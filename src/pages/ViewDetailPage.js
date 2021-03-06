"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";
import {composeContent} from "../utils/Common";
import SocialButtons from '../components/SocialButtons';


import _ from "lodash";


if (process.env.BROWSER) {
	require("../style/pages/ViewDetail.scss");
}


class ViewDetailPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	slug: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
    viewData: PropTypes.object.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {

  		var {lang, viewData} = this.props;

		var hero = composeContent(viewData, lang);
		// debugger;
		var jsxHero = (<div className=" view-content-container clearfix" >
			<div className="view-content">
				
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


		return <div className="view detail page ">
			<SubHeader />
			<div className="view-detail-container">
				<div className="container-narrow">
					<div className="row">
							<div className="view-image" style={{backgroundImage: 'url(' + hero.heroImage.url + ')'}} ></div>
							<div className="view-image-caption" dangerouslySetInnerHTML={{__html: hero.heroImage.caption}}></div>
							{jsxHero}
					</div>
				</div>
			</div>

		</div>
	}
}

ViewDetailPage = connectToStores(ViewDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	// console.log("ViewDetailPage: ", props);
	var contentData = stores.ContentStore.getContentBySlug(props.slug);
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		viewData: contentData,
	};
});


export default ViewDetailPage;
