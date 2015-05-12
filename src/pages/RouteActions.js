// Actions to run when the router matches a route. Used in ./routes.js

import PhotoActionCreators from "../actions/PhotoActionCreators";
import AboutActionCreators from "../actions/AboutActionCreators";
import ConversationActionCreators from "../actions/ConversationActionCreators";
import { setHtmlHead } from "../actions/HtmlHeadActionCreators";

const RouteActions = {


  conversationDetailPage(context, payload, done) {
    context.executeAction(ConversationActionCreators.loadConversationDetail, {
      slug: payload.params.slug
    }, (err) => {

      if (err) {
        return done(err);
      }

      context.executeAction(setHtmlHead, payload, done);
    });
  },

  conversationListPage(context, payload, done) {
    context.executeAction(ConversationActionCreators.loadConversationData, {}, (err) => {
      if (err) {
        return done(err);
      }

      // set the html <head> only once we have the store filled with data
      context.executeAction(setHtmlHead, payload, done);
    });
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

  featuredPage(context, payload, done) {
    context.executeAction(PhotoActionCreators.loadFeaturedPhotos, {
      feature: payload.params.feature
    }, (err) => {

      if (err) {
        return done(err);
      }

      // set the html <head> only once we have the store filled with data
      context.executeAction(setHtmlHead, payload, done);
    });
  },

  photoPage(context, payload, done) {
    context.executeAction(PhotoActionCreators.loadPhoto, {
      id: payload.params.id
    }, (err) => {

      if (err) {
        return done(err);
      }

      context.executeAction(setHtmlHead, payload, done);
    });
  },

  badPage(context, payload, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  }

};

export default RouteActions;
