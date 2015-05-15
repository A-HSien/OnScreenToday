"use strict";

import React, {Component} from 'react';
import cn from "classnames";
import _ from 'lodash';

if (process.env.BROWSER) {
  require("../style/components/ArtWork_Air.scss");
}


class ArtWork_Air extends Component {

	getDefaultProps() {

        return {
            headerHeight: '15px',
            imageHeight: '220px',
            title: 'This is title',
            content: "may play host to some of the international contemporary art world’s most exciting young programs this year—but there’s much to see away from the fair too. Below, our picks of the 10 gallery shows you shouldn’t miss while in Milan.",
            imageUrl: 'https://d32dm0rphc51dk.cloudfront.net/wfFdmG9EoSrwvaZfGkpm9w/large.jpg',
            detailUrl: ""
        };
    }

    render () {
        var styleContainer = {
            //width: '295px'
        };

        var styleImage = {
            height: this.props.imageHeight,
        };

        var styleHeader = {
            //height: this.props.
        };
        var classnames = cn("artwork-air clearfix", this.props.addClassnames);

        var jsx;

        jsx = (
            <li className={classnames} style={styleContainer}>
                <ul className="aw-container clearfix" >
                    <a className="aw-image-container " href={this.props.detailUrl} >
                        <img className="image hover-image-effect" src={this.props.content.img_hero} />
                    </a>
                    <a className="aw-content" href={this.props.detailUrl}>
                        <div className="aw-title">{this.props.content.title}</div>
                    </a>
                </ul>
            </li>
        );


        return jsx;
    }

}

export default ArtWork_Air;