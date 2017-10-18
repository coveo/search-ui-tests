import { ModalBox, $$, IQuery } from "coveo-search-ui";

export function modalBoxModule(): ModalBox.ModalBox {
  const modalBox = <any>{};
  modalBox.open = jasmine.createSpy("open");
  modalBox.close = jasmine.createSpy("close");
  modalBox.open.and.returnValue({
    modalBox: $$("div", undefined, $$("div", { className: "coveo-wrapper" }))
      .el,
    wrapper: $$(
      "div",
      undefined,
      $$("div", { className: "coveo-quickview-close-button" })
    ).el,
    overlay: $$("div").el,
    content: $$("div").el,
    close: modalBox.close
  });
  return modalBox;
}

export function analyticsStoreModule(
  actionsHistory: CoveoAnalytics.HistoryElement[] = []
): CoveoAnalytics.HistoryStore {
  return {
    addElement: (query: IQuery) => {},
    getHistory: () => {
      return actionsHistory;
    },
    setHistory: (history: any[]) => {},
    clear: () => {},
    getMostRecentElement: () => {
      return null;
    }
  };
}
