import {useContext} from "react";
import {LocalStoreContext, LocalStoreEntityType, LocalStoreEntryType, LocalStoreType} from "./LocalStoreContext";
import {SetStateType} from "../../components/helper/types";
import {useRefEffect} from "../../components/helper/useRefHook";

function createPagerContent(props?: { pageSize?: number, page?: number, filterCount?: number }) {
  const pageSize = props?.pageSize ?? 0;
  const page = props?.page ?? 0;
  const filterCount = props?.filterCount ?? 0;
  const startPos = page * pageSize;
  const endPos = Math.min((page + 1) * pageSize, filterCount);
  const pageCount = endPos - startPos;

  return {
    pageSize: pageSize,
    page: page,
    filterCount: filterCount,
    startPos: startPos,
    endPos: endPos,
    pageCount: pageCount,
  }
}

export interface LSConfigObject<DatabaseType extends LocalStoreEntityType> {
  autoSync?: boolean;
  sort?: (a: DatabaseType, b: DatabaseType) => number;
  filter?: (a: DatabaseType, i?: number) => boolean;
  page?: number;
  pageSize?: number;
}

const LOCAL_STORAGE_PREFIX = "MEDIA-MASTER-"

export const useLocalStorage = <DatabaseType extends LocalStoreEntityType>(storeName: string, config?: LSConfigObject<DatabaseType>) => {
  const [contextStore, contextSetStore] = useContext(LocalStoreContext);
  const store = contextStore as LocalStoreType<DatabaseType>;
  const setStore = contextSetStore as SetStateType<LocalStoreType<DatabaseType>>;

  const count = store.count[storeName] ?? 0;
  const {
    pageSize,
    page,
    filterCount,
    startPos,
    endPos,
    pageCount,
  } = createPagerContent({pageSize: config?.pageSize, page: config?.page, filterCount: store.filterCount[storeName]});

  const setNewDatabase = (prevState: LocalStoreType<DatabaseType>, newDatabase: LocalStoreEntryType<DatabaseType>) => {
    const newActionCount = prevState.databaseActionCount[storeName] ?? 0;
    return {
      ...prevState,
      databaseActionCount: {...prevState.databaseActionCount, [storeName]: newActionCount + 1},
      database: newDatabase,
    };
  }

  const setNewViewDatabase = (prevState: LocalStoreType<DatabaseType>, newDatabase: LocalStoreEntryType<DatabaseType>) => {
    const newViewDatabase = Object.assign({}, prevState.viewDatabase);
    const newFilterCount = Object.assign({}, prevState.filterCount);

    newViewDatabase[storeName] = newDatabase[storeName];
    if (!!config?.filter) {
      newViewDatabase[storeName] = newViewDatabase[storeName].filter(config.filter);
    }
    newFilterCount[storeName] = newViewDatabase[storeName].length;
    if (!!config?.sort) {
      newViewDatabase[storeName] = newViewDatabase[storeName].sort(config.sort);
    }
    const {
      startPos,
      endPos,
    } = createPagerContent({pageSize: config?.pageSize, page: config?.page, filterCount: newFilterCount[storeName]});
    if (!!config?.pageSize) {
      newViewDatabase[storeName] = newViewDatabase[storeName].slice(startPos, endPos);
    }

    return {
      ...prevState,
      viewDatabase: newViewDatabase, filterCount: newFilterCount
    };
  }

  const add = (newEntity: DatabaseType) => {
    const storeData = store.database[storeName];
    if (!!storeData) {
      setStore(((prevState: LocalStoreType<DatabaseType>) => {
        const newDatabase = Object.assign({}, prevState.database);
        newDatabase[storeName].push(newEntity);
        return setNewDatabase(prevState, newDatabase);
      }));
      return true
    }
    return false;
  };

  const load = (id?: string) => {
    const storeData = store.database[storeName];
    if (!!storeData) {
      if (id !== undefined) {
        const foundedIndex = storeData.findIndex((v) => v.id === id);
        if (!!storeData[foundedIndex]) {
          return storeData[foundedIndex];
        }
        return undefined
      }
      return storeData;

    }
    return undefined;
  }

  const update = (newEntity: DatabaseType) => {
    const storeData = store.database[storeName];
    if (!!storeData) {
      const foundedIndex = storeData.findIndex((v) => v.id === newEntity.id);
      if (foundedIndex !== -1) {
        setStore(((prevState: LocalStoreType<DatabaseType>) => {
          const newDatabase = Object.assign({}, prevState.database);
          if (!!newDatabase[storeName][foundedIndex]) {
            newDatabase[storeName][foundedIndex] = newEntity;
          }
          return setNewDatabase(prevState, newDatabase);
        }));
        return true;
      }
    }
    return false;
  };

  const remove = (id: string) => {
    const storeData = store.database[storeName];
    if (!!storeData) {
      const foundedIndex = storeData.findIndex((v) => v.id === id);
      if (foundedIndex !== -1) {
        setStore(((prevState: LocalStoreType<DatabaseType>) => {
          const newDatabase = Object.assign({}, prevState.database);
          if (!!newDatabase[storeName][foundedIndex]) {
            newDatabase[storeName].splice(foundedIndex, 1);
          }
          return setNewDatabase(prevState, newDatabase);
        }));
        return true;
      }
    }
    return false;
  }

  const importJSON = (newDataJson: string) => {
    setStore(((prevState: LocalStoreType<DatabaseType>) => {
      const newStoreData = JSON.parse(newDataJson)
      const newDatabase = Object.assign({}, prevState.database);
      newDatabase[storeName] = newStoreData;
      return setNewDatabase(prevState, newDatabase);
    }));
  };

  const exportJSON = () => {
    const storeData = store.database[storeName];
    if (!!storeData) {
      return JSON.stringify(storeData)
    }
    return "[]";
  };

  const clear = () => {
    setStore(((prevState: LocalStoreType<DatabaseType>) => {
      const newDatabase = Object.assign({}, prevState.database);
      newDatabase[storeName] = [];
      return setNewDatabase(prevState, newDatabase);
    }));
  };


  const saveToLS = async () => {
    const storeData = store.database[storeName] ?? [];
    await localStorage.setItem(LOCAL_STORAGE_PREFIX + storeName, JSON.stringify(storeData))
    return true;
  }
  const loadFromLS = () => {
    const lsString = localStorage.getItem(LOCAL_STORAGE_PREFIX + storeName);
    if (!!lsString) {
      const lsData: any[] = JSON.parse(lsString);
      if (!!lsData) {
        setStore(((prevState: LocalStoreType<DatabaseType>) => {
          const newCount = Object.assign({}, prevState.count);
          const newDatabase = Object.assign({}, prevState.database);

          newDatabase[storeName] = lsData;
          newCount[storeName] = lsData.length;
          const viewDatabaseStates = setNewViewDatabase(prevState, newDatabase);
          return {
            ...prevState,
            ...viewDatabaseStates,
            database: newDatabase,
            count: newCount,
          };
        }));
        return true;
      }
    }
    return false;
  }

  useRefEffect(() => {
    if (!store.database[storeName]) {
      setStore(((prevState: LocalStoreType<DatabaseType>) => {
        const newDatabase = Object.assign({}, prevState.database);
        newDatabase[storeName] = [];
        return {...prevState, database: newDatabase};
      }));
    }
  }, [storeName]);

  useRefEffect(async () => {
    if (!!config && !!config.autoSync) {
      if (!!store.database[storeName] && (store.database[storeName].length !== 0 || !!localStorage.getItem(LOCAL_STORAGE_PREFIX + storeName))) {
        console.log("auto save")
        await saveToLS();
      }
      console.log("auto load");
      loadFromLS();
    }
  }, [storeName, store.databaseActionCount[storeName]]);

  return {
    store: store.viewDatabase[storeName] ?? [],
    pager: {pageSize, page, count, filterCount, startPos, endPos, pageCount},
    add: add,
    load: load,
    update: update,
    remove: remove,
    importJSON: importJSON,
    exportJSON: exportJSON,
    clear: clear,
  }
}
