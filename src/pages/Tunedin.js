"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import BaseComponent from "../components/common/BaseComponent";


import _ from "lodash";

if (process.env.BROWSER) {
  require("../style/pages/Tunedin.scss");
}


class Tunedin extends BaseComponent {

	constructor() {
		super();
	}


  static propTypes = {
	lang: PropTypes.string.isRequired,
    tunedins: PropTypes.array.isRequired,
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
  		var {lang, tunedins} = this.props;
		var listItems = tunedins.map((item)=> {
			return item['content'][lang];
		});

		return <div className="tunedins page">
			<SubHeader />
			<div className="tunedins-page-main container">
				<div className="container">
					<div className="tunedins-page-main">
						{this.createGroupList(listItems, 2)}
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
				jsxRow.push(<div key={i}  className="row tunedins-list-row">
					{jsxItems}
				</div>);

				jsxItems = [];
			}

			jsxItems.push(<div key={item.title} className={"tunedins-list-item " + "col-sm-"+ 12/n} >
					<div className="tunedins-item-header">
						<div className="tunedins-item-category-extra"></div>
					</div>
                    {(item.img_hero && item.img_hero.length)? <div className="tunedins-image" style={{backgroundImage: "url(" +item.img_hero+ ")"}}></div> : <noscript />}
					<div className="tunedins-title">{item.title}</div>
					<div className="tunedins-date">{item.date}</div>
					<div className="tunedins-venue">{item.venue}</div>
			</div>);

		}

		if (jsxItems.length) {
			jsxRow.push(<div key={jsxItems.length}  className="row tunedins-list-row">
					{jsxItems}
				</div>);
		}


		return jsxRow;
	}


}

Tunedin = connectToStores(Tunedin, ["ContentStore", "LanguageStore"], (stores) => {
	var {contentData} = stores.ContentStore.getData();
	var {lang} = stores.LanguageStore.getData();
	return {
		lang: lang,
		tunedins: contentData,
	};
});

export default Tunedin;
