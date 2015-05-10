import keyMirror from "react/lib/keyMirror";

const Actions = keyMirror({

  CHANGE_ROUTE_SUCCESS: null,
  CHANGE_ROUTE_START: null,
  STATUS_404: null,
  STATUS_500: null,

  SET_HTML_HEAD: null,

  LOAD_FEATURED_PHOTOS_START: null,
  LOAD_FEATURED_PHOTOS_SUCCESS: null,
  LOAD_FEATURED_PHOTOS_FAILURE: null,

  LOAD_PHOTO_START: null,
  LOAD_PHOTO_SUCCESS: null,
  LOAD_PHOTO_FAILURE: null,

  LOAD_INTL: null,


  LOAD_ABOUT_DATA: null,
  LOAD_ABOUT_DATA_SUCCESS: null,
  LOAD_ABOUT_DATA_FAILURE: null,
  SHOW_BIO: null,
  HIDE_BIO: null,


  CHANGE_LANG: null,
  GET_LANG_PREFERENCE: null,
  LOAD_LANG_PREFERENCE: null

});

export default Actions;
