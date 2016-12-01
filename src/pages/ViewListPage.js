"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import Hero from '../components/Hero';
import _ from "lodash";
import {composeContent, createGroupList} from "../utils/Common";

if (process.env.BROWSER) {
  require("../style/pages/View.scss");
}

class ViewListPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
		lang: PropTypes.string.isRequired,
		views: PropTypes.array.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {views, lang} = this.props;
		var cloned = _.clone(views);
		var hero = cloned.slice(0,1)[0];
		var heroContent = composeContent(hero, lang);
		var listItems = cloned.slice(1);
		var listItemsContent = _.map(listItems, function (item) {
			return composeContent(item, lang);
		})

		// debugger;
		var jsxHero = (
			<Hero
				contentUrl={heroContent.url}
				imageUrl={heroContent.heroImage.url}
				title={heroContent.title}
				subtitle={heroContent.subtitle}
				description={heroContent.description}
			/>
		);

		return <div className="view page">
			<SubHeader />
			<div className="view-page-main">
				<div className="container">
					<div className="view-page-hero">
						{jsxHero}
					</div>
					<div className="view-page-main">
						{createGroupList(listItemsContent, 3, 'view')}
					</div>
				</div>
			</div>
		</div>;
	}
}

ViewListPage = connectToStores(ViewListPage, ["ContentStore", "LanguageStore"], (stores) => {
	// debugger;
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		views: contentData,
	};
});

export default ViewListPage;
