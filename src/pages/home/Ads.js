"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork2";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    // require("../../style/pages/home/home_module.scss");
}


class Ads extends Component {

	render () {

		var jsx;
        var num = this.props.ads.length;

        jsx = (<div className="home-module Ads">
            <div className="title row">
                <div className="title-name"></div>
            </div>
            <div>
                <NavLink href={this.props.ads[0].title} target="blanket">
                    <image height="250px" src={this.props.ads[0].heroImage.url}/>
                </NavLink>
            </div>
            <br/>
            <div>
                <NavLink href={this.props.ads[1].title} target="blanket">
                    <image height="250px" src={this.props.ads[1].heroImage.url}/>
                </NavLink>
            </div>
            <br/>
            <div>
                <NavLink href={this.props.ads[2].title} target="blanket">
                    <image height="250px" src={this.props.ads[2].heroImage.url}/>
                </NavLink>
            </div>                        
        </div>);


        return jsx;
	}

}

export default Ads;
