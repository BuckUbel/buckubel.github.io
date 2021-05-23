import {useContext, useEffect, useMemo} from "react";
import {TableContext, TableStateType} from "./TableContext";
import {LocalStoreEntityType} from "../useLocalStorage/LocalStoreContext";

export const useTable = <DatabaseType extends LocalStoreEntityType>(entityClass: typeof LocalStoreEntityType,
                                                                    propNamesFunction: () => Array<keyof DatabaseType>, addToDisplay: boolean = true) => {
  const [tableState, setTableState] = useContext(TableContext);

  const setRowDisplay = (propNames: Array<keyof DatabaseType>, newValue: boolean = true) => {
    setTableState(((prevState: TableStateType) => {
      const newDisplayConfig = Object.assign({}, prevState.displayConfig);
      propNames.forEach((v, i) => {
        newDisplayConfig[v as string] = newValue;
      });
      return {...prevState, displayConfig: newDisplayConfig};
    }));
  }
  const emptyEntity = entityClass.create();
  useEffect(() => {
    const databaseTypeKeys = Object.keys(emptyEntity) as Array<keyof DatabaseType>;
    setRowDisplay(databaseTypeKeys, addToDisplay);
  }, [])

  const toggleRowDisplay = (propNames: Array<keyof DatabaseType>) => {
    setTableState(((prevState: TableStateType) => {
      const newDisplayConfig = Object.assign({}, prevState.displayConfig);
      propNames.forEach((v, i) => {
        newDisplayConfig[v as string] = !newDisplayConfig[v as string];
      });
      return {...prevState, displayConfig: newDisplayConfig};
    }));
  }
  const propNames = useMemo(propNamesFunction, []);
  useEffect(() => {
    toggleRowDisplay(propNames)
  }, [propNames])

  return {
    displayConfig: tableState.displayConfig,
    toggleRowDisplay,
  }
}
