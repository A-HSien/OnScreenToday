import Actions from "../constants/Actions";
import data_about from '../../db/about.js';

const AboutActionCreators = {

  loadAboutData(context, {}, done) {

    context.dispatch(Actions.LOAD_ABOUT_DATA, { });

    context.service.read("about", {}, { timeout: 2000 },
      (err, data) => {

        
        if (err) {
          context.dispatch(Actions.LOAD_ABOUT_DATA_FAILURE);
          return done(err);
        }
        console.log("loadAboutData: ", data);
        context.dispatch(Actions.LOAD_ABOUT_DATA_SUCCESS, data || data_about);
        done();
      }

    );
  },

  showBio(context, payload, done) {

    context.dispatch(Actions.SHOW_BIO, payload);
    done();
  },

  hideBio(context, {}, done) {
    context.dispatch(Actions.HIDE_BIO, {});
    done();
  }

};

export default AboutActionCreators;
