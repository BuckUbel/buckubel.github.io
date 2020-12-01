import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";

interface NameValidatorProps extends StyledCompProps {
}

function AdventOfCode2020(props: NameValidatorProps) {

  return (
    <div className={props.className}>
      Lasst uns beginnen!
    </div>
  );
}

export default styled(AdventOfCode2020)`
`;
