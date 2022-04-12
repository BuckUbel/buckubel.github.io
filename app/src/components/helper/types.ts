import {
  Dispatch,
  PropsWithChildren,
  PropsWithRef,
  SetStateAction,
} from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type CompProps<T = any> = PropsWithChildren<PropsWithRef<T>>;

export interface StyledCompProps extends CompProps {
  className?: string;
}

export interface ObjectArray<T = any> {
  [identifier: string]: T;
}

export type SetStateType<S> = Dispatch<SetStateAction<S>>;
export type StateType<S> = [S, Dispatch<SetStateAction<S>>];

export type Class<T> = new (...args: any[]) => T;

export interface AppRouteInterface {
  href: string;
  hrefWithoutParam?: string;
  title: string;
  component: (props?: any) => JSX.Element | null;
}

export interface SitePreviewInterface {
  title: string;
  link: string;
  description?: string;
  buttonText?: string;
  icon?: IconDefinition;
  image?: string;
  onClick?: () => void;
}
