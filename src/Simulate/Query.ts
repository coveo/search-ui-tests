import { IMockEnvironment } from "../MockEnvironment";
import * as Fake from "../Fake";
import {
  QueryBuilder,
  NoopComponent,
  INewQueryEventArgs,
  $$,
  QueryEvents,
  IBuildingQueryEventArgs,
  IDuringQueryEventArgs,
  IQueryErrorEventArgs,
  Utils,
  IPreprocessResultsEventArgs,
  INoResultsEventArgs,
  IQuerySuccessEventArgs,
  Defer,
  IQuery,
  IQueryCorrection,
  IEndpointError,
  IQueryResults,
  IGroupByResult,
  Component
} from "coveo-search-ui";

export interface ISimulateQueryData {
  query?: IQuery;
  queryBuilder?: QueryBuilder;
  searchAsYouType?: boolean;
  promise?: Promise<IQueryResults>;
  error?: IEndpointError;
  results?: IQueryResults;
  queryCorrections?: IQueryCorrection[];
  groupByResults?: IGroupByResult[];
  callbackDuringQuery?(): void;
  callbackAfterNoResults?(): void;
  callbackAfterQuery?(): void;
  doNotFlushDefer?: boolean;
  deferSuccess?: boolean;
  cancel?: boolean;
  origin?: Component;
}

export function query(
  env: IMockEnvironment,
  options?: ISimulateQueryData
): ISimulateQueryData {
  options = _.extend(
    {},
    {
      query: new QueryBuilder().build(),
      queryBuilder: new QueryBuilder(),
      searchAsYouType: false,
      promise: new Promise(() => {}),
      results: Fake.createFakeResults(),
      callbackDuringQuery: () => {},
      callbackAfterNoResults: () => {},
      callbackAfterQuery: () => {},
      deferSuccess: false,
      cancel: false,
      origin: NoopComponent
    },
    options
  );

  if (options.queryCorrections) {
    options.results.queryCorrections = options.queryCorrections;
  }
  if (options.groupByResults) {
    options.results.groupByResults = options.groupByResults;
  }

  const newQueryEventArgs: INewQueryEventArgs = {
    searchAsYouType: options.searchAsYouType,
    cancel: options.cancel,
    origin: options.origin,
    shouldRedirectStandaloneSearchbox: true
  };
  $$(env.root).trigger(QueryEvents.newQuery, newQueryEventArgs);

  const buildingQueryEventArgs: IBuildingQueryEventArgs = {
    queryBuilder: options.queryBuilder,
    searchAsYouType: false,
    cancel: false
  };
  $$(env.root).trigger(QueryEvents.buildingQuery, buildingQueryEventArgs);
  $$(env.root).trigger(QueryEvents.doneBuildingQuery, buildingQueryEventArgs);

  const duringQueryEventArgs: IDuringQueryEventArgs = {
    query: options.query,
    queryBuilder: options.queryBuilder,
    promise: options.promise,
    searchAsYouType: options.searchAsYouType
  };
  $$(env.root).trigger(QueryEvents.duringQuery, duringQueryEventArgs);
  options.callbackDuringQuery();

  const success = () => {
    if (Utils.exists(options.error)) {
      const queryErrorEventArgs: IQueryErrorEventArgs = {
        queryBuilder: options.queryBuilder,
        query: options.query,
        endpoint: env.searchEndpoint,
        error: options.error,
        searchAsYouType: options.searchAsYouType
      };
      Promise.reject(options.promise).catch(e => {});
      $$(env.root).trigger(QueryEvents.queryError, queryErrorEventArgs);
    } else {
      const preprocessResultsEventArgs: IPreprocessResultsEventArgs = {
        queryBuilder: options.queryBuilder,
        query: options.query,
        results: options.results,
        searchAsYouType: options.searchAsYouType
      };
      $$(env.root).trigger(
        QueryEvents.preprocessResults,
        preprocessResultsEventArgs
      );
      Promise.resolve(
        new Promise((resolve, reject) => {
          resolve(options.results);
        })
      );

      const noResultsEventArgs: INoResultsEventArgs = {
        query: options.query,
        queryBuilder: options.queryBuilder,
        results: options.results,
        searchAsYouType: options.searchAsYouType,
        retryTheQuery: false
      };

      if (
        options.results.totalCount === 0 ||
        options.results.results.length === 0
      ) {
        $$(env.root).trigger(QueryEvents.noResults, noResultsEventArgs);
        options.callbackAfterNoResults();
      }

      if (noResultsEventArgs.retryTheQuery) {
        // do nothing, as this could cause test to loop endlessly if they do not handle the query being retried.
      } else {
        const querySuccessEventArgs: IQuerySuccessEventArgs = {
          query: options.query,
          queryBuilder: options.queryBuilder,
          results: options.results,
          searchAsYouType: options.searchAsYouType
        };
        $$(env.root).trigger(QueryEvents.querySuccess, querySuccessEventArgs);
        $$(env.root).trigger(
          QueryEvents.deferredQuerySuccess,
          querySuccessEventArgs
        );
      }
    }

    if (!options.doNotFlushDefer) {
      Defer.flush();
    }

    options.callbackAfterQuery();
  };

  if (options.deferSuccess) {
    Defer.defer(success);
  } else {
    success();
  }

  return options;
}
