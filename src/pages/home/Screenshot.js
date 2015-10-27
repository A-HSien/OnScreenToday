"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    require("../../style/pages/home/home_module.scss");
}


class Screenshot extends Component {

	render () {

		var jsx;
        var screenshots = this.props.screenshots.slice(0, 2);
        var num = screenshots.length;
        var artworks = screenshots.map((screenshot, key) => {
            return <ArtWork content={screenshot} addClassnames={"col-xs-12 col-sm-" + 12/num} key={key} />;
        });
        if (artworks.length) {
            jsx = (<div className="home-module screenshot">
                <NavLink href="/screenshots">
                <div className="title row">
                    <div className="title-name">screenshot</div>
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
        } else {
            jsx = <noscript />;
        }


        return jsx;
	}

}

export default Screenshot;
