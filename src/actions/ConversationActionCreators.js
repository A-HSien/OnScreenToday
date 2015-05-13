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

  loadConversationDetail(context, {slug}, done) {
    debugger;
    if (context.getStore("ConversationStore").getConversationBySlugFromList(slug)) {
      return done();
    }


    context.service.read("conversationDetail", { slug}, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_CONVERSATION_DETAIL_FAILURE, {slug});
          return done(err);
        }

        context.dispatch(Actions.LOAD_CONVERSATION_DETAIL_SUCCESS, data);
        done();
      }

    );
  }

};

export default ConversationActionCreators;
