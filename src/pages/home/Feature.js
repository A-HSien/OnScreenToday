"use strict";


import React, { PropTypes, Component } from "react";


if (process.env.BROWSER) {
	require("../../style/pages/home/home_module.scss");
}


class Feature extends Component {

	render () {

		var jsx;
        var video = '<iframe src="https://player.vimeo.com/video/124788294" width="100%" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

        if (this.props.lang === 'chn') {
            video = '<iframe src="http://v.qq.com/iframe/player.html?vid=a01524dmjzr&tiny=0&auto=0"  width="100%" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        }

        jsx = (<div className="home-module feature">
            <div className="title row">
                <div className="title-name">feature</div>
            </div>
            <div className="row">
                <div className="video container"
                    style={{
                        paddingTop: "5px",
                        borderTop: "15px solid #FFC200"
                    }}
                 dangerouslySetInnerHTML={{__html: video }} ></div>
            </div>
        </div>);


        return jsx;
	}

}

export default Feature;
