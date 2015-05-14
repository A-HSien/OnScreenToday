"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import { NavLink } from "flux-router-component";
import BaseComponent from "../components/common/BaseComponent";
import Carousel from '../components/Carousel';


import _ from "lodash";

// var domino = require('domino');
// var Zepto = require('zepto-node');
// var window = domino.createWindow();
// var $ = Zepto(window);

if (process.env.BROWSER) {
  require("../style/pages/ConversationDetail.scss");
}


class ConversationDetailPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	slug: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
    conversationData: PropTypes.object.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {conversationData, lang} = this.props;

		if (!conversationData) {
			return <noscript />;
		}


		var hero =  conversationData[lang];
		var contents = hero.contents;
		var jsxVideo = {};

		var jsxDivs = contents.map((c)=>{
			if (c.content) {
				return <div dangerouslySetInnerHTML={{__html: c.content.html}}></div>;
			} else {
				return <noscript />;
			}
		});

		// debugger;
		var jsxHero = (<div className=" conversation-content-container row clearfix" >
			<div className="conversation-content">
				
				<Carousel slides={this._createSlides(hero.images)} settings={{
					arrows: false,
					dots: true,
					infinite: true,
					// autoplay: true,
					centerMode: true,
					centerPadding: '60px',
					slidesToShow: 2,
					responsive: [
						{
						  breakpoint: 768,
						  settings: {
						    arrows: false,
						    centerMode: true,
						    centerPadding: '40px',
						    slidesToShow: 2
						  }
						},
						{
						  breakpoint: 480,
						  settings: {
						    arrows: false,
						    centerMode: true,
						    centerPadding: '40px',
						    slidesToShow: 1
						  }
						}
					]
				}}/>

				
				<div className="container-narrow">
					<h2>{hero.title}</h2>
					<h3>{hero.subtitle}</h3>
					<div>
						<strong>By {hero.author}</strong>
					</div>
					
					<br></br>
					{jsxDivs}
				</div>
			</div>
		</div>);

		if (hero.videos && hero.videos.length) {
			jsxVideo = <div className="conversation-video" dangerouslySetInnerHTML={{__html: hero.videos[0].embedHTML}} ></div>;
		}

		return <div className="conversation detail page ">
			<SubHeader />
			<div className="conversation-detail-container">
				
				<div className="container-fluid">
					{jsxHero}
					{jsxVideo}
				</div>
			</div>

		</div>;
	}

	_createSlides (images) {
		var slides = [];

		for (var i = 0 ; i < images.length ; i++) {
			var _image = images[i];
			slides.push(<div key={i} className="conversation-carousel">
				<img className="conversation-image" src={_image.url} />
				<div className="conversation-caption" dangerouslySetInnerHTML={{__html: _image.captions}} ></div>
			</div>);
		}

		return slides;
	}


}

ConversationDetailPage = connectToStores(ConversationDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	debugger;
	console.log("ConversationDetailPage: ", props);
	var contentData = stores.ContentStore.getContentBySlug(props.slug);
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		conversationData: contentData,
	};
});


export default ConversationDetailPage;
