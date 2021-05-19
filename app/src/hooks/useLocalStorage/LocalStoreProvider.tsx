import React from 'react';
import {LocalStoreContext, LocalStoreType} from "./LocalStoreContext";
import {CompProps, StateType} from "../../components/helper/types";
import {defaultLocalStoreState} from "./defaultLocalStoreState";

function LocalStoreProvider({children}: CompProps) {
  const storeState: StateType<LocalStoreType> = React.useState<LocalStoreType>(defaultLocalStoreState);
  return <LocalStoreContext.Provider value={storeState}>{children}</LocalStoreContext.Provider>
}

export default LocalStoreProvider;
