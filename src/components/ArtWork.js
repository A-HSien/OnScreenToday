"use strict";

import React, {Component} from 'react';
import cn from "classnames";
import _ from 'lodash';
import { NavLink } from "flux-router-component";

if (process.env.BROWSER) {
  require("../style/components/ArtWork.scss");
}


class ArtWork extends Component {

    render () {
        var classnames = cn("artwork clearfix", this.props.addClassnames);
        var jsx, 
            jsxImage = <noscript />;
        if (this.props.content) {
            var image = this.props.content.heroImage;
            if (image && image.url) {
                var _styleItem = {
                    backgroundImage: 'url(' + image.url + ')',
                    backgroundSize: "cover",
                    height: 200,
                    backgroundPositionX: '50%'
                };
                jsxImage = (<div className="aw-image-container " >
                    <div className="image hover-image-effect" style={_styleItem}></div>
                </div>);
            }
            
            jsx = (
                <NavLink href={this.props.content.url} className="aw-link">
                <div className={classnames} >
                    <div className="aw-header"></div>
                    {jsxImage}
                    <div className="aw-title">{this.props.content.title}</div>
                    <div className="aw-subtitle">{this.props.content.subtitle}</div>
                    <div className="aw-subtitle">{this.props.content.createdAt}</div>
                </div>
                </NavLink>
            );
        } else {
            jsx = <noscript />;
        }


        return jsx;
    }

}

export default ArtWork;