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
  require("../style/pages/Conversation.scss");
}


class ConversationListPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	lang: PropTypes.string.isRequired,
    conversations: PropTypes.array.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {conversations, lang} = this.props;
		// console.log("conversations: ", conversations);
		// console.log("lang: ", lang);
		var cloned = _.clone(conversations);
		var hero = cloned.slice(0,1)[0];
		var heroContent = composeContent(hero, lang);
		var listItems = cloned.slice(1);
		var listItemsContent = _.map(listItems, function (item) {
			return composeContent(item, lang);
		})
		// console.log("conversationsListPage heroContent: ", heroContent);

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

		return <div className="conversation page">
			<SubHeader />
			<div className="conversation-page-main">
				<div className="container">
					<div className="conversation-page-hero">
						{jsxHero}
					</div>
					<div className="conversation-page-main">
						{createGroupList(listItemsContent, 3, 'conversation')}
					</div>
				</div>
			</div>
		</div>;
	}
}

ConversationListPage = connectToStores(ConversationListPage, ["ContentStore", "LanguageStore"], (stores) => {
	// debugger;
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		conversations: contentData,
	};
});

export default ConversationListPage;
