import { IOmniboxDataRow, IPopulateOmniboxEventArgs } from "coveo-search-ui";
export function createPopulateOmniboxEventArgs(
  queryboxContent: string,
  cursorPosition: number,
  rows: IOmniboxDataRow[] = []
): IPopulateOmniboxEventArgs {
  return {
    completeQueryExpression: {
      word: queryboxContent,
      regex: new RegExp(queryboxContent, "gi")
    },
    allQueryExpressions: undefined,
    currentQueryExpression: {
      word: queryboxContent,
      regex: new RegExp(queryboxContent, "gi")
    },
    cursorPosition: cursorPosition,
    rows: [],
    clear: () => {},
    clearCurrentExpression: () => {},
    closeOmnibox: () => {},
    insertAt: () => {},
    replace: () => {},
    replaceCurrentExpression: () => {}
  };
}
