"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
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
		var jsxHero = (<div className="conversation-hero row clearfix" >
			<NavLink href={heroContent.url} >
			<div className="conversation-hero-image col-sm-8" style={{backgroundImage: "url(" + heroContent.heroImage.url+ ")"}} >
				<div className="conversation-hero-image-category">{heroContent.type}</div>
				<div className="conversation-hero-title">{heroContent.title}</div>
			</div>
			<div className="conversation-hero-content col-sm-4">
				<div className="conversation-hero-content-description">
					{heroContent.description.substring(0, 200) + "..."}
				</div>
				<div className="conversation-hero-btn">
					READ MORE
				</div>
			</div>
			</NavLink>
		</div>);


		return <div className="conversation page">
			<SubHeader />
			<div className="conversation-page-main container">
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
