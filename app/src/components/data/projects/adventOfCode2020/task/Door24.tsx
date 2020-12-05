import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../../helper/types";

interface Door2Props extends StyledCompProps {
}

function Door2(props: Door2Props) {

  // const stepOne = window.performance.now();
  // const stepTwo = window.performance.now();
  // const stepThree = window.performance.now();

  return (
    <div className={props.className}>
      {/*First step*/}

      <hr/>
      {/*Second step*/}

      <hr/>
      {/*Summary step*/}


      <hr/>
      <hr/>
    </div>
  );
}

export default styled(Door2)`

`;
