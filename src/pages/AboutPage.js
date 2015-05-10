"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import {showBio, hideBio} from "../actions/AboutActionCreators";
import _ from "lodash";

var domino = require('domino');
var Zepto = require('zepto-node');
var window = domino.createWindow();
var $ = Zepto(window);

if (process.env.BROWSER) {
  require("../style/pages/About.scss");
}


class AboutPage extends Component {

	constructor (props) {
		super(props);

	}

  static propTypes = {
	lang: PropTypes.string.isRequired,
    aboutData: PropTypes.object.isRequired,
    bioData: PropTypes.object.isRequired,
    bioTargetRef: PropTypes.object.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
		//var lang = "eng";
		var {aboutData, lang} = this.props;

		var about = aboutData.about[lang],
			contact = aboutData.contact,
			teamMates = aboutData.team[lang];

		var jsxQuote = function() {
			if (about.quote.length) {
				return (
					<blockquote className="quote simple">
						<p>{about.quote}</p>
					</blockquote>
				);
			} else {
				return <noscript />;
			}
		};

		var jsxFormats = function() {
			if (about.formats.length) {
				return about.formats.map((format, k) => {
					return (<li key={k} className="format" dangerouslySetInnerHTML={{__html: format}} />);
				});
			} else {
				return <noscript />;
			}
		};

		return <div className="page about">
			<SubHeader />
			<div className="about-main container">
				<div className="section">
					<h3 className="about-title section-title">About us</h3>
					<div className="about-content">
						{jsxQuote()}
					</div>
				</div>
				<div className="section">
					<p dangerouslySetInnerHTML={{__html: about.description}} />
					<ul>
						{jsxFormats()}
					</ul>
				</div>
				<div className="section">
					<h3 className="section-title">team</h3>
					<div className="about-team">
						{this._createGroupList(teamMates, 4)}
					</div>
					<div className="photoCredit" >Photo© Jiaxi Yang & Zhe Zhu</div>
				</div>
				<div className="section">
					<h3 className="section-title">contact</h3>
					<a href={"mailto:" + contact.email + "?subject=More Information About Screen"}>{contact.email}</a>
				</div>
			</div>
		</div>;
	}

	/*==========  Events  ==========*/
	_onMouseLeave (evt) {
		var currentTarget = evt.currentTarget;
		$(currentTarget).removeClass("selected");

		this.context.executeAction(hideBio, {});
	}

	_onMouseOver (evt) {
		var	currentTarget = evt.currentTarget,
			aboutIntroEl,
			currentTargetEl = $(currentTarget);

		if (!currentTargetEl.hasClass("selected")) {
			currentTargetEl.addClass("selected");
		}
		aboutIntroEl = currentTarget.parentNode.querySelector(".about-bio");

		this.context.executeAction(showBio, {
			targetRef: aboutIntroEl.getAttribute("data-ref"),
			bioData: currentTarget.getAttribute("data-bio")
		});
	}

	/*==========  Utils  ==========*/
	_isShowBio (bioKey) {
		return bioKey === this.props.bioTargetRef && this.props.bioData && this.props.bioData.length;
	}

	_createGroupList (items, n) {
		var jsxRow = [],
			jsxItems = [],
			item,
			bioKey = "",
			jsxBio,
			jsxArrow;

		var styleImage ;

		jsxBio = (bioKey) => {
			if (this._isShowBio(bioKey)) {
				return <p>{this.props.bioData}</p>
			} else {
				return <noscript />;
			}
		};

		jsxArrow = () => {
			if (this.props.bioData && this.props.bioData.length) {
				return <div className="about-arrow hidden-xs hidden-sm"></div>;
			} else {
				return <noscript />;
			}
		};

		for(var i = 0; i < items.length; i++) {
			item = items[i];
			bioKey = "bio-" + item.name;

			if (i % n === 0 && i !== 0) {

				jsxRow.push(<div key={"row" + item.name} className="row about-list-row">
					{jsxItems}
					<div ref={bioKey} data-ref={bioKey} className={"about-bio col-md-12 " + (this._isShowBio(bioKey)? "shown": "")}>
						{jsxBio(bioKey)}
					</div>
				</div>);

				jsxItems = [];
			}

			jsxItems.push(<div key={i + item.name} className={"about-list-item " + "col-md-"+ 12/n} data-bio={item.bio} 
					onMouseOver={_.bind(this._onMouseOver, this)} 
					onMouseLeave={_.bind(this._onMouseLeave, this)}>
				<span className="about-image-container hover-shadow">
					<img  className="about-image " src={item.imgUrl} />
				</span>
				<div className="about-name">{item.name}</div>
				<div className="about-title">{item.title}</div>
				<div className="about-bio-sm hidden-sm hidden-md hidden-lg">{item.bio}</div>
				{jsxArrow()}
			</div>);

		}

		if (jsxItems.length) {

			jsxRow.push(<div key={jsxItems.length} className="row about-list-row">
					{jsxItems}
					<div ref="bio-last" data-ref="bio-last" className={"about-bio col-md-12 " + (this._isShowBio("bio-last")? "shown " : "")}>
						{jsxBio("bio-last")}
					</div>
				</div>);
		}

		return jsxRow;
	}


}

AboutPage = connectToStores(AboutPage, ["AboutStore", "LanguageStore"], (stores) => {

	var data = stores.AboutStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		aboutData: data.aboutData,
		bioData: data.bioData,
		bioTargetRef: data.bioTargetRef
	};
});

export default AboutPage;
