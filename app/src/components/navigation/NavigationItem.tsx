import React from "react";
import {useRouteLink, useRouter} from "react-router-ts";
import {CompProps, StyledCompProps} from "../helper/types";
import styled from "styled-components";
import {Color} from "../config/color";
import {TEXTCOLOR} from "../config/css";

export interface NavigationItemContainerProps extends CompProps {
  href: string;
  onClick?: () => void;
}

export interface NavigationItemProps extends NavigationItemContainerProps, StyledCompProps {
  routerPath: string;
}

function NavigationItem(props: NavigationItemProps) {
  const routeLink = useRouteLink(props.href, props.onClick);
  return (
    <div className={"navigation-item " + props.className} onClick={routeLink.onClick}>
      <span>
        {props.children}
      </span>
    </div>
  );
}

const StyledNavigationItem = styled(NavigationItem)`
    background: ${({routerPath, href}) => routerPath === href ? Color.BETA_COLOR : "initial"};

    vertical-align: middle;
    display: inline-block;
    position: relative;
    background: ${Color.PRIME_COLOR};
    padding: 10px 15px;
    //margin: 10px 0;
    width: calc(100% - 30px);
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
    box-shadow: 0 0 18px -8px ${(Color.TEXT_PRIME_COLOR)};

    transition: color 1s,  text-shadow 1s, background 1s, height 0.5s;

    :hover {
        background: ${Color.TEXT_PRIME_COLOR};
        ${TEXTCOLOR(Color.BETA_COLOR)};
        height: 50px;
    }
`;

function NavigationItemContainer(props: NavigationItemContainerProps) {
  const router = useRouter();
  return (
    <StyledNavigationItem routerPath={router.path} {...props}/>
  );
}

export default NavigationItemContainer;