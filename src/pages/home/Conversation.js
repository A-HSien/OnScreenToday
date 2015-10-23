"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    require("../../style/pages/home/home_module.scss");
	// require("../../style/pages/home/home_module_conversation.scss");
}


class Conversation extends Component {

	render () {

		var jsx;
        var num = this.props.conversations.length;

        if (this.props.conversations.length) {
            
            jsx = (<div className="home-module conversation">
                <NavLink href="/conversations">
                    <div className="title row">
                        <div className="title-name">Conversation</div>
                        <div className="title-all">
                            View All 
                            <div className="title-icon"></div>
                        </div>
                    </div>
                </NavLink>
                <div className="row">
                        <ArtWork  content={this.props.conversations[0]} addClassnames={"col-xs-4"} key="this.props.conversations[0]" />
                        <ArtWork  content={this.props.conversations[1]} addClassnames={"col-xs-4"} key="this.props.conversations[1]" />
                        <ArtWork  content={this.props.conversations[2]} addClassnames={"col-xs-4"} key="this.props.conversations[2]" />          
                </div>
            </div>);
        } else {
            jsx = <noscript />;
        }


        return jsx;
	}

}

export default Conversation;
