import React from "react";

var SocialButtons = React.createClass({
	componentDidMount () {
		// Reload the widgets so that their icons display
		window.FB && window.FB.XFBML.parse();
		window.twttr && window.twttr.widgets.load();
	},
  render () {
    return (
      <div style={{lineHeight: "12px"}}>
        <span style={{padding: "2px"}}>
          <a href="https://twitter.com/share"
             className="twitter-share-button"
             data-show-count="false">Tweet</a>
        </span>
        <span className="fb-share-button"
              data-layout="button"
              data-size="small"
              data-mobile-iframe="true"
              style={{padding: "2px"}}>
          <a className="fb-xfbml-parse-ignore"
             target="_blank"
             href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</a>
        </span>
      </div>
    );
  }
});

module.exports = SocialButtons;
