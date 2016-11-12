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
            {this._createTeamList(teamMates)}
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

  /*==========  Utils  ==========*/
  _createTeamList (teamMates) {
    return teamMates.map((teamMate) => {
      return (
        <div className="row about-list-row">
          <div className="about-list-item col-md-3">
            <div className="about-image-container">
              <img className="about-image" src={teamMate.imgUrl} />
              <div className="about-name">{teamMate.name}</div>
              <div className="about-title">{teamMate.title}</div>
            </div>
            <div className="about-bio-sm">{teamMate.bio}</div>
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
