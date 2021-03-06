import React, { PropTypes } from "react";

import { trackingId } from "../config";
import ga from "./ga";
import fb from "./fb";
import snippet from "./richSnippet";
import { provideContext } from "fluxible/addons";

class HtmlDocument extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    script: [],
    css: []
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { state, markup, script, css, lang } = this.props;
    const htmlHead = this.context.getStore("HtmlHeadStore");

    return (
      <html lang={lang}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

          <title>{ htmlHead.getTitle() }</title>

          <meta name="description" content={ htmlHead.getDescription() } />
          <meta name="keywords" content={ htmlHead.getKeywords() } />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={ htmlHead.getSiteName() } />
          <meta property="og:title" content={ htmlHead.getTitle() } />
          <meta property="og:description" content={ htmlHead.getDescription() } />
          <meta property="og:url" content={ htmlHead.getCurrentUrl() } />
          <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" type="text/css" rel="stylesheet" media="screen,projection"/>
          <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />

          { htmlHead.getImages().map(url => <meta property="og:image" content={ url } />) }

          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }

          { trackingId &&
            <script dangerouslySetInnerHTML={{__html: ga.replace("{trackingId}", trackingId)}} />
          }

          <script type="application/ld+json" 
            dangerouslySetInnerHTML={{
              __html: snippet(htmlHead.getTitle(),
                htmlHead.getImages().map(url => `"${url}"`),
                htmlHead.getDescription())}}/>
        </head>

        <body>
          <div id="root"></div>
          <div id="fb-root"></div>
          <script dangerouslySetInnerHTML={{__html: fb}} />
          <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
          <script dangerouslySetInnerHTML={{__html: state}} />
          { script.map((src, k) => <script key={k} src={src} />) }
        </body>
      </html>
    );
  }
}

HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;
