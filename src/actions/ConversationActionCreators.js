import Actions from "../constants/Actions";

const ConversationActionCreators = {

  loadConversationData(context, {}, done) {

    // context.dispatch(Actions.LOAD_ABOUT_DATA, { feature });

    context.service.read("conversation", {}, { timeout: 20000 },
      (err, data) => {

        
        if (err) {
          context.dispatch(Actions.LOAD_CONVERSATION_DATA_FAILURE);
          return done(err);
        }

        context.dispatch(Actions.LOAD_CONVERSATION_DATA_SUCCESS, data);
        done();
      }

    );
  },

  // showBio(context, payload, done) {

  //   context.dispatch(Actions.SHOW_BIO, payload);
  //   done();
  // },

  // hideBio(context, {}, done) {
  //   context.dispatch(Actions.HIDE_BIO, {});
  //   done();
  // }

};

export default ConversationActionCreators;
