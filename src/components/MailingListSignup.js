import React, { Component } from "react";

class MailingListSignup extends Component {
    render () {
        return (
            <div id="mc_embed_signup">
                <form id="mc-embedded-subscribe-form" className="validate" action="//onscreentoday.us10.list-manage.com/subscribe/post?u=5d4dd0381b859e4dcfa018832&amp;id=d493e0d380" method="post" name="mc-embedded-subscribe-form" noValidate target="_blank">
                    <div id="mc_embed_signup_scroll">
                        <strong><label htmlFor="mce-EMAIL">Subscribe to Mail List</label></strong>
                    </div>
                    <div>
                        <input id="mce-EMAIL" className="email" name="EMAIL" required type="email" placeholder="email address" />
                        <div style={{position: "absolute", left: "-5000px"}}><input tabIndex="-1" name="b_5d4dd0381b859e4dcfa018832_d493e0d380" type="text" /></div>
                        <div className="clear" style={{marginTop: "5px"}}><input id="mc-embedded-subscribe" className="button btn btn-warning" name="subscribe" type="submit" value="Subscribe" /></div>
                    </div>
                </form>
            </div>
        );
    }
}

export default MailingListSignup;
