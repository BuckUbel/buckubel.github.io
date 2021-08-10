import React from "react";
import { CompProps, StateType } from "../../components/helper/types";
import { defaultFormState } from "./defaultFormState";
import { FormContext, FormStateType } from "./FormContext";
import { LocalStoreEntityType } from "../useLocalStorage/LocalStoreContext";

interface FormProviderProps<T extends LocalStoreEntityType> extends CompProps {
  state: StateType<T>;
  entityClass: typeof LocalStoreEntityType;
}

function FormProvider<T extends LocalStoreEntityType>({
  children,
}: FormProviderProps<T>) {
  const storeState: StateType<FormStateType> =
    React.useState<FormStateType>(defaultFormState);
  return (
    <FormContext.Provider value={storeState}>{children}</FormContext.Provider>
  );
}

export default FormProvider;
