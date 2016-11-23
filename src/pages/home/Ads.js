"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork2";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    require("../../style/pages/home/home_module.scss");
}


class Ads extends Component {

	render () {
		let ads = this.props.ads.map(function (ad) {
			return (
				<div className="ad-container">
					<NavLink href={ad.title} target="blanket">
						<image height="150px" src={ad.heroImage.url}/>
					</NavLink>
				</div>
			);
		});

		return (
			<div className="home-module Ads">
				<div className="title row">
					<div className="title-name"></div>
				</div>
				{ads}
			</div>
		);
	}

}

export default Ads;
