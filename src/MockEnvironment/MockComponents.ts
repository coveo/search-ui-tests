import {
  BaseComponent,
  SearchInterface,
  QueryController,
  SearchEndpoint,
  QueryBuilder,
  IAnalyticsClient,
  NoopAnalyticsClient,
  AnalyticsEndpoint
} from "coveo-search-ui";

export type ConstructorFunc<T> = any;

export interface IResponsiveComponentsMock {
  windoh: Window;
  setSmallScreenWidth(width: number): void;
  setMediumScreenWidth(width: number): void;
  getSmallScreenWidth(): number;
  getMediumScreenWidth(): number;
  isSmallScreenWidth(): boolean;
  isMediumScreenWidth(): boolean;
  isLargeScreenWidth(): boolean;
}

export function mock<T>(
  contructorFunc: ConstructorFunc<T>,
  name: string = "mock"
): T {
  const keys = [];
  for (const key in contructorFunc.prototype) {
    keys.push(key);
  }
  return keys.length > 0 ? jasmine.createSpyObj(name, keys) : {};
}

export function mockWindow(): Window {
  const mockWindow = mock<any>(Window.prototype);
  mockWindow.location = <Location>{
    href: "",
    hash: ""
  };
  mockWindow.location.replace = (newHref: string) => {
    newHref = newHref || "";

    mockWindow.location.href = newHref;

    // 'http://www.coveo.com/#foo' => 'foo'
    // 'http://www.coveo.com/#' => ''
    // 'http://www.coveo.com/' => ''
    mockWindow.location.hash = newHref.substring(newHref.indexOf("#") + 1);

    // 'foo' => '#foo'
    // '' => ''
    if (mockWindow.location.hash !== "") {
      mockWindow.location.hash = "#" + mockWindow.location.hash;
    }
  };
  mockWindow.addEventListener = jasmine.createSpy("addEventListener");
  mockWindow.removeEventListener = jasmine.createSpy("removeEventListener");
  mockWindow.dispatchEvent = jasmine.createSpy("dispatchEvent");
  return <Window>mockWindow;
}

export function mockComponent<T extends BaseComponent>(
  constructorFunc: ConstructorFunc<T>,
  name: string = "mock"
): T {
  const m = mock<T>(constructorFunc, name);
  m.type = name;
  return m;
}

export function mockSearchInterface(): SearchInterface {
  const m = mockComponent<SearchInterface>(SearchInterface, SearchInterface.ID);
  m.options = {};
  m.options.originalOptionsObject = {};
  m.responsiveComponents = mockResponsiveComponents();
  return m;
}

export function mockResponsiveComponents(): IResponsiveComponentsMock {
  return {
    windoh: mockWindow(),
    getMediumScreenWidth: () => 0,
    getSmallScreenWidth: () => 0,
    setMediumScreenWidth: () => 0,
    setSmallScreenWidth: () => 0,
    isSmallScreenWidth: () => false,
    isMediumScreenWidth: () => false,
    isLargeScreenWidth: () => true
  };
}

export function mockQueryController(): QueryController {
  const m = mockComponent<QueryController>(QueryController, QueryController.ID);
  const spy = <any>m;
  spy.options = {};
  spy.options.resultsPerPage = 10;
  spy.fetchMore.and.returnValue(new Promise((resolve, reject) => { }));
  spy.getLastQuery.and.returnValue(new QueryBuilder().build());
  return m;
}

export function mockSearchEndpoint(): SearchEndpoint {
  const m = mock<any>(SearchEndpoint, "SearchEndpoint");
  m.listFields.and.returnValue(new Promise((resolve, reject) => { }));
  m.listFieldValues.and.returnValue(new Promise((resolve, reject) => { }));
  m.search.and.returnValue(new Promise((resolve, reject) => { }));
  m.getQuerySuggest.and.returnValue(new Promise((resolve, reject) => { }));
  m.extensions.and.returnValue(new Promise((resolve, reject) => { }));
  m.getViewAsDatastreamUri.and.returnValue("http://datastream.uri");
  m.options = {
    queryStringArguments: {
      organizationId: "foobar"
    }
  };
  return m;
}

export function mockUsageAnalytics(): IAnalyticsClient {
  const m = mock<any>(NoopAnalyticsClient, "AnalyticsClient");
  m.getTopQueries.and.returnValue(new Promise((resolve, reject) => { }));
  return m;
}

export function mockAnalyticsEndpoint(): AnalyticsEndpoint {
  const m = mock<any>(AnalyticsEndpoint, "AnalyticsEndpoint");
  // Spy return Promise instead of void in order to chain Promises
  m.sendCustomEvent.and.returnValue(Promise.resolve(null));
  m.sendDocumentViewEvent.and.returnValue(Promise.resolve(null));
  return m;
}
