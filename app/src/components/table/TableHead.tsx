import React, {useMemo} from 'react';
import styled from 'styled-components';
import {InterfaceChangedPropTypes, InterfaceChangedPropTypesOnlyRealValues} from "../helper/utilTypes";
import {LocalStoreEntityType} from "../../hooks/useLocalStorage/LocalStoreContext";

interface TableHeadProps<DatabaseEntityType extends LocalStoreEntityType> {
  classname?: string;
  rowNames: InterfaceChangedPropTypesOnlyRealValues<DatabaseEntityType, string>;
  displayConfig?: Partial<InterfaceChangedPropTypes<DatabaseEntityType, boolean>>;
}

function TableHead<DatabaseEntityType extends LocalStoreEntityType>(props: TableHeadProps<DatabaseEntityType>) {
  const displayRowNames = useMemo(() => {
    const displayRowNames: string[] = [];
    if (!props.displayConfig) {
      return Object.values(props.rowNames);
    }
    const displayConfigKeys = Object.keys(props.displayConfig);
    const displayConfigValues = Object.values(props.displayConfig);
    displayConfigKeys.forEach((v, i) => {
      if (displayConfigValues[i]) {
        displayRowNames.push(props.rowNames[v])
      }
    })
    return displayRowNames;
  }, [props.rowNames, props.displayConfig]);
  return (
    <>
      {displayRowNames.map(v => <span>{v + ", "}</span>)}
    </>
  );
}

export default styled(TableHead)``;
