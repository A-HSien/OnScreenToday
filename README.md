# onscreentoday


It is built on [express](http://expressjs.com) using [React](https://facebook.github.io/react) and [Flux](https://facebook.github.io/flux) with [yahoo/fluxible](http://fluxible.io). It is developed with [webpack](http://webpack.github.io) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/) and written with [babeljs](http://babeljs.io) with the help of [eslint](http://eslint.org).


**Clone this repo**

> **Note** This app has been tested on node 0.12.x

```
cd onscreentoday
npm install
```

**Start the app**

```bash
npm run dev
```

and open [localhost:3000](http://localhost:3000).

You can also try the built app:

```bash
npm run build   # First, build for production
npm run prod    # then, run the production version
```

then open [localhost:8080](http://localhost:8080).

## Table of Contents

* [Application structure](#application-structure)
  * [The fluxible app](#the-fluxible-app)
  * [Async data](#async-data)
  * [Router](#router)
  * [Stores](#stores)
    * [Resource stores](#resource-stores)
    * [The RouteStore](#the-routestore)
      * [Loading state](#loading-state)
      * [Route errors](#route-errors)
    * [The HtmlHeadStore](#the-htmlheadstore)
* [Internationalization (i18n)](#internationalization-i18n)
  * [How the user’s locale is detected](#how-the-user’s-locale-is-detected)
  * [The difficult parts](#the-difficult-parts)
  * [Webpack on the rescue](#webpack-on-the-rescue)
  * [Internationalization, the flux way](#internationalization-the-flux-way)
  * [Sending the locale to the API](#sending-the-locale-to-the-api)
* [Development](#development)
  * [Webpack](#webpack)
  * [Babeljs](#babeljs)
  * [Linting](#linting)
  * [Testing](#testing)
  * [Debugging](#debugging)


## Application structure

```bash
$ tree src

├── Application.js       # The root Application component
├── actions              # Actions creators
├── app.js               # The Fluxible app
├── assets               # Dir with static files
├── client.js            # Entry point for the client
├── components           # React components
├── config.js            # Load the config on dev or prd
├── constants            # Constants values (e.g. action types)
├── pages                # Contains route handlers components
│   ...
│   └── RouteActions.js  # Actions executed when rendering a route
├── public               # Only in prod: contains static assets loaded with webpack
├── routes.js            # Routes config
├── server               # Server-side-only code
│   ├── ga.js            # Contains Google Analytics code to inject into HtmlDocument
│   ├── HtmlDocument.js  # Components containing <html>...</html> page
│   └── render.js        # Middleware to render HtmlDocument server-side
├── server.js            # Run the express server, setup fetchr service
├── services             # Fetchr services (e.g. load data from 500px API)
├── stores               # Flux stores
├── style                # Contains the Sass styles
└── utils                # Some useful utils
```

### The fluxible app

The [src/app.js](src/app.js) file is the core of the Fluxible application:

- it configures Fluxible with [Application.js](src/Application.js) as the root component.
- it registers the stores so they can work on the same React context
- it adds the [routr plugin](https://github.com/yahoo/fluxible-plugin-routr) (the routing interface) and the [fetchr plugin]((https://github.com/yahoo/fluxible-plugin-fetchr)) (to share the same API requests both client and server-side)
- it makes possible to dehydrate the stores [on the server](src/server/render.js) and rehydrate them [on the client](src/client.js)
- it provides a `componentActionHandler` to make the app react to errors sent by flux actions

### Async data

I used [Fetchr](https://github.com/yahoo/fetchr) and the relative [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr).
[Fetchr services](src/services) run only on server and send [superagent](http://visionmedia.github.com/superagent) requests to 500px.


### Router

Using [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr), I could keep the router in a "flux flow": the current route is stored in the [RouteStore](src/stores/RouteStore.js), and the [Application component](src/Application.js) listens to it to know which [page component](src/pages) should render.

Before setting the route, this plugin can execute an action to prefill the stores with the required data. (see the `action` attributes in the routes’s [config](src/routes.js).

> Note that these actions can send an error to the `done()` callback, so that we can render an error page, as explained below in the "RouteStore" section.

### Stores

Instead of directly listening to stores, components are wrapped in an high-order component using the fluxible `connectToStores` add-on. See for example the [ConversationDetailPage](src/pages/ConversationDetailPage.js.

Other components need to access the store data without listening to the stores: they make use of the fluxible context, requiring the `getStore` function in the context's type. This is the case of [NavBar](src/components/NavBar.js).

#### Resource stores

While REST APIs usually return collections as arrays, a resource store keeps items as big object – like the [ContentStore](src/stores/ContentStore.js). This simplifies the progressive resource updates that may happen during the app’s life.


#### The RouteStore

The [RouteStore](src/stores/RouteStore.js) keeps track of the current route.

##### Loading state

When a route is loading (e.g. waiting for the API response), the store set the `loading` property. The Application component will then render a loading page.

##### Route errors

A route error happens when a route is not found or when the service fetching critical data has returned an error.

In these cases, the RouteStore set its `currentPageName` to `404` or `500`, so that the Application component can render a [`NotFoundPage`](src/pages/NotFoundPage.js) or an [`ErrorPage`](src/pages/ErrorPage.js).

> Note that a not-found route may come from the router itself (i.e. the route is missing in the [config](src/routes.js)) but also when a route action sends to the callback an error with `{status: 404}`.

#### The HtmlHeadStore

The [HtmlHeadStore](src/stores/HtmlHeadStore.js) is a special store used to set the `<head>` meta-tags in the `HtmlDocument` component, during server-side rendering. It is also listened by the `Application` component to change the browser's `document.title`.

The `onHtmlHeadSet` handler set the data according to the current route. This store uses data from other stores, such the titles of the photos, or the intl messages from the `IntlStore`. It is important that this handler is executed after the other stores have been filled up with their data. The HtmlHeadStore listens to the `SET_HTML_HEAD` action (dispatched by an action creator in [RouteActions](src/pages/RouteActions.js)) *only* after fetching the data required to render a page.


### Webpack on the rescue

For this purpose, I used webpack's `require.ensure()` to split `Intl` and localized data in multiple chunks. Only after they have been downloaded, the app can be mounted. See the `loadIntlPolyfill()` and `loadLocaleData()` functions in [IntlUtils](src/utils/IntlUtils.js): they return a promise that is resolved when the webpack chunks are downloaded and `require`d.

They are used in [client.js](client.js) before mounting the app.

> **Important**: since `react-intl` assumes `Intl` is already in the global scope, we can't import the fluxible app (which imports react-intl in some of its components) *before* polyfilling `Intl`. That's why you see in [client.js](src/client.js) `require("./app")` inside the in the `renderApp()` function, and not as `import` on the top of the file.

### Sending the locale to the API

While this is not required by the 500px API, we can send the current locale to the API so it can deliver localized content. This is made very easy by the Fetchr services, since they expose the `req` object: see for example the [photo service](src/services/photo.js).

## Development

### Webpack

Webpack is used as commonjs module bundler, css builder (using sass-loader) and assets loader (images and svg files).

The [development config](./webpack/dev.config.js) enables source maps, the [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/). It loads CSS styles with `<style>`, to enable styles live reload). This config is used by the [webpack-dev-server](webpack/server.js), serving the files bundled by Webpack.

The [production config](./webpack/prod.config.js) is used to build the production version with `npm run build`: similar to the dev config, it minifies the JS files, removes the `debug` statements and produces an external `.css` file. Files are served from a express static directory (i.e. `/public/assets`).

Both configs set a `process.env.BROWSER` global variable, useful to require CSS from the components, e.g:

```js
// MyComponent
if (process.env.BROWSER) {
  require('../style/MyComponent.scss');
}
```

Files loaded by webpack are hashed. Javascript and CSS file names are [saved](webpack/plugins/write-stats.js) in a JSON file and passed to the [HtmlDocument](src/server/HtmlDocument.js) component from the [server/render](src/server/render.js) middleware.

### Babeljs

This app is written in Javascript-[Babel](https://babeljs.io/). Babel config is in [.babelrc](.babelrc) (it only enables class properties). On Sublime Text, I installed [babel-sublime](https://github.com/babel/babel-sublime) to have full support of the Babel syntax!

### Linting

I use [eslint](http://eslint.org) with [babel-eslint](https://github.com/babel/babel-eslint) and the [react plugin](https://github.com/yannickcr/eslint-plugin-react) – config in [.eslintrc](.eslintrc). I also configured Sublime Text with [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint).

Code style with [jscs](http://jscs.info) using [a config](.jscsrc) inspired by Airbnb's one. On Sublime Text, I installed [SublimeLinter-jscs](https://packagecontrol.io/packages/SublimeLinter-jscs).

You can use this command to run both linters from the command line:

```bash
npm run linter
```

I use [SublimeLinter-scss-lint](https://github.com/attenzione/SublimeLinter-scss-lint) for linting the Sass files ([.scss-lint.yml](.scss-lint.yml)).

### Testing

I'm still a beginner with Flux unit testing – so tests are missing :-) I use [mocha](http://mochajs.org), using [chai](http://chaijs.com) as assertion library.

To run the tests, use this command:

```
npm test
```

There's also the test coverage with [isparta](https://github.com/douglasduteil/isparta) (based on [istanbul](https://github.com/gotwarlost/istanbul)):

```bash
npm run coverage
```

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable the logging from Node by setting the `DEBUG` environment variable before running the server:

```bash
# enable logging for onscreentoday and Fluxible
DEBUG=onscreentoday,Fluxible node index

# disable logging
DEBUG= node index
```

From the **browser**, you can enable/disable them by sending this command in the JavaScript console:

```js
debug.enable('onscreentoday')
debug.disable()
// then, refresh!
```


