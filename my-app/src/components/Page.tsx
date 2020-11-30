import * as React from "react";
import {CompProps} from "./helper/types";
import Headline from "./header/Headline";
import '../css/Page.css';
import PageDescription from "./content/PageDescription";
import ColumnsContainer from "./grid/ColumnsContainer";
import Column from "./grid/Column";
import SquareButton from "./buttons/SquareButton";
import {routes} from "./config/routes";

export interface PageProps extends CompProps {
  title: string;
  description?: string;
  subChildren?: JSX.Element
  topSubChildren?: JSX.Element
}

function Page(props: PageProps) {
  return (
    <div className="page">
      {props.topSubChildren}
      <Headline>{props.title}</Headline>
      <hr/>
      {props.description && <PageDescription style={{textAlign: "center"}} content={props.description}/>}
      {props.children}
      <ColumnsContainer>
        <Column colCount={3}>
          <SquareButton link={routes.default.href} text={"Todo"}/>
        </Column>
        <Column colCount={3}>
          <SquareButton link={routes.default.href} text={"Todo"}/>
        </Column>
        <Column colCount={3}>
          <SquareButton link={routes.kontakt.href} text={"Kontakt"}/>
        </Column>
      </ColumnsContainer>
      {props.subChildren}
    </div>
  );
}

export default Page;
