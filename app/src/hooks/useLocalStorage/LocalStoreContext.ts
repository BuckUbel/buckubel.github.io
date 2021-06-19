import React from 'react';
import {StateType} from "../../components/helper/types";
import {defaultLocalStoreState} from "./defaultLocalStoreState";
import uuid from "uuid";
import {InterfaceChangedPropTypesOnlyRealValues} from "../../components/helper/utilTypes";


export class LocalStoreEntityType {
  id: string = uuid.v4();

  setIfItIs(prop: keyof this, obj?: Partial<this>) {
    if (obj !== undefined && obj[prop] !== undefined) {
      this[prop] = obj[prop] as this[keyof this];
    }
  }

  set(obj?: Partial<this>) {
    if (!!obj) {
      const thisKeys = Object.keys(obj) as Array<keyof Partial<this>>;
      thisKeys.forEach((v, i) => {
        this.setIfItIs(v, obj);
      })
    }
    return this;
  }

  static create<T extends LocalStoreEntityType>(obj?: Partial<T>) {
    const newObj = new this() as T;
    return newObj.set(obj);
  }

  static rowNames: InterfaceChangedPropTypesOnlyRealValues<LocalStoreEntityType, string> = {id: "ID"};
}

export type LocalStoreEntryType<DatabaseType extends LocalStoreEntityType = LocalStoreEntityType> = {
  [key: string]: DatabaseType[];
};

export type LocalStoreType<DatabaseType extends LocalStoreEntityType = LocalStoreEntityType> = {
  databaseActionCount: { [key: string]: number };
  isSomeLoaded?: boolean,
  database: LocalStoreEntryType<DatabaseType>;
}

export const LocalStoreContext = React.createContext<StateType<LocalStoreType>>(
  [defaultLocalStoreState, () => {
  }],
);
