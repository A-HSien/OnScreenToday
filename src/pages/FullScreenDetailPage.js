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
  require("../style/pages/ScreenDetail.scss");
}


class FullScreenDetailPage extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	slug: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired,
    FullScreenData: PropTypes.object.isRequired,
    extraContent: PropTypes.array.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {FullScreenData, lang, extraContent} = this.props;
		if (!FullScreenData) {
			return <noscript />;
		}
		var hero =  composeContent(FullScreenData, lang);
		var extraContent = _.map(extraContent, function (content) {
			return composeContent(content, lang);
		})

		// debugger;
		var jsxHero = (<div className=" screen-content-container row clearfix" >
			<div className="screen-content">
				
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
					<div className="screen-content-category clearfix">
						<span>{hero.type}</span>
					</div>
					<h1 className="screen-content-title clearfix">
						<span>{hero.title}</span>
					</h1>
					<h2 className="screen-content-subtitle">{hero.subtitle}</h2>
					<div>
						{this._createAuthor(hero.author)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hero.createdAt}
					</div>
					<div>
						{this._createVideoContributor(hero.camera)}
					</div>
					<div>
						{this._createIntroContributor(hero.introduction)}
					</div>
					<br></br>
					<div dangerouslySetInnerHTML={{__html: hero.article}}></div>
				</div>
			</div>
		</div>);


		return <div className="screen detail page ">
			<SubHeader />
			<div className="screen-detail-container">
				
				<div className="container-fluid">
					{jsxHero}
					<br></br>
					<div className="container screen-content-more">
						<NavLink className="call" href="/screens"><h2 className="screen-more">more articles</h2></NavLink>
						<div className="screen-more-main">{this._createExtra(extraContent, lang)}</div>
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
			slides.push(<div key={i} className="screen-carousel">
				<div className="screen-image" style={_styleItem}></div>
				<div className="screen-caption" dangerouslySetInnerHTML={{__html: _image.captions}} ></div>
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
					return <div key={item.title} className={"screen-list-item " + "col-sm-"+ 12/n} >
						<NavLink href={item.url} className="screen-item-link">
							<div className="screen-item-header">
								<div className="screen-item-category" >{item.type}</div>
								<div className="screen-item-category-extra"></div>
							</div>
		                    {(item.images && item.images.length)? <div className="screen-image" style={{backgroundImage: "url(" +item.images[0].url+ ")"}}></div> : <noscript />}
							<div className="screen-title">{item.title}</div>
							<div className="screen-time">{item.createdAt}</div>
							<div className="screen-description">{item.description.substring(0, 200) + "..."}</div>
							<div className="screen-more">READ MORE</div>
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

FullScreenDetailPage = connectToStores(FullScreenDetailPage, ["ContentStore", "LanguageStore"], (stores, props) => {
	// debugger;
	var contentData = stores.ContentStore.getContentBySlug(props.slug) || false;
	var extraContent = stores.ContentStore.getExtraContent(props.slug) || false;
	var {lang} = stores.LanguageStore.getData();

	return {
		lang: lang,
		FullScreenData: contentData,
		extraContent: extraContent
	};
});


export default FullScreenDetailPage;
