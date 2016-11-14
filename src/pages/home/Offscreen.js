"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    require("../../style/pages/home/home_module.scss");
}


class Offscreen extends Component {

	render () {

		var jsx;
        var screens = this.props.screens.slice(0, 2);
        var num = screens.length;
        var artworks = screens.map((screen, key) => {
            return <ArtWork content={screen} addClassnames={"col-xs-12 col-sm-" + 12/num} key={key} />;
        });
        if (artworks.length) {
            jsx = (<div className="home-module offscreen">
                <NavLink href="/screens">
                <div className="title row">
                    <div className="title-name">offscreen</div>
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

export default Offscreen;
