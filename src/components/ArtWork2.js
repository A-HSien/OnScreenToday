import React, {Component} from 'react';
import cn from "classnames";
import _ from 'lodash';
import { NavLink } from "flux-router-component";

if (process.env.BROWSER) {
  require("../style/components/ArtWork2.scss");
}


class ArtWork2 extends Component {

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

        var styleImage = {
            height: this.props.imageHeight,
        };
        // console.log("ArtWork2 content: ", this.props.content);
        var classnames = cn("artwork2 clearfix", this.props.addClassnames);
        var jsx;
        jsx = (
            <div className={classnames} >
                <div className="aw-header"></div>
                    <ul className="aw-container clearfix" >
                        <NavLink className="aw-image-container " href={this.props.content.url} >
                            <img className="image hover-image-effect" src={this.props.content.heroImage && this.props.content.heroImage.url} />
                        </NavLink>
                        <NavLink className="aw-content" href={this.props.content.url}>
                            <div className="aw-title">{this.props.content.title}</div>
                            <div className="aw-description">{this.props.content.description}</div>
                            <div className="aw-footer">Read More</div>
                        </NavLink>
                    </ul>
            </div>
        );


        return jsx;
    }

}

export default ArtWork2;
