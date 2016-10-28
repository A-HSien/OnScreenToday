import React from "react";

var SocialButtons = React.createClass({
  render () {
    return (
      <span style={{lineHeight: "12px"}}>
        <span style={{padding: "2px"}}>
          <a href="https://twitter.com/share"
             className="twitter-share-button"
             data-show-count="false">Tweet</a>
        </span>
        <span className="fb-share-button"
              data-href="https://developers.facebook.com/docs/plugins/"
              data-layout="button"
              data-size="small"
              data-mobile-iframe="true"
              style={{padding: "2px"}}>
          <a className="fb-xfbml-parse-ignore"
             target="_blank"
             href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</a>
        </span>
      </span>
    );
  }
});

module.exports = SocialButtons;
