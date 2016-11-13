"use strict";
import React from 'react';
import { NavLink } from "flux-router-component";
if (process.env.BROWSER) {
	require('../style/components/Hero.scss');
}

var Hero = React.createClass({
	render () {
		const imageStyle = this.props.imageUrl
			? {backgroundImage: "url(" + this.props.imageUrl + ")"}
			: {};
		return (
			<div className="row clearfix" >
				<NavLink href={this.props.contentUrl}>
					<div className="hero-image" style={imageStyle}>
						<div>
							<span className="hero-title">{this.props.title}</span>
						</div>
						<span className="hero-subtitle">{this.props.subtitle}</span>
						<p className="hero-description">
							{this.props.description}
						</p>
						<span className="hero-btn">
							read more
						</span>
					</div>
				</NavLink>
			</div>
		);
	}
});

module.exports = Hero;
