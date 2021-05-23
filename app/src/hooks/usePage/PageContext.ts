import React from "react";
import {StateType} from "../../components/helper/types";
import {defaultPageState} from "./defaultPageState";

export type PageStateType = {
  returnLink: string,
  defaultReturnLink: string,
  returnClickAction?: ()=>void,
  headlineTitle: string;
}

export const PageContext = React.createContext<StateType<PageStateType>>(
  [defaultPageState, () => {
  }],
);
