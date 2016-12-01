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
		const subtitle = this.props.subtitle
			? (
					<span className="hero-subtitle">{this.props.subtitle}</span>
			)
			: '';
		const description = this.props.description
			? (
				<p className="hero-description hidden-xs">
					{this.props.description}
				</p>
			)
			: '';

		return (
			<div className="row clearfix" >
				<NavLink href={this.props.contentUrl}>
					<div className="hero-image" style={imageStyle}>
						<div>
							<span className="hero-title">{this.props.title}</span>
						</div>
						<div>
							{subtitle}
						</div>
						<div>
							{description}
						</div>
						<div className="hero-btn-container">
							<span className="hero-btn">
								read more
							</span>
						</div>
					</div>
				</NavLink>
			</div>
		);
	}
});

module.exports = Hero;
