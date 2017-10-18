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
  options: any = {}
): IBasicComponentSetup<T> {
  const envBuilder = new MockEnvironmentBuilder();
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings()
    )
  };
}

export function basicComponentSetupWithModalBox<T extends Component>(
  klass: IComponentConstructorWithModalBox<T>,
  options: any = {}
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
      modalBox
    )
  };
}

export function basicResultComponentSetup<T extends Component>(
  klass: IComponentConstructorWithResult<T>,
  options: any = {}
): IBasicComponentSetup<T> {
  const envBuilder = new MockEnvironmentBuilder().withResult();
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      envBuilder.result
    )
  };
}

export function basicResultComponentSetupWithModalBox<T extends Component>(
  klass: IComponentConstructorWithResultAndModalBox<T>,
  options: any = {}
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
      modalBox
    )
  };
}

export function basicSearchInterfaceSetup<T extends SearchInterface>(
  klass: ISearchInterfaceConstructor<T>
): ISearchInterfaceSetup<T> {
  const div = $$("div").el;
  const envBuilder = new MockEnvironmentBuilder().withRoot(div);
  const component = <T>new klass(div);
  envBuilder.searchInterface = component;
  return {
    env: envBuilder.build(),
    cmp: component
  };
}
