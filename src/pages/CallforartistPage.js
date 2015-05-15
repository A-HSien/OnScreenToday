"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";
import Image from "../components/Image";
import _ from "lodash";

if (process.env.BROWSER) {
  require("../style/pages/CallforartistPage.scss");
}


class CallforartistPage extends BaseComponent {

	constructor() {
		super();
	}


	static propTypes = {
		lang: PropTypes.string.isRequired,
		callforartistData: PropTypes.array.isRequired,
	}

	static contextTypes = {
		executeAction: PropTypes.func.isRequired
	}


	render() {
			var {lang, callforartistData} = this.props;
		var hero = callforartistData[0][lang];
		var contents = hero.contents;

		var jsxDivs = contents.map((c)=>{
			if (c.content) {
				return <div key={c.content} className="callforartist-content-main" dangerouslySetInnerHTML={{__html: c.content.html}}></div>;
			} else {
				return <noscript />;
			}
		});

		// debugger;
		var jsxHero = (<div className=" callforartist-content-container clearfix" >
			<div className="callforartist-content">
				<Image imageUrl={hero.heroImage.url} extraClassnames="callforartist-image" imageStyle={{backgroundSize: "contain", backgroundColor: "#ffffff"}}/>
				<br></br>
				{jsxDivs}
			</div>
		</div>);


		return <div className="callforartist detail page ">
			<SubHeader />
			<div className="callforartist-detail-container">
				<div className="container-narrow">
					<div className="row">
							{jsxHero}
					</div>
				</div>
			</div>

		</div>;
	}
}

CallforartistPage = connectToStores(CallforartistPage, ["ContentStore", "LanguageStore"], (stores) => {
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		callforartistData: contentData,
	};
});

export default CallforartistPage;
