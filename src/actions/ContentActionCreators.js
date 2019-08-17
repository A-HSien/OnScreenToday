import Actions from "../constants/Actions";

const ContentActionCreators = {

  loadContentData(context, { type }, done) {
    debugger;
    // context.dispatch(Actions.LOAD_ABOUT_DATA, { feature });

    context.service.read("content", { type }, { timeout: 20000 },
      (err, data) => {


        if (err) {
          context.dispatch(Actions.LOAD_CONTENT_DATA_FAILURE);
          return done(err);
        }
        var result = [].concat(data);
        context.dispatch(Actions.LOAD_CONTENT_DATA_SUCCESS, result);
        done();
      }

    );
  },

  loadContentDetail(context, { slug, type }, done) {
    debugger;
    /*     if (context.getStore("ContentStore").getContentBySlugFromList(slug)) {
          return done();
        } */


    context.service.read("contentDetail", { slug, type }, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_CONTENT_DETAIL_FAILURE, { slug });
          return done(err);
        }

        // var result = [].concat(data);

        context.dispatch(Actions.LOAD_CONTENT_DETAIL_SUCCESS, data[0]);
        done();
      }

    );
  }

};

export default ContentActionCreators;
