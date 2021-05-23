import React from 'react';
import {CompProps, StateType} from "../../components/helper/types";
import {defaultPageState} from "./defaultPageState";
import {PageContext, PageStateType} from "./PageContext";

function PageProvider({children}: CompProps) {
  const storeState: StateType<PageStateType> = React.useState<PageStateType>(defaultPageState);
  return <PageContext.Provider value={storeState}>{children}</PageContext.Provider>
}

export default PageProvider;
