"use strict";

import React, {Component} from 'react';
import cn from "classnames";
import _ from 'lodash';


class Image extends Component {

	getDefaultProps() {

        return {
            extraClassnames: "",
            imageUrl: "",
            imageStyle: {}
        };
    }

	render () {

        var classnames = cn("image clearfix", this.props.extraClassnames);
        var jsxStyle = _.defaults({}, this.props.imageStyle, {
            backgroundImage: "url(" + this.props.imageUrl + ")",
            backgroundColor: "#FFC200",
            backgroundSize: "cover",
            margin: "10px 0px" 
        });
        var jsx;
        if (this.props.imageUrl && this.props.imageUrl.length) {
            jsx = (
                <div className={classnames} style={jsxStyle} ></div>
            );
        } else {
            jsx = <noscript />;
        }
        

        return jsx;
    }

}

export default Image;