import React from 'react';
import './App.css';
import NameValidatorComponent from "./nameValidator/NameValidatorComponent";

function App() {
  return (
    <div className="AppContainer">
      <div className="App">
        <h2>Name Validator</h2>
        <NameValidatorComponent/>
      </div>
    </div>
  );
}

export default App;
