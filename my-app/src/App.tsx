import React from 'react';
import './App.css';
import NameValidator from "./nameValidator/NameValidator";

function App() {
  return (
    <div className="AppContainer">
      <div className="App">
        <h2>Name Validator</h2>
        <NameValidator/>
      </div>
    </div>
  );
}

export default App;
