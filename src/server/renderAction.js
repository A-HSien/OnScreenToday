import actionUtils from "fluxible-action-utils/async";

import { navigateAction } from "flux-router-component";
import LanguageActionCreators from "../actions/LanguageActionCreators";

// Actions to be executed before to render a request server-side,
function renderAction(context, { lang, url }, done) {

  actionUtils.executeMultiple(context, {

    changeLanguage: {
      action: LanguageActionCreators.changeLanguage,
      isCritical: true,
      params: { lang }
    },

    navigate: {
      action: navigateAction,
      isCritical: true,
      params: { url }
    }
  }, (actionErrors) => {
    let err = null;

    if (actionErrors) {
      err = actionErrors.navigate || actionErrors.loadIntlMessages;
    }

    done(err);
  });

}

export default renderAction;
