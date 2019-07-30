import {
  Component,
  IComponentBindings,
  ModalBox,
  IQueryResult,
  ISearchInterfaceOptions,
  SearchInterface
} from "coveo-search-ui";
import { IMockEnvironment } from "./MockEnvironmentBuilder";

export interface IComponentConstructor<T> {
  new (element: HTMLElement, options: any, bindings: IComponentBindings, ...args: any[]): T;
}

export interface IBasicComponentSetup<T extends Component> {
  env: IMockEnvironment;
  cmp: T;
}

export interface IComponentConstructorWithModalBox<T> {
  new (
    element: HTMLElement,
    options: any,
    bindings: IComponentBindings,
    modalBox: ModalBox.ModalBox,
    ...args: any[]
  ): T;
}

export interface IBasicComponentSetupWithModalBox<T extends Component>
  extends IBasicComponentSetup<T> {
  modalBox: ModalBox.ModalBox;
}

export interface IComponentConstructorWithResult<T> {
  new (
    element: HTMLElement,
    options: any,
    bindings: IComponentBindings,
    result: IQueryResult,
    ...args: any[]
  ): T;
}

export interface IComponentConstructorWithResultAndModalBox<T> {
  new (
    element: HTMLElement,
    options: any,
    bindings: IComponentBindings,
    result: IQueryResult,
    modalBox: ModalBox.ModalBox,
    ...args: any[]
  ): T;
}

export interface ISearchInterfaceConstructor<T extends SearchInterface> {
  new (
    element: HTMLElement,
    options?: ISearchInterfaceOptions,
    analyticsOptions?: any,
    _window?: Window,
    ...args: any[]
  ): T;
}

export interface ISearchInterfaceSetup<T extends SearchInterface> {
  env: IMockEnvironment;
  cmp: T;
}
