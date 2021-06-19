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
import {Color} from "./config/color";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import RoundButton from "./buttons/RoundButton";
import PageProvider from "../hooks/usePage/PageProvider";
import {usePage} from "../hooks/usePage/usePage";

export interface PageProps extends StyledCompProps {
  title: string;
  returnLink?: string;
  returnClick?: () => void;
  description?: string;
  subChildren?: JSX.Element
  topSubChildren?: JSX.Element
}

function Page(props: PageProps) {
  const router = useRouter();
  const {headlineTitle, returnLink, returnClick} = usePage({link: props.returnLink, click: props.returnClick, title:props.title});

  return (
    <div className={props.className}>
      {(!!returnLink || !!returnClick) && <RoundButton link={returnLink}
                                                       onClick={returnClick}
                                                       icon={<FontAwesomeIcon icon={faChevronLeft}/>}
                                                       float={"left"}
                                                       width={"100%"}/>}
      {props.topSubChildren}
      <Headline>{headlineTitle}</Headline>
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

const StyledPage = styled(Page)`
  padding: 30px 20px 20px 20px;
  position: relative;
  width: calc(100% - 40px);
  text-align: center;
  background: ${Color.PRIME_COLOR};


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
    border-radius: 50%;

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
const PageContainer = (props: PageProps) => <PageProvider>
  <StyledPage {...props}/>
</PageProvider>;

export default PageContainer;
