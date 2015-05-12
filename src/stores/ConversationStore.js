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
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.conversationData = false;
  }

  onLoadConversationDataSuccess(payload) {
  	// console.log("ConversationStore onLoadSuccess:", payload);
    this.conversationData = payload;
    this.emitChange();
  }

  getData() {
    return {
      conversationData:  this.conversationData
    };
  }

  getConversationBySlug(slug) {
    return _.find(this.conversationData, conversation => {
      conversation.slug === slug
    });
  }

  dehydrate() {
    return {
      conversationData:  this.conversationData
    };
  }

  rehydrate({ conversationData}) {
    this.conversationData = conversationData;
  }

}


export default ConversationStore;
