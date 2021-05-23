import React from 'react';
import {CompProps, StateType} from "../../components/helper/types";
import {defaultTableState} from "./defaultTableState";
import {TableContext, TableStateType} from "./TableContext";

function TableProvider({children}: CompProps) {
  const storeState: StateType<TableStateType> = React.useState<TableStateType>(defaultTableState);
  return <TableContext.Provider value={storeState}>{children}</TableContext.Provider>
}

export default TableProvider;
