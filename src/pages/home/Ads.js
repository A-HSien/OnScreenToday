"use strict";


import React, { PropTypes, Component } from "react";
import ArtWork from "../../components/ArtWork2";
import { NavLink } from "flux-router-component";


if (process.env.BROWSER) {
    require("../../style/pages/home/home_module.scss");
}


class Ads extends Component {

	render () {

		var jsx;
        var num = this.props.ads.length;
        var subEmailDiv = '<!-- Begin MailChimp Signup Form -->'+
'<p>&nbsp;</p>'+
'<div id="mc_embed_signup"><form id="mc-embedded-subscribe-form" class="validate" action="//onscreentoday.us10.list-manage.com/subscribe/post?u=5d4dd0381b859e4dcfa018832&amp;id=d493e0d380" method="post" name="mc-embedded-subscribe-form" novalidate="" target="_blank">'+
'<div id="mc_embed_signup_scroll"><strong><label for="mce-EMAIL">Subscribe to Mail List</label></strong></div>'+
'<div><input id="mce-EMAIL" class="email" name="EMAIL" required="" type="email" value="" placeholder="email address" /> <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->'+
'<div style="position: absolute; left: -5000px;"><input tabindex="-1" name="b_5d4dd0381b859e4dcfa018832_d493e0d380" type="text" value="" /></div>'+
'<div class="clear" style="margin-top:5px"><input id="mc-embedded-subscribe" class="button btn btn-warning" name="subscribe" type="submit" value="Subscribe" /></div>'+
'</div>'+
'</form></div>'+
'<!--End mc_embed_signup-->';


        jsx = (<div className="home-module Ads">
            <div className="title row">
                <div className="title-name"></div>
            </div>
            <div>
                <NavLink href={this.props.ads[0].title} target="blanket">
                    <image height="150px" src={this.props.ads[0].heroImage.url}/>
                </NavLink>
            </div>
            <br/>
            <div>
                <NavLink href={this.props.ads[1].title} target="blanket">
                    <image height="150px" src={this.props.ads[1].heroImage.url}/>
                </NavLink>
            </div>
            <br/>
            <div>
                <NavLink href={this.props.ads[2].title} target="blanket">
                    <image height="150px" src={this.props.ads[2].heroImage.url}/>
                </NavLink>
            </div>  
            <br/>
            <div>
                <NavLink href={this.props.ads[3].title} target="blanket">
                    <image height="150px" src={this.props.ads[3].heroImage.url}/>
                </NavLink>
            </div>
            <br/>
            <div>
                <NavLink href={this.props.ads[4].title} target="blanket">
                    <image height="150px" src={this.props.ads[4].heroImage.url}/>
                </NavLink>
            </div>  
            <br/>
            <div>
                <NavLink href={this.props.ads[5].title} target="blanket">
                    <image height="150px" src={this.props.ads[5].heroImage.url}/>
                </NavLink>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{__html: subEmailDiv}}></div>
            </div>                     
        </div>);


        return jsx;
	}

}

export default Ads;
