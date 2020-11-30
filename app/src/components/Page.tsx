import * as React from "react";
import {StyledCompProps} from "./helper/types";
import Headline from "./header/Headline";
import PageDescription from "./content/PageDescription";
import ColumnsContainer from "./grid/ColumnsContainer";
import Column from "./grid/Column";
import SquareButton from "./buttons/SquareButton";
import {routes} from "./config/routes";
import styled from "styled-components";
import {BOX_SHADOW_PIXEL} from "./config/css";
import {useRouter} from "react-router-ts";

export interface PageProps extends StyledCompProps {
  title: string;
  description?: string;
  subChildren?: JSX.Element
  topSubChildren?: JSX.Element
}

function Page(props: PageProps) {
  const router = useRouter();

  return (
    <div className={props.className}>
      {props.topSubChildren}
      <Headline>{props.title}</Headline>
      <hr className={"top-hr-line"}/>
      {props.description && <PageDescription style={{textAlign: "center"}} content={props.description}/>}
      {props.children}
      <hr className={"bottom-hr-line"}/>
      {router.path !== routes.kontakt.href &&
      <ColumnsContainer>
        <Column colCount={3}>
          <SquareButton link={routes.kontakt.href} text={"Kontakt"}/>
        </Column>
      </ColumnsContainer>}
      {props.subChildren}
    </div>
  );
}

export default styled(Page)`
    padding: 30px 20px 20px 20px;
    position: relative;
    width: calc(100% - 40px);
    text-align: center;

    .headline {
        font-size: 30px;
        text-align: center;
    }

    .page-description {
        text-align: left;
    }

    .page-list-container {
        .page-list-inter-container {
            text-align: left;

            position: relative;
            display: inline-block;
            vertical-align: top;
            background: #58585a;
            color: white;
            width: 100%;
            border-radius: 10px;

            padding: 20px;
            margin: 35px 5px 5px 5px;

            h4 {
                color: #ffa6af;
                font-style: italic;
                font-size: 25px;
                font-weight: 500;
                text-align: center;
                margin: 5px 0 5px 0;
                display: block;
                width: 100%;
            }
        }

        .page-list {
            display: block;
            width: 100%;
            margin-bottom: 15px;

            .page-list-item {
                width: 90%;
                margin-bottom: 5px;
            }
        }
    }

    hr {
        box-shadow: ${BOX_SHADOW_PIXEL};
        margin-bottom: 20px;

        &.top-hr-line {
        }

        &.bottom-hr-line {
            margin-top: 30px;
        }
    }

    .file-link {
        display: block;
        margin-bottom: 5px;
    }

    .file-link-list {
        text-align: left;
    }
`;
