import React, {CSSProperties} from "react";
import {useRouteLink, useRouter} from "react-router-ts";
import {Color} from "../config/color";
import {CompProps} from "../helper/types";

export interface NavigationItemProps extends CompProps {
  href: string;
  onClick?: () => void;
}

function NavigationItem(props: NavigationItemProps) {

  const router = useRouter();
  const routeLink = useRouteLink(props.href, props.onClick);
  let style: CSSProperties = {};
  if (router.path === props.href) {
    style = {background: Color.BETA_COLOR}
  }

  return (
    <a href={props.href}>
      <div
        className={"navigation-item"}
        onClick={routeLink.onClick}
        style={style}
      >
      <span>
        {props.children}
      </span>
      </div>
    </a>
  );
}

export default NavigationItem;
