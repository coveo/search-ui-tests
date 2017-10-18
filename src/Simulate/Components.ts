import { IMockEnvironment } from "../MockEnvironment";
import {
  $$,
  IOmniboxData,
  OmniboxEvents,
  IBreadcrumbItem,
  IPopulateBreadcrumbEventArgs,
  BreadcrumbEvents
} from "coveo-search-ui";

export function omnibox(env: IMockEnvironment, options?: any): IOmniboxData {
  const expression = {
    word: "foo",
    regex: /foo/
  };

  const fakeOmniboxArgs = _.extend(
    {},
    {
      rows: [],
      completeQueryExpression: expression,
      allQueryExpression: expression,
      currentQueryExpression: expression,
      cursorPosition: 3,
      clear: jasmine.createSpy("clear"),
      clearCurrentExpression: jasmine.createSpy("clearCurrent"),
      replace: jasmine.createSpy("replace"),
      replaceCurrentExpression: jasmine.createSpy("replaceCurrentExpression"),
      insertAt: jasmine.createSpy("insertAt"),
      closeOmnibox: jasmine.createSpy("closeOmnibox")
    },
    options
  );

  $$(env.root).trigger(OmniboxEvents.populateOmnibox, fakeOmniboxArgs);

  return fakeOmniboxArgs;
}

export function breadcrumb(
  env: IMockEnvironment,
  options?: any
): IBreadcrumbItem[] {
  const args = <IPopulateBreadcrumbEventArgs>{ breadcrumbs: [] };
  $$(env.root).trigger(BreadcrumbEvents.populateBreadcrumb, args);
  return args.breadcrumbs;
}
