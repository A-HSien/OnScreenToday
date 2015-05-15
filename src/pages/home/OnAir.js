"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork_Air";


if (process.env.BROWSER) {
    require("../../style/pages/home/home_module.scss");
}


class OnAir extends Component {

	render () {

		var jsx;
        var num = this.props.airs.length;
        var artworks = this.props.airs.map((air, key) => {
            return <ArtWork content={air} addClassnames={"home-module-air"} key={key} />;
        });
        jsx = (<ul className="home-module-airs air container-fluid">
            <ArtWork content={this.props.airs[0]} addClassnames={"home-module-air"} key={0} />
            <ArtWork content={this.props.airs[1]} addClassnames={"home-module-air"} key={1} />
            <ArtWork content={this.props.airs[2]} addClassnames={"home-module-air hide-mobile"} key={2} />
            <ArtWork content={this.props.airs[3]} addClassnames={"home-module-air hide-mobile"} key={3} />
        </ul>);


        return jsx;
	}

}

export default OnAir;
