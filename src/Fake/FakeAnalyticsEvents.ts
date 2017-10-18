import { IClickEvent, ISearchEvent } from "coveo-search-ui";

export function createFakeSearchEvent(token: string = "foo"): ISearchEvent {
  return {
    actionCause: token + "actionCause",
    actionType: token + "actionType",
    device: token + "device",
    mobile: false,
    originLevel1: token + "originLevel1",
    originLevel2: token + "originLevel2",
    originContext: "context",
    language: token + "language",
    responseTime: 0,
    searchQueryUid: token + "searchQueryUid",
    queryPipeline: token + "queryPipeline",
    splitTestRunName: token + "splitTestRunName",
    splitTestRunVersion: token + "splitTestRunVersion",
    queryText: token + "queryText",
    numberOfResults: 0,
    resultsPerPage: 0,
    pageNumber: 0,
    advancedQuery: token + "advancedQuery",
    didYouMean: false,
    contextual: false
  };
}

export function createFakeClickEvent(token: string = "foo"): IClickEvent {
  return {
    actionCause: token + "actionCause",
    actionType: token + "actionType",
    device: token + "device",
    mobile: false,
    originLevel1: token + "originLevel1",
    originLevel2: token + "originLevel2",
    originContext: "context",
    language: token + "language",
    responseTime: 0,
    searchQueryUid: token + "searchQueryUid",
    queryPipeline: token + "queryPipeline",
    splitTestRunName: token + "splitTestRunName",
    splitTestRunVersion: token + "splitTestRunVersion",
    documentUri: token + "documentUri",
    documentUriHash: token + "documentUriHash",
    documentUrl: token + "documentUrl",
    documentTitle: token + "documentTitle",
    documentCategory: token + "documentCategory",
    collectionName: token + "collectionName",
    sourceName: token + "sourceName",
    documentPosition: 0,
    viewMethod: token + "viewMethod",
    rankingModifier: token + "rankingModifier"
  };
}
