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
  ISearchInterfaceOptions
} from "coveo-search-ui";
import * as Simulate from "../Simulate";

export function basicComponentSetup<T extends Component>(
  klass: IComponentConstructor<T>,
  options: any = {},
  ...args: any[]
): IBasicComponentSetup<T> {
  const envBuilder = new MockEnvironmentBuilder();
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      ...args
    )
  };
}

export function basicComponentSetupWithModalBox<T extends Component>(
  klass: IComponentConstructorWithModalBox<T>,
  options: any = {},
  ...args: any[]
): IBasicComponentSetupWithModalBox<T> {
  const envBuilder = new MockEnvironmentBuilder();
  const modalBox = Simulate.modalBoxModule();
  return {
    env: envBuilder.build(),
    modalBox: modalBox,
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      modalBox,
      ...args
    )
  };
}

export function basicResultComponentSetup<T extends Component>(
  klass: IComponentConstructorWithResult<T>,
  options: any = {},
  ...args: any[]
): IBasicComponentSetup<T> {
  const envBuilder = new MockEnvironmentBuilder().withResult();
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      envBuilder.result,
      ...args
    )
  };
}

export function basicResultComponentSetupWithModalBox<T extends Component>(
  klass: IComponentConstructorWithResultAndModalBox<T>,
  options: any = {},
  ...args: any[]
): IBasicComponentSetupWithModalBox<T> {
  const envBuilder = new MockEnvironmentBuilder();
  const modalBox = Simulate.modalBoxModule();
  return {
    env: envBuilder.build(),
    modalBox: modalBox,
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      envBuilder.result,
      modalBox,
      ...args
    )
  };
}

export function basicSearchInterfaceSetup<T extends SearchInterface>(
  klass: ISearchInterfaceConstructor<T>,
  ...args: any[]
): ISearchInterfaceSetup<T> {
  const div = $$("div").el;
  const envBuilder = new MockEnvironmentBuilder().withRoot(div);
  const component = <T>new klass(div, ...args);
  envBuilder.searchInterface = component;
  return {
    env: envBuilder.build(),
    cmp: component,
  };
}
