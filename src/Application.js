import React, { PropTypes } from "react";
import { isEqual } from "lodash";
import { provideContext, connectToStores } from "fluxible/addons";

import { RouterMixin } from "flux-router-component";

import Page from "./components/Page";

import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ConversationListPage from "./pages/ConversationListPage";
import ConversationDetailPage from "./pages/ConversationDetailPage";
import ScreenshotPage from "./pages/ScreenshotPage";
import ScreenshotDetailPage from "./pages/ScreenshotDetailPage";
import ScreenPage from "./pages/ScreenPage";
import OffScreenDetailPage from "./pages/OffScreenDetailPage";
import FullScreenDetailPage from "./pages/FullScreenDetailPage";
import ViewListPage from "./pages/ViewListPage";
import ViewDetailPage from "./pages/ViewDetailPage";
import TunedinPage from "./pages/Tunedin";
import CallforartistPage from "./pages/CallforartistPage";
import CommercialProjectsListPage from "./pages/CommercialProjectsListPage";
import CommercialProjectsDetailPage from "./pages/CommercialProjectsDetailPage";
import trackPageView from "./utils/trackPageView";

const debug = require("debug")("onscreentoday");

if (process.env.BROWSER) {
  require("./style/Application.scss");
}

let Application = React.createClass({

  propTypes: {
    context: PropTypes.object.isRequired,
    pageName: PropTypes.string,
    route: PropTypes.object,
    err: PropTypes.object,
    documentTitle: PropTypes.string
  },

  // RouterMixin needs the route in the component state
  getInitialState() {
    return {
      route: this.props.route
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.route, nextProps.route)) {
      this.setState({
        route: nextProps.route
      });
    }
  },

  componentDidUpdate(prevProps) {
    const { documentTitle, route } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }

    if (!isEqual(route, prevProps.route)) {
      trackPageView();
    }
  },

  mixins: [RouterMixin],

  render() {
    const { pageName, route, err, isLoading } = this.props;
    return (
      <Page footer={!isLoading}>
        {
          pageName === "404" ?
            <NotFoundPage /> :

          pageName === "500" ?
            <ErrorPage err={err} /> :

          isLoading ?
            <LoadingPage /> :

          this.renderRoute(route)

        }
      </Page>
    );
  },

  renderRoute(route) {

    debug("Rendering route %s", route.url);

    let RouteHandler;

    switch (route.name) {
      case "home":
        RouteHandler = HomePage;
      break;
      case "about":
        RouteHandler = AboutPage;
        break;
      case "conversations":
        RouteHandler = ConversationListPage;
        break;
      case "conversation":
        RouteHandler = ConversationDetailPage;
        break;
      case "screenshots":
        RouteHandler = ScreenshotPage;
        break;
      case "screenshot": 
        RouteHandler = ScreenshotDetailPage;
        break;
      case "screens":
        RouteHandler = ScreenPage;
        break;
      case "fullscreen": 
        RouteHandler = FullScreenDetailPage;
        break;
      case "offscreen": 
        RouteHandler = OffScreenDetailPage;
        break;          
      case "views":
        RouteHandler = ViewListPage;
        break;
      case "view":
        RouteHandler = ViewDetailPage;
        break;
      case "tunedin":
        RouteHandler = TunedinPage;
        break;
      case "callforartists":
        RouteHandler = CallforartistPage;
        break;
      case "commercialProjects":
        RouteHandler = CommercialProjectsListPage;
        break;
      case "commercialProject":
        RouteHandler = CommercialProjectsDetailPage;
        break;
      default:
        console.warn(`Missing handler for route with name ${route.name}`);
        RouteHandler = NotFoundPage;
      break;
    }

    return <RouteHandler {...route.params} />;
  }

});

Application = connectToStores(Application, ["RouteStore", "HtmlHeadStore"], (stores) => ({
    pageName: stores.RouteStore.getCurrentPageName(),
    route: stores.RouteStore.getCurrentRoute(),
    err: stores.RouteStore.getNavigationError(),
    isLoading: stores.RouteStore.isLoading(),
    documentTitle: stores.HtmlHeadStore.getTitle()
  })
);

// wrap application in the fluxible context
Application = provideContext(Application);

export default Application;
