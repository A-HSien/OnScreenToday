
import RouteActions from "./pages/RouteActions";

import features from "./constants/features";

export default {

  callforartists: {
    path: "/callforartists",
    method: "get",
    action: RouteActions.callforartistPage
  },

  tunedin: {
    path: "/tunedin",
    method: "get",
    action: RouteActions.tuneinListPage
  },

  view: {
    path: "/view/:slug",
    method: "get",
    action: RouteActions.viewDetailPage
  },

  views: {
    path: "/views",
    method: "get",
    action: RouteActions.viewListPage
  },

  screenshot: {
    path: "/screenshot/:slug",
    method: "get",
    action: RouteActions.screenshotDetailPage
  },

  screenshots: {
    path: "/screenshots",
    method: "get",
    action: RouteActions.screenshotListPage
  },

  fullscreen: {
    path: "/fullscreen/:slug",
    method: "get",
    action: RouteActions.fullscreenDetailPage
  },

  offscreen: {
    path: "/offscreen/:slug",
    method: "get",
    action: RouteActions.offscreenDetailPage
  },

  screens: {
    path: "/screens",
    method: "get",
    action: RouteActions.screenPage
  },

  conversations: {
    path: "/conversations",
    method: "get",
    action: RouteActions.conversationListPage
  },

  conversation: {
    path: "/conversation/:slug",
    method: "get",
    action: RouteActions.conversationDetailPage
  },

  home: {
    path: "/",
    method: "get",
    action: RouteActions.homePage
  },

  about: {
    path: "/about",
    method: "get",
    action: RouteActions.aboutPage
  },

  bad: {
    path: "/bad",
    method: "get",
    action: RouteActions.badPage
  }

};
