"use strict";

import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in PhotoStore
when the featured photos has been loaded.
 */

class AboutStore extends BaseStore {

  static storeName = "AboutStore"

  static handlers = {
    [Actions.LOAD_ABOUT_DATA_SUCCESS]: "onLoadAboutDataSuccess",
    [Actions.SHOW_BIO]: "onShowBio",
    [Actions.HIDE_BIO]: "onHideBio"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.aboutData = false;
    this.bioTargetRef = false;
    this.bioData = false;
  }

  onShowBio ({targetRef, bioData}) {
    this.bioData = bioData;
    this.bioTargetRef = targetRef;
    this.emitChange();
  }

  onHideBio () {
    this.bioData = "";
    this.emitChange();
  }

  onLoadAboutDataSuccess(payload) {
  	// console.log("AboutStore onLoadSuccess:", payload);
    this.aboutData = payload;
    this.emitChange();
  }

  getData() {
    return {
      aboutData:  this.aboutData,
      bioData: this.bioData,
      bioTargetRef: this.bioTargetRef
    };
  }

  dehydrate() {
    return {
      aboutData:  this.aboutData,
      bioData: this.bioData,
      bioTargetRef: this.bioTargetRef
    };
  }

  rehydrate({ aboutData, bioData, bioTargetRef }) {
    this.aboutData = aboutData;
    this.bioData = bioData;
    this.bioTargetRef = bioTargetRef;
  }

}


export default AboutStore;
