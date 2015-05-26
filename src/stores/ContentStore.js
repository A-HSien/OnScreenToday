"use strict";

import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import _ from "lodash";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in PhotoStore
when the featured photos has been loaded.
 */

class ContentStore extends BaseStore {

  static storeName = "ContentStore"

  static handlers = {
    [Actions.LOAD_CONTENT_DATA_SUCCESS]: "onLoadContentDataSuccess",
    [Actions.LOAD_CONTENT_DETAIL_SUCCESS]: "onLoadContentDetailSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.contentData = false;
    this.contentDetail = false;

  }

  onLoadContentDetailSuccess(payload) {
    this.contentDetail = payload;
    this.emitChange();
  }

  onLoadContentDataSuccess(payload) {
  	// console.log("ContentStore onLoadSuccess:", payload);
    this.contentData = payload;
    this.emitChange();
  }

  getData() {
    return {
      contentData:  this.contentData,
      contentDetail:  this.contentDetail
    };
  }

  getContentBySlugFromList(slug) {
    return _.find(this.contentData, content => {
      return content.slug === slug;
    });
  }

  getContentBySlug(slug) {

    var data = this.getContentBySlugFromList(slug) || false;

    if (!data) {
      data = this.contentDetail;
    }

    return data;
  }

  getExtraContent(slug) {
    var extra = _.filter(this.contentData, content => {
      return content.slug !== slug;
    });

    return extra;
  }

  dehydrate() {
    return {
      contentData:  this.contentData,
      contentDetail:  this.contentDetail
    };
  }

  rehydrate({ contentData, contentDetail}) {
    this.contentData = contentData;
    this.contentDetail = contentDetail;

  }

}


export default ContentStore;
