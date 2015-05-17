"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import {showBio, hideBio} from "../actions/AboutActionCreators";
import { NavLink } from "flux-router-component";
import HomeConversation from './home/Conversation';
import HomeScreenshot from './home/Screenshot';
import HomeView from './home/Views';
import HomeAir from './home/OnAir';
import HomeFeature from './home/Feature';
import Carousel from '../components/Carousel';
import _ from "lodash";

if (process.env.BROWSER) {
  require("../style/pages/Home.scss");
}


class HomePage extends Component {

	constructor (props) {
		super(props);

	}

	static propTypes = {
		lang: PropTypes.string.isRequired,
		conversationData: PropTypes.array.isRequired,
		screenshotData: PropTypes.array.isRequired,
		viewData: PropTypes.array.isRequired
	}

	static contextTypes = {
		executeAction: PropTypes.func.isRequired
	}


	render() {
		// debugger;
		var {lang, conversationData, screenshotData, viewData} = this.props;
		var conversations = conversationData.map((c)=> {
			return c[lang];
		});
		var screenshots = screenshotData.map((c) => {
			return c[lang];
		});
		var views = viewData.map((c) => {
			return c[lang];
		});
		var jsx;


		if (conversations.length) {
			var cForCarousel = conversations.slice(0,2);
			var cForList = conversations.slice(2);


			jsx = (
				<div className="home">
					<SubHeader />
					<Carousel slides={this._createSlides(cForCarousel)} settings={{autoplay: true}} />
					<div className="home-main container">
						<HomeConversation conversations={cForList} />
						<HomeScreenshot screenshots={screenshots} />
						<HomeFeature lang={lang}/>
						<HomeView views={views} />
					</div>
				</div>
			);
		} else {
			jsx = <noscript />;
		}
		
		return jsx;
	}

	_createSlides (contentArray) {

		var slides = [];
		for (var i =0 ; i < contentArray.length ; i++) {
			var content = contentArray[i];
			var _styleItem = {
				backgroundImage: 'url(' + content.images[0].url + ')'
			};
			slides.push(
				<div key={i} className="slideItem" style={_styleItem}>
						<div className="container">
							<div className="title">
								<span>{content.title}</span>
							</div>
							<div className="description">{content.subtitle}</div>
								<NavLink key={i} className="more" href={content.url} >
								<div className="more-container" >
									<span className="more">read more</span>
								</div>
								</NavLink>
						</div>
				</div>
			);
		}

		return slides;
	}

	


}

HomePage = connectToStores(HomePage, ["ContentStore", "LanguageStore"], (stores) => {
	// debugger;
	var {contentData}  = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		conversationData: contentData.conversation,
		screenshotData: contentData.screenshot,
		viewData: contentData.view,


	};
});

export default HomePage;
