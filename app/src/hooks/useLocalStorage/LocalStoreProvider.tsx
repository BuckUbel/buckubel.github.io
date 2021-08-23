import React, { useMemo } from "react";
import { LocalStoreContext, LocalStoreType } from "./LocalStoreContext";
import { CompProps, StateType } from "../../components/helper/types";
import { defaultLocalStoreState } from "./defaultLocalStoreState";

interface LocalStoreProviderProps extends CompProps {
  prefix?: string;
}

function LocalStoreProvider({ children, prefix }: LocalStoreProviderProps) {
  const defaultStoreState = useMemo(
    () =>
      Object.assign({}, defaultLocalStoreState, {
        LOCAL_STORAGE_PREFIX: prefix,
      }),
    [prefix]
  );
  const storeState: StateType<LocalStoreType> =
    React.useState<LocalStoreType>(defaultStoreState);
  return (
    <LocalStoreContext.Provider value={storeState}>
      {children}
    </LocalStoreContext.Provider>
  );
}

export default LocalStoreProvider;
