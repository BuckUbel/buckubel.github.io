import React from 'react';
import './App.css';
import {useKeyBoard} from "./useKeyBoard";
import {useTextCalculator} from "./useTextCalculator";


function App() {
  const [userText, caretPos] = useKeyBoard('', 0);
  const textValue = useTextCalculator(userText);

  return (
    <div className="AppContainer">
      <div className="App">
        <h2>Name Validator</h2>
        <h5>Try it and input your name {textValue > 0 && textValue}
        </h5>
        <div id={"the-input-field-container"}>
          <div id={"the-input-field"} className={"typewriter"}>
            <p>
              {caretPos === 0 && <span id={"the-caret"}/>}
              {Array.from(userText).map((l: string, i: number) => {
                return <React.Fragment key={i}>
                  {l}
                  {(i === caretPos - 1) && <span id={"the-caret"}/>}
                </React.Fragment>;
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
