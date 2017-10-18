import { Defer } from "coveo-search-ui";

export function keyUp(
  element: HTMLElement,
  key: number,
  shiftKey?: boolean
): void {
  const event = new KeyboardEvent("keyup", { shiftKey: shiftKey });
  Object.defineProperty(event, "keyCode", {
    get: () => {
      return key;
    }
  });
  Object.defineProperty(event, "which", {
    get: () => {
      return key;
    }
  });
  element.dispatchEvent(event);
  Defer.flush();
}
