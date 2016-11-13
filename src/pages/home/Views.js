"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork2";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    // require("../../style/pages/home/home_module.scss");
}


class Views extends Component {

	render () {

		var jsx;
        var num = this.props.views.length;
        var artworks = this.props.views.map((view, key) => {
            return <ArtWork content={view} addClassnames={"col-sm-" + 12/num} key={key} />;
        });
        jsx = (<div className="home-module views">
            <NavLink href="/views">
            <div className="title row">
                <div className="title-name">Views</div>
                <div className="title-all">
                    View All 
                    <div className="title-icon"></div>
                </div>
            </div>
            </NavLink>
            <div className="row">
                {artworks}
            </div>
        </div>);


        return jsx;
	}

}

export default Views;
