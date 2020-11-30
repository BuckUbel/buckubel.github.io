import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import Column from "../grid/Column";
import ColumnsContainer from "../grid/ColumnsContainer";
import PageList from "./PageList";

export interface ContentList {
  title: string;
  points?: ContentList[]
}

interface PageListContainerProps extends CompProps {
  style?: CSSProperties;
  content: ContentList[];
}

function PageListContainer(props: PageListContainerProps) {
  return (
    <div className="page-list-container" style={props.style}>
      <ColumnsContainer>
        {props.content.map((v, i) => <Column colCount={3} maxWidth={"initial"} key={i}>
            <div className="page-list-inter-container">
              <h4>
                {v.title}
              </h4>
              {v.points && <PageList content={v.points}/>}
            </div>
          </Column>
        )}
      </ColumnsContainer>
      {props.children}
    </div>
  );
}

export default PageListContainer;
