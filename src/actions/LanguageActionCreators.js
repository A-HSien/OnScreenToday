"use strict";

import Actions from "../constants/Actions";

var ls = global.localStorage;
var KEY = "screen-lang";

const LanguageActionCreators = {

  getLangPreference(context, {}, done) {

      context.service.read("lang", {}, {timeout: 20000 },
            (err, data) => {


              if (err) {
                return done(err);
              }
              context.dispatch(Actions.LOAD_LANG_PREFERENCE, data);
              done();
            }
      );

  },

  changeLanguage(context, payload, done) {


    context.service.update("lang",{},  payload, {timeout: 20000 },
        (err, data) => {


          if (err) {
            return done(err);
          }
          context.dispatch(Actions.CHANGE_LANG, data);
          done();
        }
    );

  }

};

export default LanguageActionCreators;
