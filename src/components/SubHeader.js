"use strict";

import React, { PropTypes } from "react";

class SubHeader extends React.Component {


  render () {
        var jsx;

        jsx = (
            <div className="subHeader clearfix">
                <div className="left clearfix col-sm-6">
                    <div className="title">介面</div>
                    <div className="subTitle">
                        <ul>
                            <li>BROADCASTING</li>
                            <li>MEDIA ART</li>
                        </ul>
                    </div>
                </div>
                <div className="right clearfix ">
                    <div className="follow">Follow us</div>
                    <ul className="social">
                        <a target="_blank" className="icon fb" href="https://www.facebook.com/pages/Screen-%E4%BB%8B%E9%9D%A2/696130310507423"></a>
                        <a target="_blank" className="icon twitter" href="https://twitter.com/OnScreenToday?lang=en&hc_location=ufi"></a>
                        <a target="_blank" className="icon instagram" href="https://instagram.com/on_screen_today?hc_location=ufi"></a>
                    </ul>
                </div>
            </div>
        );

        return jsx;
    }

}

export default SubHeader;