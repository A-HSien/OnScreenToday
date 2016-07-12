import Actions from "../constants/Actions";

const ContentActionCreators = {

  loadContentData(context, {type, limit}, done) {

    // context.dispatch(Actions.LOAD_ABOUT_DATA, { feature });

    context.service.read("content", {type}, { timeout: 20000 },
      (err, data) => {

        
        if (err) {
          context.dispatch(Actions.LOAD_CONTENT_DATA_FAILURE);
          return done(err);
        }
        var result = [].concat(data);
        if(limit) {
          result = result.slice(0, limit).map((item) => {
            //hack: remove articles
            item.content.chn.article = "";
            item.content.chnt.article = "";
            item.content.eng.article = "";
            return item;
          });
        }

        context.dispatch(Actions.LOAD_CONTENT_DATA_SUCCESS, result);
        done();
      }

    );
  },

  loadContentDetail(context, {slug, type, limit}, done) {
    // debugger;
    if (context.getStore("ContentStore").getContentBySlugFromList(slug)) {
      return done();
    }


    context.service.read("contentDetail", { slug, type}, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_CONTENT_DETAIL_FAILURE, {slug});
          return done(err);
        }

        var result = [].concat(data);
        if(limit) {
          result = result.slice(0, limit);
        }

        context.dispatch(Actions.LOAD_CONTENT_DETAIL_SUCCESS, result);
        done();
      }

    );
  }

};

export default ContentActionCreators;
