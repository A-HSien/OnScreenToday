"use strict";

import Actions from "../constants/Actions";
import config from "../config"

const LanguageActionCreators = {

  getLangPreference(context, payload, done) {
		const lang = payload.params.lang;
		if (payload.params.lang && config.locales.contains(payload.params.lang)) {
			context.dispatch(Actions.LOAD_LANG_PREFERENCE, {lang: lang});
		}
		done();
  },

  changeLanguage(context, payload, done) {
		context.dispatch(Actions.CHANGE_LANG, payload);
		done();
  }

};

export default LanguageActionCreators;
