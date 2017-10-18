import { IMockEnvironment } from "../MockEnvironment";
import { ISimulateQueryData } from "../Simulate";
import * as Fake from "../Fake";
import { JQuery } from "./JQueryModule";

export function isPhantomJs(): boolean {
  return navigator.userAgent.indexOf("PhantomJS") !== -1;
}

export function isChromeHeadless(): boolean {
  return navigator.userAgent.indexOf("HeadlessChrome") !== -1;
}

export function addJQuery(): any {
  window["Coveo"]["$"] = JQuery;
  return JQuery;
}

export function removeJQuery(): void {
  window["Coveo"]["$"] = null;
}
