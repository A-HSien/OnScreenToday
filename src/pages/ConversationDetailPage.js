"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";
import Carousel from '../components/Carousel';
import { NavLink } from "flux-router-component";
import {composeContent} from "../utils/Common";


import _ from "lodash";

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
    extraContent: PropTypes.array.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {conversationData, lang, extraContent} = this.props;
		if (!conversationData) {
			return <noscript />;
		}
		var hero =  composeContent(conversationData, lang);
		var extraContent = _.map(extraContent, function (content) {
			return composeContent(content, lang);
		})

		// debugger;
		var jsxHero = (<div className=" conversation-content-container row clearfix" >
			<div className="conversation-content">
				
				<Carousel slides={this._createSlides(hero.images)} settings={{
					arrows: false,
					dots: true,
					infinite: true,
					// autoplay: true,
					centerMode: true,
					centerPadding: '80px',
					slidesToShow: hero.images.length > 3 ? 3  : hero.images.length,
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
					<div className="conversation-content-category clearfix">
						<span>{hero.type}</span>
					</div>
					<h1 className="conversation-content-title clearfix">
						<span>{hero.title}</span>
					</h1>
					<h2 className="conversation-content-subtitle">{hero.subtitle}</h2>
					<div>
						{this._createAuthor(hero.author)}
						
					</div>
					<div>
						{this._createVideoContributor(hero.camera)}
					</div>
					<div>
						{this._createIntroContributor(hero.introduction)}
					</div>
					<br></br>
					<div dangerouslySetInnerHTML={{__html: hero.article}}></div>;
				</div>
			</div>
		</div>);


		return <div className="conversation detail page ">
			<SubHeader />
			<div className="conversation-detail-container">
				
				<div className="container-fluid">
					{jsxHero}
					<br></br>
					<div className="container conversation-content-more">
						<h2 className="conversation-more">more conversations</h2>
						<div className="conversation-more-main">{this._createExtra(extraContent, lang)}</div>
					</div>
				</div>
			</div>

		</div>;
	}

	_createAuthor (content) {

		var authorJsx = <noscript />;

		if (content) {
			authorJsx = <strong>By <i>{content}</i></strong>;
		}

		return authorJsx;

	}

	_createVideoContributor (content) {

		var authorJsx = <noscript />;

		if (content) {
			authorJsx = <strong>Video by <i>{content}</i></strong>;
		}

		return authorJsx;

	}

	_createIntroContributor (content) {

		var authorJsx = <noscript />;

		if (content) {
			authorJsx = <strong>Intro by <i>{content}</i></strong>;
		}

		return authorJsx;

	}

	_createSlides (images) {
		var slides = [];

		for (var i = 0 ; i < images.length ; i++) {
			var _image = images[i];
			var _styleItem = {
				backgroundImage: 'url(' + _image.url + ')',
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				height: 300,
				backgroundPositionX: '50%'
			};
			slides.push(<div key={i} className="conversation-carousel">
				<div className="conversation-image" style={_styleItem}></div>
				<div className="conversation-caption" dangerouslySetInnerHTML={{__html: _image.captions}} ></div>
			</div>);
		}

		return slides;
	}

	_createExtra (contents, lang) {
		var extraContents = <noscript />;
		var n = 3;
		var start;

		if (contents && contents.length) {
			extraContents = contents.map((content) => {
				var item = content;
				if (item) {
					return <div key={item.title} className={"conversation-list-item " + "col-sm-"+ 12/n} >
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
					</div>;
				} else {
					return <noscript />;
				}
				

			});

			start = Math.floor(Math.random()*extraContents.length);
			var temp = extraContents.slice(start, start + 3) || [];
			if (temp.length < n) {
				// debugger;
				temp.concat(extraContents.slice(0, n - temp.length));
			}

		}

		return temp;
	}


}

ConversationDetailPage = connectToStores(ConversationDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	debugger;
	var contentData = stores.ContentStore.getContentBySlug(props.slug) || false;
	var extraContent = stores.ContentStore.getExtraContent(props.slug) || false;
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		conversationData: contentData,
		extraContent: extraContent
	};
});


export default ConversationDetailPage;
