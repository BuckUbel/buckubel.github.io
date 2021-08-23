import { LocalStoreType } from "./LocalStoreContext";

export const defaultLocalStoreState: LocalStoreType = {
  LOCAL_STORAGE_PREFIX: "",
  databaseActionCount: {},
  isSomeLoaded: false,
  database: {},
  viewDatabase: {},
  count: {},
  filterCount: {},
};
