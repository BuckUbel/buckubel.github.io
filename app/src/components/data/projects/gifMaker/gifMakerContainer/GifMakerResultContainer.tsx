import React from "react";
import styled from "styled-components";
import BorderContainer from "../../../../content/BorderContainer";
import { StateType, StyledCompProps } from "../../../../helper/types";

interface GifMakerResultContainerProps extends StyledCompProps {
  onlyVisual: boolean;
  render: () => void;
  isLoading: boolean;
  generatedGifsState: StateType<string[]>;
}

function GifMakerResultContainer({
  className,
  render,
  isLoading,
  generatedGifsState: [generatedGifs, setGeneratedGifs],
}: GifMakerResultContainerProps) {
  return (
    <BorderContainer extraClassName={className}>
      <h4>Generated gifs</h4>
      <button onClick={render}>Render Gif</button>
      <button onClick={() => setGeneratedGifs([])}>Reset Gifs</button>
      {isLoading && <div>Berechnung erfolgt ...</div>}
      {generatedGifs.length > 0 && (
        <>
          {generatedGifs.map((gif) => (
            <a key={gif} href={gif} download={"Awesowme-GIF.gif"}>
              <img alt={"generated gif"} src={gif} />
            </a>
          ))}
        </>
      )}
    </BorderContainer>
  );
}

export default styled(GifMakerResultContainer)``;