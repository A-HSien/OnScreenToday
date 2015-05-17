import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import IntlMessageFormat from "intl-messageformat";
import _ from "lodash";

const SITE_NAME = "SREEN | 介面";
const BASE_URL = "http://onscreentoday.com";
const meta_map = {
  "meta": {
      "title": "SCREEN | 介面",
      "description": "Look on SCREEN for the sharpest image of media art today. Through news coverage, art criticism and curatorial projects, we aim to collect information about media art in one online space.",
      "loadingTitle": "Loading…",
      "errorTitle": "Error displaying this page",
      "notFoundTitle": "Page not found"
    },


    "content": {

      "documentTitle": ({name, user}) => {
        return `SCREEN | 介面: ${name} – by ${user}`;
      },
      "documentDescription": ({description}) => {
        return `${description}`;
      }

    }

};

class HtmlHeadStore extends BaseStore {

  static storeName = "HtmlHeadStore"

  static handlers = {
    [Actions.SET_HTML_HEAD]: "onHtmlHeadSet",

    [Actions.CHANGE_ROUTE_START]: "onChangeRouteStart",
    [Actions.STATUS_404]: "on404Error",
    [Actions.STATUS_500]: "on500Error"

  }

  constructor(dispatcher) {
    super(dispatcher);
    this.siteName = SITE_NAME;
    this.initialize();
    this.currentUrl = null;
  }

  initialize() {
    this.title = this.formatMessage("meta.title");
    this.description = this.formatMessage("meta.description");
    this.images = [];
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getSiteName() {
    return this.siteName;
  }

  getCurrentUrl() {
    const route = this.dispatcher.getStore("RouteStore").getCurrentRoute();
    if (!route) {
      return "";
    }
    return `${BASE_URL}${route.url}`;
  }

  getImages() {
    return this.images;
  }

  formatMessage(path, values={}) {
    const pathParts = path.split(".");
    let message;
    try {
      message = pathParts.reduce((obj, pathPart) => obj[pathPart], meta_map);
    } finally {
      if (message === undefined) {
        throw new ReferenceError("Could not find Intl message: " + path);
      }
    }

    if (_.isFunction(message)) {
      return message.call(this, values);
    } else {
      return message;
    }
  }

  onHtmlHeadSet(route) {
    // console.log(route);
    let {lang} = this.dispatcher.getStore("LanguageStore");

    switch (route.name) {
      case "conversation":
      case "view":
      case "screenshot":
        let store = this.dispatcher.getStore("ContentStore");
        let content = store.getContentBySlug(route.params.slug)[lang];
        let images = _.map(content.images, function(img) {
          return BASE_URL + img.url;
        });

        this.title = this.formatMessage("content.documentTitle", {
          name: content.title,
          user: content.author
        });

        this.description = this.formatMessage("content.documentDescription", {
          description: content.description
        });




        this.images = images;
      break;

      default:
        // Just set the defaults
        this.initialize();
      break;
    }

    this.emitChange();
  }

  onChangeRouteStart() {
    this.title = this.formatMessage("meta.loadingTitle");
    this.emitChange();
  }

  on500Error() {
    this.title = this.formatMessage("meta.errorTitle");
    this.emitChange();
  }

  on404Error() {
    this.title = this.formatMessage("meta.notFoundTitle");
    this.emitChange();
  }


}

export default HtmlHeadStore;
