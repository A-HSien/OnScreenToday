"use strict";

import React, {PropTypes, Component } from "react";
import { connectToStores } from "fluxible/addons";
import BaseComponent from "./common/BaseComponent";
import { NavLink } from "flux-router-component";
import classnames from 'classnames';
import {getLangPreference, changeLanguage} from "../actions/LanguageActionCreators";

if (process.env.BROWSER) {
	require("../style/Header.scss");
	require("../style/MobileHeader.scss");
}

class Header extends BaseComponent {

	constructor() {
		super();
		this._bind('_onLangClick', '_toggle');
	}

    static propTypes = {
        lang: PropTypes.string.isRequired
    }

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    }

	
	render () {
        var navLinks = [],
            jsx,
            jsxLang;
        var {lang} =  this.props;
        var navs = [
            {
                url: '/conversations',
                name: {
                    eng: "conversations",
                    chn: "对话",
                    chnt: "對話",
                }
            },{
                url: '/screenshots',
                name: {
                    eng: "screenshots",
                    chn: "短评",
                    chnt: "短評",
                }
            }, 
            {
                url: '/view/on-terminology-media-art-on-screen',
                name: {
                    eng: "views",
                    chn: "观点",
                    chnt: "觀點"
                }
            }, {
                url: '/tunedin',
                name: {
                    eng: "tuned in",
                    chn: "上映中",
                    chnt: "上映中"
                }
            }, {
                url: '/callforartists',
                name: {
                    eng: "call for artists",
                    chn: "作品征集",
                    chnt: "作品徵集"
                }
            }
        ];

        for(var i = 0; i < navs.length; i++) {
            var _nav = navs[i];
            var _class = classnames("nav-item");
            navLinks.push(
                <NavLink key={i} href={_nav.url} className={_class}>
                    {_nav.name[lang]}
                    <span className="nav-icon"></span>
                </NavLink>
            );
        }

        jsxLang = <ul className="lang">
            <li data-lang="eng" className={"lang-item " + (lang === "eng" ? "selected" : "")} onTouchStart={this._onLangClick} onClick={this._onLangClick}>EN</li>
            <li>|</li>
            <li data-lang="chn" className={"lang-item " + (lang === "chn" ? "selected" : "")} onTouchStart={this._onLangClick} onClick={this._onLangClick}>简</li>
            <li>|</li>
            <li data-lang="chnt" className={"lang-item " + (lang === "chnt" ? "selected" : "")} onTouchStart={this._onLangClick} onClick={this._onLangClick}>繁</li>
        </ul>;

        jsx = (<div ref="header" className="header-container">
                <ul className="nav-sub nav-hidden-md " onClick={this._toggle}>
                    <div className="mobile-nav-container" >
                        {jsxLang}
                        {navLinks}
                    </div>

                </ul>
            <header className="header">
            
            <nav className="navbar container-fluid">
                <div className="navbar-cell col-xs-2">
                    <a href="/">
                        <div className="logo"></div>
                    </a>
                </div>
                <div className="navbar-cell navlinks hidden-sm hidden-xs col-xs-7">
                    {navLinks}
                </div>
                <div className="col-xs-3 nav-right hidden-sm hidden-xs">
                    {jsxLang}
                </div>
                <div className="menu-responsive col-xs-9 ion-android-menu visible-sm visible-xs" onClick={this._toggle}></div>
            </nav>
            </header>
        </div>);

        return jsx;
    }

    /*==========  Methods  ==========*/

    _onLangClick(evt) {
        var currentTarget = evt.currentTarget;
        this.context.executeAction(changeLanguage, {lang: currentTarget.getAttribute("data-lang")});
    }

    _toggle () {
        this._toggleClass(this.refs.header.getDOMNode(), "show-mobile-nav");
    }

    _toggleClass (el, className) {
        if (el.classList) {
          el.classList.toggle(className);
        } else {
          var classes = el.className.split(' ');
          var existingIndex = classes.indexOf(className);

          if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
          else
            classes.push(className);

          el.className = classes.join(' ');
        }
    }

}

Header = connectToStores(Header, ["LanguageStore"], (stores) => {
    var {lang} = stores.LanguageStore.getData();
    return {
      lang: lang
    };
})

export default Header;