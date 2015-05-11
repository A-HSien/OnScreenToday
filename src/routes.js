
import RouteActions from "./pages/RouteActions";

import features from "./constants/features";

export default {

  conversations: {
    path: "/conversations",
    method: "get",
    action: RouteActions.conversationListPage
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
