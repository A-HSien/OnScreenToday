import Actions from "../constants/Actions";
import { getLangPreference } from "../actions/LanguageActionCreators";

const HtmlHeadActionCreators = {

  setHtmlHead(context, payload, done) {

    context.executeAction(getLangPreference, payload, (err) => {
      if (err) {
        return done(err);
      }
      // console.log("setHtmlHead payload", payload);
      context.dispatch(Actions.SET_HTML_HEAD, payload);

      done();
    });

  }

};

export default HtmlHeadActionCreators;
