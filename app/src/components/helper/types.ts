import React, {Props} from "react";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export type CompProps = Props<React.SFC>;

export interface ObjectArray<T = any> {
  [identifier: string]: T;
}

export interface AppRouteInterface {
  href: string,
  title: string,
  component: () => JSX.Element | null;
}

export interface SitePreviewInterface {
  icon: IconDefinition;
  headline: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}