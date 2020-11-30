import React from 'react';
import HeaderImage from "./components/header/HeaderImage";
import AppRoutes from "./components/navigation/AppRoutes";
import AppNavigation from "./components/navigation/AppNavigation";
import {routeMatcherFactory} from "./components/navigation/routeMatchFactory";
import {Router} from "react-router-ts";
import {StyledCompProps} from "./components/helper/types";
import styled from "styled-components";
import {Color} from "./components/config/color";
import {TEXTCOLOR} from "./components/config/css";

function App(props: StyledCompProps) {
  return (
    <Router routeMatcherFactory={routeMatcherFactory}>
      <AppNavigation/>
      <div className={props.className}>
        <div className="App">
          <HeaderImage/>
          <AppRoutes/>
        </div>
      </div>
    </Router>
  );
}

export default styled(App)`
    background-color: ${Color.PRIME_COLOR};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};

    overflow: hidden;

    .App {
        height: 100%;
        width: calc(100% - 150px);
        position: absolute;
        display: block;
        top: 0;
        left: 150px;
        text-align: center;

        max-width: 95%;
    }

    .App h2 {
        text-decoration: underline;
    }
`;
