import {useContext, useEffect} from "react";
import {LocalStoreContext, LocalStoreEntityType, LocalStoreEntryType, LocalStoreType} from "./LocalStoreContext";
import {SetStateType} from "../../components/helper/types";

export interface LSConfigObject {
  autoSync?: boolean;
}

const LOCAL_STORAGE_PREFIX = "MEDIA-MASTER-"

export const useLocalStorage = <DatabaseType extends LocalStoreEntityType>(storeName: string, config?: LSConfigObject) => {
  const [contextStore, contextSetStore] = useContext(LocalStoreContext);
  const store = contextStore as LocalStoreType<DatabaseType>;
  const setStore = contextSetStore as SetStateType<LocalStoreType<DatabaseType>>;

  const saveToLS = () => {
    const storeData = store.database[storeName] ?? [];
    localStorage.setItem(LOCAL_STORAGE_PREFIX + storeName, JSON.stringify(storeData))
    return true;
  }
  const loadFromLS = () => {
    const lsString = localStorage.getItem(LOCAL_STORAGE_PREFIX + storeName);
    if (!!lsString) {
      const lsData = JSON.parse(lsString);
      if (!!lsData) {
        setStore(((prevState: LocalStoreType<DatabaseType>) => {
          const newDatabase = Object.assign({}, prevState.database);
          newDatabase[storeName] = lsData;
          return {...prevState, database: newDatabase};
        }));
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!store.database[storeName]) {
      setStore(((prevState: LocalStoreType<DatabaseType>) => {
        const newDatabase = Object.assign({}, prevState.database);
        newDatabase[storeName] = [];
        return {...prevState, database: newDatabase};
      }));
    }
  }, [storeName]);

  useEffect(() => {
    if (!!config && !!config.autoSync) {
      console.log("auto load");
      loadFromLS();
    }
  }, []);

  useEffect(() => {
    if (!!config && !!config.autoSync &&
      !!store.database[storeName] &&
      (store.database[storeName].length !== 0 ||
        !!localStorage.getItem(LOCAL_STORAGE_PREFIX + storeName))) {
      console.log("auto save")
      saveToLS();
    }
  }, [store.databaseActionCount[storeName]]);

  const setNewDatabase = (prevState: LocalStoreType<DatabaseType>, newDatabase: LocalStoreEntryType) => {
    const newCount = prevState.databaseActionCount[storeName] ?? 0;
    return {
      ...prevState,
      databaseActionCount: {[storeName]: newCount + 1},
      database: newDatabase
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

  return {
    store: store.database[storeName] ?? [],
    add: add,
    load: load,
    update: update,
    remove: remove,
    importJSON: importJSON,
    exportJSON: exportJSON,
    clear: clear,
  }
}
