import React from "react";
import styled from "styled-components";
import {StyledCompProps} from "../../../helper/types";
import kanaProImage from "../../../../images/projects/kanaPro.gif";

interface KanaPro2Props extends StyledCompProps {}

function KanaPro2(props: KanaPro2Props) {

  return (
    <div className={props.className}>
      <div>
        <a href={"https://buckubel.github.io/kanaquiz/"} target="_blank" rel="noopener noreferrer">
          <img src={kanaProImage} alt={"Bild von Kana Pro 2"}/>
        </a>
        <p>
          Visit my cool japanese learn website!
        </p>
        <a href={"https://buckubel.github.io/kanaquiz/"} target="_blank" rel="noopener noreferrer">
          START JAPANESE LEARNING!
        </a>
      </div>

    </div>
  );
}

export default styled(KanaPro2)``;
