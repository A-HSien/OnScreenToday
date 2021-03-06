"use strict";

import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import SubHeader from '../components/SubHeader';
import {showBio, hideBio} from "../actions/AboutActionCreators";
import _ from "lodash";

if (process.env.BROWSER) {
  require("../style/pages/About.scss");
}


class AboutPage extends Component {

  constructor (props) {
    super(props);
  }

  static propTypes = {
    lang: PropTypes.string,
    aboutData: PropTypes.object,
    bioData: PropTypes.string,
    bioTargetRef: PropTypes.object
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }


  render() {
    //var lang = "eng";
    var {aboutData, lang} = this.props;

    var about = aboutData.content[lang],
        teamMates = aboutData.team;

    return <div className="page about">
      <SubHeader />
      <div className="about-main container">
        <div className="section">
          <h3 className="about-title section-title">About us</h3>
        </div>
        <div className="section" dangerouslySetInnerHTML={{__html: about.description}}></div>
        <div className="section">
          <h3 className="section-title">team</h3>
          <div className="about-team">
            {this._createTeamList(teamMates)}
          </div>
        </div>
        <div className="section" dangerouslySetInnerHTML={{__html: about.contributors}}></div>
      </div>
    </div>;
  }

  /*==========  Utils  ==========*/
  _createTeamList (teamMates) {
		let { lang } = this.props;
    return teamMates.map((teamMate) => {
			let name = (lang === 'eng')
				? teamMate.name
				: teamMate['name_'+lang];
      return (
        <div className="row about-list-row">
          <div className="about-list-item col-md-3">
            <div className="about-image-container">
              <img className="about-image" src={teamMate.content.image ? teamMate.content.image.url : ""} />
              <div className="about-name">{name.first}{name.last}</div>
              <div className="about-title">{teamMate.content[lang].role}</div>
            </div>
            <div className="about-bio-sm">{teamMate.content[lang].bio}</div>
          </div>
        </div>
      );
    });
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
