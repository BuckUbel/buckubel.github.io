import React from 'react';
import styled from 'styled-components';
import {CompProps} from "../helper/types";

interface GridTableProps extends CompProps {
  classname?: string;
}

function GridTable(props: GridTableProps) {
  return (
    <>
      {props.children}
    </>
  );
}

export default styled(GridTable)``;
