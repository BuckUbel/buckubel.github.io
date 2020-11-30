import React from "react";
import {StyledCompProps} from "../helper/types";
import {AlignItemsProperty, HeightProperty} from "csstype";
import styled from "styled-components";

interface ColumnsContainerProps extends StyledCompProps {
  alignItems?: AlignItemsProperty;
  height?: HeightProperty<string>;
}

function ColumnsContainer(props: ColumnsContainerProps) {
  return (
    <div className={props.className}
         style={{
           alignItems: props.alignItems ? props.alignItems : "initial",
           height: props.height ? props.height : "initial"
         }}>
      {props.children}
    </div>
  );
}

export default styled(ColumnsContainer)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    .column {
        position: relative;
        display: flex;
        flex-grow: 1;
        justify-content: center;
    }

    .column :first-child(1) {
        margin-left: 0;
    }

    .column :last-child(1) {
        margin-right: 0;
    }
`;
