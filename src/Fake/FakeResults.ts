import { mockSearchInterface } from "../MockEnvironment";
import { IQueryResult, QueryUtils, IQueryResults } from "coveo-search-ui";

export function createFakeResults(
  count: number = 10,
  token: string = ""
): IQueryResults {
  const results: IQueryResult[] = [];
  for (let i = 0; i < count; ++i) {
    results.push(createFakeResult(token + i.toString()));
  }

  return {
    searchUid: QueryUtils.createGuid(),
    pipeline: "pipeline",
    splitTestRun: "splitTestRunName",
    totalCount: count !== 0 ? count + 1 : 0,
    totalCountFiltered: count !== 0 ? count + 1 : 0,
    duration: 321,
    indexDuration: 123,
    clientDuration: 456,
    results: results,
    groupByResults: [],
    queryCorrections: [],
    _folded: undefined,
    termsToHighlight: undefined,
    phrasesToHighlight: undefined,
    triggers: [],
    searchAPIDuration: 288
  };
}

export function createFakeResultsWithChildResults(
  count: number = 10,
  numberOfChildResults: number = 5,
  totalNumberOfChildResult: number = 5
): IQueryResults {
  const results: IQueryResult[] = [];
  for (let i = 0; i < count; ++i) {
    results.push(
      createFakeResultWithChildResult(
        i.toString(),
        numberOfChildResults,
        totalNumberOfChildResult
      )
    );
  }

  return {
    searchUid: QueryUtils.createGuid(),
    totalCount: count !== 0 ? count + 1 : 0,
    totalCountFiltered: count !== 0 ? count + 1 : 0,
    duration: 321,
    indexDuration: 123,
    clientDuration: 456,
    results: results,
    groupByResults: [],
    queryCorrections: [],
    _folded: undefined,
    termsToHighlight: undefined,
    phrasesToHighlight: undefined,
    triggers: [],
    searchAPIDuration: 288
  };
}

export function createFakeResult(token: string = "foo"): IQueryResult {
  return <IQueryResult>{
    title: "Title" + token,
    titleHighlights: [],
    uri: "http://uri." + token + ".com",
    printableUri: "http://printable.uri." + token + ".com",
    printableUriHighlights: [],
    clickUri: "http://click.uri." + token + ".com",
    uniqueId: "uniqueId" + token,
    excerpt: "excerpt" + token,
    excerptHighlights: [],
    firstSentences: "firstSentences" + token,
    firstSentencesHighlights: [],
    hasHtmlVersion: true,
    hasMobileHtmlVersion: true,
    flags: "HasThumbnail",
    summary: "summary" + token,
    summaryHighlights: [],
    rankingInfo: "",
    raw: {
      string: "string value",
      date: new Date(1980, 2, 11, 8, 30).valueOf(),
      number: 123,
      emails: "mlaporte@coveo.com;dlavoie@coveo.com",
      empty: "",
      randomNumber: Math.random(),
      urihash: QueryUtils.createGuid(),
      source: "the source",
      collection: "the collection",
      author: "o.o"
    },
    childResults: [],
    termsToHighlight: {},
    phrasesToHighlight: {},
    index: 0,
    queryUid: "the uid",
    rating: 3,
    state: {},
    isRecommendation: false,
    searchInterface: mockSearchInterface()
  };
}

export function createFakeResultWithChildResult(
  token: string,
  numberOfChildResult: number,
  totalNumberOfChildResult: number = 5
): IQueryResult {
  const childResults: IQueryResult[] = [];
  for (var i = 0; i < numberOfChildResult; i++) {
    childResults.push(createFakeResult(token + "-child" + i));
  }
  let ret = createFakeResult(token);
  ret.totalNumberOfChildResults = totalNumberOfChildResult;
  ret = _.extend(ret, { childResults: childResults });
  return ret;
}

export function createFakeResultWithAttachments(
  token: string = "test",
  numberOfAttachments: number = 3,
  attachmentType: string[] = ["xml", "pdf", "txt"],
  flags: string = "HasThumbnail",
  attachmentsFlags: string[] = ["IsAttachment", "IsAttachment", "IsAttachment"],
  withSubAttachments: boolean = false
): IQueryResult {
  const fake = createFakeResult(token);
  fake.flags = flags;
  if (withSubAttachments) {
    const subAttachments = [];
    for (var i = 0; i < numberOfAttachments; i++) {
      subAttachments.push(
        createFakeResultWithAttachments(
          "test1",
          3,
          undefined,
          undefined,
          undefined,
          false
        )
      );
    }
    fake.attachments = subAttachments;
  } else {
    fake.attachments = createFakeResults(numberOfAttachments).results;
  }
  _.each(attachmentType, (type, index, list) => {
    if (fake.attachments[index] !== undefined) {
      fake.attachments[index].raw["filetype"] = type;
    }
  });
  _.each(attachmentsFlags, (flag, index, list) => {
    if (fake.attachments[index] !== undefined) {
      fake.attachments[index].flags = flag;
    }
  });
  return fake;
}

export function createFakeFeedItemResult(
  token: string,
  nbLikes: number = 0,
  nbTopics: number = 0,
  hasAttachment: boolean = false
): IQueryResult {
  const result = createFakeResult(token);
  result.raw.sfparentid = "parentid";
  result.raw.sfparentname = "parentname";
  result.raw.sffeeditemid = token + "id";
  result.clickUri = "myURI/" + result.raw.sffeeditemid;
  result.raw.sfcreatedby = "createdby";
  result.raw.sfcreatedbyname = "createdby";
  result.raw.sfcreatedbyid = "createdbyid";
  result.raw.sfinsertedbyid = "createdbyid";

  // Generate likes
  if (nbLikes > 0) {
    result.raw.sflikecount = nbLikes;
    result.raw.sflikedby = "";
    result.raw.sflikedbyid = "";

    for (let i = 1; i <= nbLikes; i++) {
      result.raw.sflikedby += "LikeName" + i;
      result.raw.sflikedbyid += "LikeId" + i;

      if (i !== nbLikes) {
        result.raw.sflikedby += ";";
        result.raw.sflikedbyid += ";";
      }
    }
  }

  // Generate topics
  if (nbTopics > 0) {
    result.raw.coveochatterfeedtopics = "";

    for (let i = 1; i <= nbTopics; i++) {
      result.raw.coveochatterfeedtopics += "topic" + i;

      if (i !== nbTopics) {
        result.raw.coveochatterfeedtopics += ";";
      }
    }
  }

  // Generate post attachment
  if (hasAttachment) {
    result.raw.coveochatterfeedtopics = "PostAttachment";
    result.raw.sfcontentfilename = "fileName";
    result.raw.sfcontentversionid = token;
  }

  return result;
}
