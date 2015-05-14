
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
    action: RouteActions.featuredPage
  },

  about: {
    path: "/about",
    method: "get",
    action: RouteActions.aboutPage
  },

  featured: {
    path: `/featured/:feature(${features.join("|")})`,
    method: "get",
    action: RouteActions.featuredPage
  },

  photo: {
    path: "/photo/:id",
    method: "get",
    action: RouteActions.photoPage
  },

  bad: {
    path: "/bad",
    method: "get",
    action: RouteActions.badPage
  }

};
