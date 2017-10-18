import { Assert, IGroupByValue, IGroupByResult } from "coveo-search-ui";

export function createFakeGroupByResult(
  field: string,
  token: string,
  count: number,
  includeComputedValues?: boolean
): IGroupByResult {
  Assert.isNonEmptyString(field);
  Assert.isNonEmptyString(token);
  Assert.isLargerOrEqualsThan(0, count);

  const groupByValues: IGroupByValue[] = [];
  for (var i = 0; i < count; ++i) {
    groupByValues.push(
      createFakeGroupByValue(
        token + i.toString(),
        i + 1,
        100 + i,
        includeComputedValues ? 1000 + i : undefined
      )
    );
  }

  return {
    field: field,
    values: groupByValues
  };
}

export function createFakeRangeGroupByResult(
  field: string,
  start: number = 1,
  end: number = 100,
  steps: number = 25
): IGroupByResult {
  const groupByValues: IGroupByValue[] = [];
  for (let i = start; i <= end; i += steps) {
    groupByValues.push(
      createFakeGroupByRangeValue(
        i,
        i + (steps - 1),
        "foobar" + i.toString(),
        i
      )
    );
  }
  return {
    field: field,
    values: groupByValues
  };
}

export function createFakeHierarchicalValue(
  token: string,
  currentLevel: number,
  delimitingCharacter: string = "|"
): string {
  let value = `level:${currentLevel.toString()}--value:${token}`;
  if (currentLevel !== 0) {
    for (let i = currentLevel - 1; i >= 0; i--) {
      value = `level:${i.toString()}--value:${token}${delimitingCharacter}${value}`;
    }
  }
  return value;
}

export function createFakeHierarchicalGroupByResult(
  field: string,
  token: string,
  numberOfLevel: number = 2,
  countByLevel: number = 3,
  delimitingCharacter: string = "|",
  includeComputedValues: boolean = false,
  weirdCasing: boolean = true
): IGroupByResult {
  const groupByValues: IGroupByValue[] = [];
  // i == level
  for (var i = 0; i < numberOfLevel; ++i) {
    // j == values on current level
    for (var j = 0; j < countByLevel; j++) {
      let currentValue = createFakeHierarchicalValue(
        `${token}${j.toString()}`,
        i
      );
      if (weirdCasing) {
        currentValue = _.map(
          currentValue.split(delimitingCharacter),
          (value, k) =>
            (i + j + k) % 2 === 0 ? value.toLowerCase() : value.toUpperCase()
        ).join(delimitingCharacter);
      }
      const currentGroupByValue = createFakeGroupByValue(
        currentValue,
        j + 1,
        100,
        includeComputedValues ? 1000 : undefined
      );
      groupByValues.push(currentGroupByValue);
    }
  }

  return {
    field: field,
    values: groupByValues
  };
}

export function createFakeGroupByValue(
  token: string,
  count: number,
  score?: number,
  computedValue?: number
): IGroupByValue {
  Assert.isNonEmptyString(token);

  return {
    value: token,
    lookupValue: token,
    numberOfResults: count,
    score: score || count * 2,
    computedFieldResults: computedValue ? [computedValue] : undefined
  };
}

export function createFakeGroupByRangeValue(
  from: number,
  to: number,
  token: string,
  count: number,
  score?: number,
  computedValue?: number
): IGroupByValue {
  return {
    value: from + ".." + to,
    lookupValue: token,
    numberOfResults: count,
    score: score || count * 2,
    computedFieldResults: computedValue ? [computedValue] : undefined
  };
}
