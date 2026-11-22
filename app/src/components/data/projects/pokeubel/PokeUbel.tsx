import React from "react";
import styled from "styled-components";
import {StyledCompProps} from "../../../helper/types";
import pokeubel from "../../../../images/projects/pokeubel.gif";

interface PokeUbelProps extends StyledCompProps {}

function PokeUbel(props: PokeUbelProps) {

  return (
    <div className={props.className}>
      <div>
        <a href={"https://buckubel.github.io/pokeubel/"} target="_blank" rel="noopener noreferrer">
          <img src={pokeubel} alt={"Bild von Kana Pro 2"}/>
        </a>
        <p>
          Visit my cool pokemon website to boost yur adventure!
        </p>
        <a href={"https://buckubel.github.io/pokeubel/"} target="_blank" rel="noopener noreferrer">
          START YOUR JOURNEY!
        </a>
      </div>

    </div>
  );
}

export default styled(PokeUbel)``;
