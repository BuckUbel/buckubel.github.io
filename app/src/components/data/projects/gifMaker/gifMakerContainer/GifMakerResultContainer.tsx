import React, {useState} from "react";
import styled from "styled-components";
import BorderContainer from "../../../../content/BorderContainer";
import {StateType, StyledCompProps} from "../../../../helper/types";
import TextButton from "../TextButton";
import {faFilm, faImages, faTrash} from "@fortawesome/free-solid-svg-icons";
import ImageItem from "../ImageItem";
import {Color} from "../../../../config/color";

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
    const [showAllGifs, setShowAllGifs] = useState(true);

    return (
        <BorderContainer extraClassName={className}>
            <h4>Generated gifs</h4>
            <TextButton content={"Render Gif"} icons={[faFilm]} onClick={render}/>
            <TextButton
                content={"Reset Gifs"}
                icons={[faTrash]}
                onClick={() => setGeneratedGifs([])}
            />
            {isLoading && <div>Berechnung erfolgt ...</div>}
            {generatedGifs.length > 0 && (
                <div className={"generated-gif-container"}>
                    <div className={"generated-gif-container-first"}>
                        {!!generatedGifs[0] &&
                        <a key={generatedGifs[0]}
                           className={"generated-gif"}
                           href={generatedGifs[0]}
                           download={"Awesowme-GIF.gif"}
                        >
                            <ImageItem
                                src={generatedGifs[0]}
                                size={100}
                            />
                        </a>
                        }
                        {generatedGifs.length > 1 && (
                            <TextButton
                                content={(showAllGifs ? "Show" : "Hide") + " Gifs: " + generatedGifs.length}
                                icons={[faImages]}
                                onClick={() => setShowAllGifs((prev) => !prev)}
                            />)}
                    </div>

                    {generatedGifs.length > 1 && (
                        <div className={`generated-gif-container-collection ${
                            showAllGifs ? "" : "generated-gif-container-collection-hide"
                        }`}>
                            {generatedGifs.map((gif, i) => {
                                if (i === 0) return null;
                                return <a className={"generated-gif"} key={gif} href={gif}
                                          download={"Awesowme-GIF.gif"}>
                                    <ImageItem
                                        src={gif}
                                        size={getSize(generatedGifs.length)}
                                        index={i}
                                    />
                                </a>
                            })}
                        </div>)}
                </div>
            )}

        </BorderContainer>
    );
}

function getSize(count: number) {
    if (count > 40) return 20;
    if (count > 25) return 40;
    if (count > 10) return 75;
    return 100;
}

function getSizeFromProps(props: GifMakerResultContainerProps) {
    const count = props.generatedGifsState[0].length;
    return getSize(count);
}

export default styled(GifMakerResultContainer)`


  .generated-gif-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;


    .generated-gif-container-first {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: flex-start;
    }

    .generated-gif-container-collection {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-evenly;
      align-items: flex-start;

      overflow: auto;
      border: 2px ${Color.TEXT_PRIME_COLOR} solid;
      height: 136px;
      transition: height 0.8s;

      &.generated-gif-container-collection-hide {
        height: 344px;
      }
    }
  }

  .generated-gif {
    img {
      // width: ${getSizeFromProps}px;
      //height: ${getSizeFromProps}px;
      max-width: 100%;
      max-height: 100%;
      //max-height: 200px;
    }
  }
`;
