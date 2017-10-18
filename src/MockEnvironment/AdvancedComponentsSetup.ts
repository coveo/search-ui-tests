import {
  IBasicComponentSetup,
  IComponentConstructor,
  IComponentConstructorWithModalBox,
  IComponentConstructorWithResult,
  IComponentConstructorWithResultAndModalBox,
  ISearchInterfaceConstructor,
  ISearchInterfaceSetup,
  IBasicComponentSetupWithModalBox
} from "./ComponentsSetup";
import {
  MockEnvironmentBuilder,
  IMockEnvironment
} from "./MockEnvironmentBuilder";
import {
  BaseComponent,
  ModalBox,
  IComponentBindings,
  Component,
  IQueryResult,
  SearchInterface,
  $$,
  ISearchInterfaceOptions,
  OS_NAME
} from "coveo-search-ui";
import * as Simulate from "../Simulate";

export type EnvironmentBuilderModifier = (
  env: MockEnvironmentBuilder
) => MockEnvironmentBuilder;

export interface IAdvancedComponentConstructor<T> {
  new (
    element: HTMLElement,
    options: any,
    bindings: IComponentBindings,
    result: IQueryResult,
    os: OS_NAME
  ): T;
}

export class AdvancedComponentSetupOptions {
  constructor(
    public element: HTMLElement = $$("div").el,
    public cmpOptions: any = {},
    public modifyBuilder: EnvironmentBuilderModifier = (
      env: MockEnvironmentBuilder
    ) => env
  ) {}

  public merge(toMerge: AdvancedComponentSetupOptions): this {
    if (toMerge) {
      this.element = toMerge.element ? toMerge.element : this.element;
      this.cmpOptions = toMerge.cmpOptions
        ? toMerge.cmpOptions
        : this.cmpOptions;
      this.modifyBuilder = toMerge.modifyBuilder
        ? toMerge.modifyBuilder
        : this.modifyBuilder;
    }
    return this;
  }
}

export function advancedComponentSetup<T extends Component>(
  klass: IComponentConstructor<T>,
  options?: AdvancedComponentSetupOptions
): IBasicComponentSetup<T> {
  const baseOptions = new AdvancedComponentSetupOptions();
  const optsMerged = baseOptions.merge(options);

  let envBuilder = new MockEnvironmentBuilder().withElement(optsMerged.element);
  envBuilder = optsMerged.modifyBuilder(envBuilder);
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      optsMerged.cmpOptions,
      envBuilder.getBindings()
    )
  };
}

export function advancedComponentSetupWithModalBox<T extends Component>(
  klass: IComponentConstructorWithModalBox<T>,
  options?: AdvancedComponentSetupOptions
): IBasicComponentSetupWithModalBox<T> {
  const baseOptions = new AdvancedComponentSetupOptions();
  const optsMerged = baseOptions.merge(options);
  const modalBox = Simulate.modalBoxModule();

  let envBuilder = new MockEnvironmentBuilder().withElement(optsMerged.element);
  envBuilder = optsMerged.modifyBuilder(envBuilder);
  return {
    env: envBuilder.build(),
    modalBox: modalBox,
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      optsMerged.cmpOptions,
      envBuilder.getBindings(),
      modalBox
    )
  };
}

export function advancedResultComponentSetup<T extends Component>(
  klass: IAdvancedComponentConstructor<T>,
  result: IQueryResult,
  options?: AdvancedComponentSetupOptions
): IBasicComponentSetup<T> {
  const baseOptions = new AdvancedComponentSetupOptions();
  const optsMerged = baseOptions.merge(options);

  let envBuilder = new MockEnvironmentBuilder()
    .withElement(optsMerged.element)
    .withResult(result);
  envBuilder = optsMerged.modifyBuilder(envBuilder);
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      optsMerged.cmpOptions,
      envBuilder.getBindings(),
      envBuilder.result,
      envBuilder.os
    )
  };
}
