import React from "react";
import { StateType } from "../../components/helper/types";
import { defaultLocalStoreState } from "./defaultLocalStoreState";
import { v4 as uuid } from "uuid";
import { InterfaceChangedPropTypesOnlyRealValues } from "../../components/helper/utilTypes";

export class LocalStoreEntityType {
  id: string = uuid();

  /**
   * Set the property 'prop', if it is defined as not undefined in obj.
   * @param prop
   * @param obj
   */
  setIfItIs(prop: keyof this, obj?: Partial<this>) {
    if (obj !== undefined && obj[prop] !== undefined) {
      this[prop] = obj[prop] as this[keyof this];
    }
  }

  /**
   * Set all properties of the object 'obj' on this
   * @param obj
   */
  set(obj?: Partial<this>) {
    if (!!obj) {
      const thisKeys = Object.keys(obj) as Array<keyof Partial<this>>;
      thisKeys.forEach((v, i) => {
        this.setIfItIs(v, obj);
      });
    }
    return this;
  }

  static create<T extends LocalStoreEntityType>(obj?: Partial<T>) {
    const newObj = new this() as T;
    return newObj.set(obj);
  }

  static rowNames: InterfaceChangedPropTypesOnlyRealValues<
    LocalStoreEntityType,
    string
  > = { id: "ID" };
}

export type LocalStoreEntryType<
  DatabaseType extends LocalStoreEntityType = LocalStoreEntityType
> = {
  [key: string]: DatabaseType[];
};

export type LocalStoreType<
  DatabaseType extends LocalStoreEntityType = LocalStoreEntityType
> = {
  LOCAL_STORAGE_PREFIX: string;
  databaseActionCount: { [key: string]: number };
  isSomeLoaded?: boolean;
  database: LocalStoreEntryType<DatabaseType>;
  viewDatabase: LocalStoreEntryType<DatabaseType>;
  count: { [key: string]: number };
  filterCount: { [key: string]: number };
};

export const LocalStoreContext = React.createContext<StateType<LocalStoreType>>(
  [defaultLocalStoreState, () => {}]
);
