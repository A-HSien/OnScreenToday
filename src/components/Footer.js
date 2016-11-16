import React, { Component } from "react";
import { NavLink } from "flux-router-component";
import MailingListSignup from "./MailingListSignup";

if (process.env.BROWSER) {
  require("../style/Footer.scss");
}

class Footer extends Component {

  render () {
        var jsx;

        jsx = (
          <div className="footer container">
            <div className="row">
              <div className="col-sm-3 hidden-xs">
                <div className="logo"></div>
              </div>
              <div className="col-sm-3 col-xs-6">
                <MailingListSignup/>
              </div>
              <div className="link-1 col-sm-2 hidden-xs">
                <ul>
                    <li className="term">Term of Use</li>
                    <li className="privacy">Privacy Policy</li>
                </ul>
              </div>
              <div className="icons col-sm-4 col-xs-6">
                  <ul>
                      <a target="_blank" href="https://www.facebook.com/pages/Screen-%E4%BB%8B%E9%9D%A2/696130310507423" ><li className="icon fb"></li></a>
                      <a target="_blank" href="https://twitter.com/OnScreenToday?lang=en&hc_location=ufi" ><li className="icon twitter"></li></a>
                      <a target="_blank" href="https://instagram.com/on_screen_today?hc_location=ufi"><li className="icon instagram"></li></a>
                  </ul>
              </div>
            </div>
            <div className="info">©2015 Screen All Rights Reserved</div>
          </div>
        );

        return jsx;
  }

}

export default Footer;
