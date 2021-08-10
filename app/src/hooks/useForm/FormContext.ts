import React from "react";
import { StateType } from "../../components/helper/types";
import { defaultFormState } from "./defaultFormState";

export type FormStateType = {
  returnLink: string;
  defaultReturnLink: string;
  returnClickAction?: () => void;
  headlineTitle: string;
};

export const FormContext = React.createContext<StateType<FormStateType>>([
  defaultFormState,
  () => {},
]);
