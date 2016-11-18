"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork2";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    // require("../../style/pages/home/home_module.scss");
}


class CommercialProjects extends Component {

	render () {

		var jsx;
        var num = this.props.commercialProjects.length;
        var artworks = this.props.commercialProjects.map((commercialProject, key) => {
            return <ArtWork content={commercialProject} addClassnames={"col-sm-" + 12/num} key={key} />;
        });
        jsx = (<div className="home-module commercial-projects">
            <NavLink href="/commercial-projects">
            <div className="title row">
                <div className="title-name">Studio</div>
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

export default CommercialProjects;
