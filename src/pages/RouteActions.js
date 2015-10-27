// Actions to run when the router matches a route. Used in ./routes.js

import AboutActionCreators from "../actions/AboutActionCreators";
import ContentActionCreators from "../actions/ContentActionCreators";
import { setHtmlHead } from "../actions/HtmlHeadActionCreators";

function contentDetailPage(context, {type}, payload, done) {
  context.executeAction(ContentActionCreators.loadContentDetail, {
    slug: payload.params.slug,
    type: type
  }, (err) => {

    if (err) {
      return done(err);
    }
    context.executeAction(setHtmlHead, payload, done);
  });
};

function contentListPage(context, {type}, payload, done) {
  context.executeAction(ContentActionCreators.loadContentData, {type}, (err) => {
    if (err) {
      return done(err);
    }

    context.executeAction(setHtmlHead, payload, done);
  });
};

const RouteActions = {

  homePage(context, payload, done) {
    contentListPage(context, {type : 'all'}, payload, done);
  },

  callforartistPage(context, payload, done) {
    contentListPage(context, {type : 'callforartist'}, payload, done);
  },

  tuneinListPage(context, payload, done) {
    contentListPage(context, {type : 'tunedin'}, payload, done);
  },

  viewDetailPage(context, payload, done) {
    contentDetailPage(context, {type: "view"}, payload, done);
  },

  screenshotDetailPage(context, payload, done) {
    contentDetailPage(context, {type: "screenshot"}, payload, done);
  },

  screenshotListPage(context, payload, done) {
    contentListPage(context, {type : 'screenshot'}, payload, done);
  },

  screenPage(context, payload, done) {
    contentListPage(context, {type: 'all'}, payload, done);
  },

  fullscreenDetailPage(context, payload, done) {
    contentDetailPage(context, {type : 'fullscreen'}, payload, done);
  },

  offscreenDetailPage(context, payload, done) {
    contentDetailPage(context, {type : 'offscreen'}, payload, done);
  },

  conversationDetailPage(context, payload, done) {
    contentDetailPage(context, {type: "conversation"}, payload, done);
    contentListPage(context, {type : 'conversation'}, payload, done);
  },

  conversationListPage(context, payload, done) {
    contentListPage(context, {type : 'conversation'}, payload, done);
  },

  aboutPage(context, payload, done) {
    context.executeAction(AboutActionCreators.loadAboutData, {}, (err) => {

      if (err) {
        return done(err);
      }

      // set the html <head> only once we have the store filled with data
      context.executeAction(setHtmlHead, payload, done);
    });
  },

  badPage(context, payload, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  },

 

};



export default RouteActions;
