"use strict";

import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import _ from "lodash";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in PhotoStore
when the featured photos has been loaded.
 */

class ConversationStore extends BaseStore {

  static storeName = "ConversationStore"

  static handlers = {
    [Actions.LOAD_CONVERSATION_DATA_SUCCESS]: "onLoadConversationDataSuccess",
    [Actions.LOAD_CONVERSATION_DETAIL_SUCCESS]: "onLoadConversationDetailSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.conversationData = false;
    this.conversationDetail = false;

  }

  onLoadConversationDetailSuccess(payload) {
    this.conversationDetail = payload;
    this.emitChange();
  }

  onLoadConversationDataSuccess(payload) {
  	// console.log("ConversationStore onLoadSuccess:", payload);
    this.conversationData = payload;
    this.emitChange();
  }

  getData() {
    return {
      conversationData:  this.conversationData,
      conversationDetail:  this.conversationDetail
    };
  }

  getConversationBySlugFromList(slug) {
    return _.find(this.conversationData, conversation => {
      return conversation.slug === slug;
    });
  }

  getConversationBySlug(slug) {

    var data = this.conversationDetail;

    if (!data) {
      data = this.getConversationBySlugFromList(slug);
    }

    return data;
  }

  dehydrate() {
    return {
      conversationData:  this.conversationData,
      conversationDetail:  this.conversationDetail
    };
  }

  rehydrate({ conversationData, conversationDetail}) {
    this.conversationData = conversationData;
    this.conversationDetail = conversationDetail;

  }

}


export default ConversationStore;
