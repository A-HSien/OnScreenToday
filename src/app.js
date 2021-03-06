import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import routrPlugin from "fluxible-plugin-routr";
import RouteActionCreators from "./actions/RouteActionCreators";
import routes from "./routes";

import Application from "./Application";

import FeaturedStore from "./stores/FeaturedStore";
import HtmlHeadStore from "./stores/HtmlHeadStore";
import RouteStore from "./stores/RouteStore";
import AboutStore from "./stores/AboutStore";
import LanguageStore from "./stores/LanguageStore";
import ContentStore from "./stores/ContentStore";

const app = new Fluxible({

  component: Application,

  componentActionHandler(context, { err }, done) {

    // This action handler is called for any action executed in the component's
    // context. It's the right place to intercept action errors and display an
    // error page.

    if (err) {
      const { status, statusCode } = err;

      if (status && status === 404 || statusCode && statusCode === 404) {
        context.executeAction(RouteActionCreators.show404, { err }, done);
      }
      else {
        console.log(err.stack || err);
        context.executeAction(RouteActionCreators.show500, { err }, done);
      }

      return;
    }

    done();
  }

});

app.plug(fetchrPlugin({
  xhrPath: "/api/v2"
}));

app.plug(routrPlugin({
  routes: routes
}));

app.registerStore(FeaturedStore);
app.registerStore(HtmlHeadStore);
app.registerStore(RouteStore);
app.registerStore(AboutStore);
app.registerStore(LanguageStore);
app.registerStore(ContentStore);

export default app;
