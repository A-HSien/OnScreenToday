import Actions from "../constants/Actions";

const AboutActionCreators = {

  loadAboutData(context, {}, done) {

    // context.dispatch(Actions.LOAD_ABOUT_DATA, { feature });

    context.service.read("about", {}, { timeout: 20000 },
      (err, data) => {

        
        if (err) {
          context.dispatch(Actions.LOAD_ABOUT_DATA_FAILURE);
          return done(err);
        }

        context.dispatch(Actions.LOAD_ABOUT_DATA_SUCCESS, data);
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
