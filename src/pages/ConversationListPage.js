"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import _ from "lodash";

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
		var cloned = _.clone(conversations);
		var hero = cloned.slice(0,1)[0][lang];
		var listItems = cloned.slice(1).map((item)=> {
			return item[lang];
		});

		// debugger;
		var jsxHero = (<div className="conversation-hero row clearfix" >
			<NavLink href={hero.url} >
			<div className="conversation-hero-image col-sm-8" style={{backgroundImage: "url(" + hero.images[0].url+ ")"}} >
				<div className="conversation-hero-image-category">{hero.type}</div>
				<div className="conversation-hero-title">{hero.title}</div>
			</div>
			<div className="conversation-hero-content col-sm-4">
				<div className="conversation-hero-content-description">
					{hero.description.substring(0, 250) + "..."}
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
						{this.createGroupList(listItems, 3)}
					</div>
				</div>
			</div>
		</div>;
	}

	createGroupList(items, n) {
		var jsxRow = [],
			jsxItems = [],
			item;

		for(var i = 0; i < items.length; i++) {
			item = items[i];
			if (i % n === 0 && i !== 0) {
				jsxRow.push(<div key={i}  className="row conversation-list-row">
					{jsxItems}
				</div>);

				jsxItems = [];
			}

			jsxItems.push(<div key={item.title} className={"conversation-list-item " + "col-sm-"+ 12/n} >
				<NavLink href={item.url} className="conversation-item-link">
					<div className="conversation-item-header">
						<div className="conversation-item-category" >{item.type}</div>
						<div className="conversation-item-category-extra"></div>
					</div>
                    {(item.images && item.images.length)? <div className="conversation-image" style={{backgroundImage: "url(" +item.images[0].url+ ")"}}></div> : <noscript />}
					<div className="conversation-title">{item.title}</div>
					<div className="conversation-description">{item.description.substring(0, 200) + "..."}</div>
					<div className="conversation-more">READ MORE</div>
				</NavLink>
			</div>);

		}

		if (jsxItems.length) {
			jsxRow.push(<div key={i + 1}  className="row conversation-list-row">
					{jsxItems}
				</div>);
		}


		return jsxRow;
	}


}

ConversationListPage = connectToStores(ConversationListPage, ["ContentStore", "LanguageStore"], (stores) => {
	debugger;
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		conversations: contentData,
	};
});

export default ConversationListPage;
