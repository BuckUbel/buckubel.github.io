import React from 'react';
import {StateType} from "../../components/helper/types";
import {defaultLocalStoreState} from "./defaultLocalStoreState";

export interface LocalStoreEntityType {
  id: number;
}

export type LocalStoreEntryType<DatabaseType extends LocalStoreEntityType = LocalStoreEntityType> = {
  [key: string]: DatabaseType[];
};

export type LocalStoreType<DatabaseType extends LocalStoreEntityType = LocalStoreEntityType> = {
  databaseActionCount: { [key: string]: number };
  isSomeLoaded?: boolean,
  database: LocalStoreEntryType;
}

export const LocalStoreContext = React.createContext<StateType<LocalStoreType>>(
  [defaultLocalStoreState, () => {
  }],
);
