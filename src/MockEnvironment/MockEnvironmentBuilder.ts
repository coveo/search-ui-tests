import {
  mockSearchInterface,
  mockSearchEndpoint,
  mockQueryController,
  mockComponent,
  mockUsageAnalytics
} from "./MockComponents";

import {
  ModalBox,
  IComponentBindings,
  IQueryResult,
  SearchInterface,
  QueryStateModel,
  IAnalyticsClient,
  $$,
  ComponentStateModel,
  ComponentOptionsModel,
  OS_NAME,
  Component,
  BaseComponent,
  NoopAnalyticsClient,
  AnalyticsEndpoint,
  SearchEndpoint,
  QueryController,
  QueryBuilder
} from "coveo-search-ui";
import * as FakeResults from "../Fake";

export interface IMockEnvironment extends IComponentBindings {
  root: HTMLElement;
  element: HTMLElement;
  result: IQueryResult;
  searchEndpoint: SearchEndpoint;
  searchInterface: SearchInterface;
  queryController: QueryController;
  queryStateModel: QueryStateModel;
  usageAnalytics: IAnalyticsClient;
}

export interface IMockEnvironmentWithData<T> extends IMockEnvironment {
  data: T;
}

export class MockEnvironmentBuilder {
  public root: HTMLElement = $$("div").el;
  public element: HTMLElement = $$("div").el;
  public result: IQueryResult = undefined;
  public searchEndpoint = mockSearchEndpoint();
  public searchInterface = mockSearchInterface();
  public queryController = mockQueryController();
  public queryStateModel = mockComponent<QueryStateModel>(
    QueryStateModel,
    QueryStateModel.ID
  );
  public componentStateModel = mockComponent<ComponentStateModel>(
    ComponentStateModel,
    ComponentStateModel.ID
  );
  public usageAnalytics = mockUsageAnalytics();
  public componentOptionsModel = mockComponent<ComponentOptionsModel>(
    ComponentOptionsModel,
    ComponentOptionsModel.ID
  );
  public os: OS_NAME;
  private built = false;

  public withRoot(root: HTMLElement): this {
    this.root = root ? root : this.root;
    return this;
  }

  public withElement(element: HTMLElement): this {
    this.element = element ? element : this.element;
    return this;
  }

  public withLiveQueryStateModel(): this {
    this.queryStateModel = new QueryStateModel(this.root);
    return this;
  }

  public withQueryStateModel(model: QueryStateModel): this {
    this.queryStateModel = model;
    return this;
  }

  public withCollaborativeRating(): this {
    this.searchInterface.options.enableCollaborativeRating = true;
    return this;
  }

  public withOs(os: OS_NAME): this {
    this.os = os;
    return this;
  }

  public withResult(
    result: IQueryResult = FakeResults.createFakeResult()
  ): this {
    this.result = result;
    return this;
  }

  public withEndpoint(endpoint: SearchEndpoint = mockSearchEndpoint()): this {
    this.searchEndpoint = endpoint;
    return this;
  }

  public build(): IMockEnvironment {
    if (this.built) {
      return this.getBindings();
    }
    if (!this.element.parentNode) {
      this.root.appendChild(this.element);
    }

    Component.bindComponentToElement(this.root, this.searchInterface);
    Component.bindComponentToElement(this.root, this.queryController);
    Component.bindComponentToElement(this.root, this.queryStateModel);
    Component.bindComponentToElement(this.root, this.componentStateModel);
    Component.bindComponentToElement(this.root, this.componentOptionsModel);

    this.searchInterface.queryController = this.queryController;
    this.searchInterface.queryStateModel = this.queryStateModel;
    this.searchInterface.componentStateModel = this.componentStateModel;
    this.searchInterface.componentOptionsModel = this.componentOptionsModel;
    this.searchInterface.getBindings = () => this.getBindings() as any;
    this.searchInterface.getQueryContext = () => this.queryController.getLastQuery().context || {};

    if (!this.searchEndpoint) {
      this.searchEndpoint = mockSearchEndpoint();
    }

    this.queryController.getEndpoint = () => {
      return this.searchEndpoint;
    };

    if (this.result) {
      Component.bindResultToElement(this.element, this.result);
    }
    this.built = true;
    return this.getBindings();
  }

  public getBindings(): IMockEnvironment {
    if (!this.built) {
      return this.build();
    }
    return {
      root: this.root,
      element: this.element,
      result: this.result,
      searchEndpoint: this.searchEndpoint,
      searchInterface: this.searchInterface,
      queryController: this.queryController,
      queryStateModel: this.queryStateModel,
      usageAnalytics: this.usageAnalytics,
      componentStateModel: this.componentStateModel,
      componentOptionsModel: this.componentOptionsModel
    };
  }
}
