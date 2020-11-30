import React from 'react';
import './css/App.css';
import HeaderImage from "./components/header/HeaderImage";
import AppRoutes from "./components/navigation/AppRoutes";
import AppNavigation from "./components/navigation/AppNavigation";
import {routeMatcherFactory} from "./components/navigation/routeMatchFactory";
import {Router} from "react-router-ts";

function App() {
  return (
    <Router routeMatcherFactory={routeMatcherFactory}>
      <AppNavigation/>
      <div className="AppContainer">
        <div className="App">
          <HeaderImage/>
          <AppRoutes/>
        </div>
      </div>
    </Router>
  );
}

export default App;
