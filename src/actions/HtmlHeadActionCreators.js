import Actions from "../constants/Actions";
import { getLangPreference } from "../actions/LanguageActionCreators";

const HtmlHeadActionCreators = {

  setHtmlHead(context, payload, done) {

    context.executeAction(getLangPreference, payload, (err) => {
      if (err) {
        return done(err);
      }

      context.dispatch(Actions.SET_HTML_HEAD, payload);

      done();
    });

  }

};

export default HtmlHeadActionCreators;
