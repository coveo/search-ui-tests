import { Assert, IIndexFieldValue } from "coveo-search-ui";
export function createFakeFieldValue(
  token: string,
  count: number
): IIndexFieldValue {
  Assert.isNonEmptyString(token);

  return {
    value: token,
    lookupValue: token,
    numberOfResults: count
  };
}

export function createFakeFieldValues(
  token: string,
  count: number
): IIndexFieldValue[] {
  Assert.isNonEmptyString(token);
  Assert.isLargerOrEqualsThan(0, count);

  const fieldValues: IIndexFieldValue[] = [];
  for (var i = 0; i < count; ++i) {
    fieldValues.push(createFakeFieldValue(token + i.toString(), i + 1));
  }

  return fieldValues;
}
