import React from "react";
import {CompProps} from "../helper/types";
import '../../css/Grid.css';
import {AlignItemsProperty, HeightProperty} from "csstype";

interface ColumnsContainerProps extends CompProps {
  alignItems?: AlignItemsProperty;
  height?: HeightProperty<string>;
}

function ColumnsContainer(props: ColumnsContainerProps) {
  return (
    <div className="columns-container"
         style={{
           alignItems: props.alignItems ? props.alignItems : "initial",
           height: props.height ? props.height : "initial"
         }}>
      {props.children}
    </div>
  );
}

export default ColumnsContainer;
