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
  require("../style/pages/CommercialProjects.scss");
}

class CommercialProjectsListPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
		lang: PropTypes.string.isRequired,
		commercialProjects: PropTypes.array.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {commercialProjects, lang} = this.props;
		var cloned = _.clone(commercialProjects);
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
				title={heroContent.type}
				subtitle={heroContent.title}
				description={heroContent.description}
			/>
		);

		return <div className="commercial-projects page">
			<SubHeader />
			<div className="commercial-projects-page-main">
				<div className="commercial-projects-page-hero">
					{jsxHero}
				</div>
				<div className="container">
					<div className="commercial-projects-page-main">
						{createGroupList(listItemsContent, 3, 'commercial-projects')}
					</div>
				</div>
			</div>
		</div>;
	}
}

CommercialProjectsListPage = connectToStores(CommercialProjectsListPage, ["ContentStore", "LanguageStore"], (stores) => {
	// debugger;
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		commercialProjects: contentData,
	};
});

export default CommercialProjectsListPage;
