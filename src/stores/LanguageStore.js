"use strict";

import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in PhotoStore
when the featured photos has been loaded.
 */

class LanguageStore extends BaseStore {

  static storeName = "LanguageStore"

  static handlers = {
    [Actions.LOAD_LANG_PREFERENCE]: "onGetLangPreference",
    [Actions.CHANGE_LANG]: "changeLanguage",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.lang = "eng";
  }

  changeLanguage (payload) {
      //debugger;
    this.lang = payload.lang;
  	this.emitChange();
  }

  onGetLangPreference(payload) {
  	this.lang = payload.lang;
    this.emitChange();
  }


  getData() {
    return {
      lang:  this.lang,
    };
  }

  dehydrate() {
    return {
      lang:  this.lang,
    };
  }

  rehydrate({ lang}) {
    this.lang = lang;
  }

}


export default LanguageStore;
