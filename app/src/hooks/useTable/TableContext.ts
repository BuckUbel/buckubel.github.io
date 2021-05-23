import React from "react";
import {ObjectArray, StateType} from "../../components/helper/types";
import {defaultTableState} from "./defaultTableState";
import {LocalStoreEntityType} from "../useLocalStorage/LocalStoreContext";
import {InterfaceChangedPropTypes} from "../../components/helper/utilTypes";

type TableDisplayConfig<TableDataType> = Partial<InterfaceChangedPropTypes<TableDataType, boolean>> & ObjectArray<boolean>;

export type TableStateType<TableDataType extends LocalStoreEntityType = LocalStoreEntityType> = {
  displayConfig: TableDisplayConfig<TableDataType>;
}

export const TableContext = React.createContext<StateType<TableStateType>>(
  [defaultTableState, () => {
  }],
);
