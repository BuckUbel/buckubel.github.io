import React from 'react';
import styled from 'styled-components';

interface TableHeadProps {
  classname?: string;
  rowNames: string[];
}

function TableHead(props: TableHeadProps) {
  return (
    <>
      {props.rowNames.map(v=><span>{v}</span>)}
    </>
  );
}

export default styled(TableHead)``;
