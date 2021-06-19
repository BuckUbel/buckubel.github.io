import React, {useState} from 'react';
import {GameEntityType} from "../mediaTypes/GameEntityType";
import {InterfaceChangedPropTypes} from "../../../../helper/utilTypes";
import Column from "../../../../grid/Column";
import SitePreviewContent from "../../../../content/SitePreview/SitePreviewContent";
import SitePreviewHeadline from "../../../../content/SitePreview/SitePreviewHeadline";
import SitePreviewDescription from "../../../../content/SitePreview/SitePreviewDescription";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronRight,
  faDice,
  faDiceFour,
  faDiceOne,
  faDiceThree,
  faDiceTwo,
  faGamepad,
  faTimes,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import SitePreviewBubble from "../../../../content/SitePreview/SitePreviewBubble";
import SitePreviewMiniIcons from "../../../../content/SitePreview/SitePreviewMiniIcons";
import {faCircle as faCircleRegular} from "@fortawesome/free-regular-svg-icons";
import SitePreviewExpander from "../../../../content/SitePreview/SitePreviewExpander";
import RoundButton from "../../../../buttons/RoundButton";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import {rgbToHex} from "../../../../helper/rgbToHex";

function getColorFromScore(score: number): string {
  const correctedScore = Math.min(100, Math.max(score, 0));
  let r = 255;
  let g = 0;
  if (score <= 50) {
    r = 255;
    g = (255 / 50) * correctedScore;
  }
  if (score > 50) {
    r = 510 + (-255 / 50) * correctedScore;
    g = 255;
  }
  return rgbToHex(Math.round(r), Math.round(g), 0);
}

interface GameEntityPreviewDisplayProps {
  className?: string;
  game: GameEntityType
  displayConfig?: Partial<InterfaceChangedPropTypes<GameEntityType, boolean>>;
}

function GameEntityPreviewDisplay(props: GameEntityPreviewDisplayProps) {
  const {className, game} = props;
  const {
    // id,
    name,
    format,
    // tags,
    releaseDate,
    // additionalData,
    usk,
    // notices,
    score,
    // reviewNotes,
    // usages,
    plattform, // :string
    condition, // :number
    goodForPlayerCount, // :number
    withOVP, // :boolean
    ovpCondition, // :number
    playTime, // :number
    estimatedPlayTime, // :number
    notYetPlayed, // :boolean
    alreadyCompleted, // :boolean
    // relatedMedias,
    plattformColor
  } = game
  const [isHover, setIsHover] = useState(false);
  const isOpenState = useState(false);
  const [isOpen] = isOpenState;

  const rightIcons: IconDefinition[] = [];
  const leftIcons: IconDefinition[] = [];

  if (goodForPlayerCount) {
    goodForPlayerCount.forEach(v => {
      if (v === 1) leftIcons.push(faDiceOne);
      if (v === 2) leftIcons.push(faDiceTwo);
      if (v === 3) leftIcons.push(faDiceThree);
      if (v === 4) leftIcons.push(faDiceFour);
      if (v > 4) leftIcons.push(faDice);
    })
  }

  const playTimeString = playTime > 0 ? playTime + "h" : "";
  const estimatedPlayTimeString = estimatedPlayTime > 0 ? estimatedPlayTime + "h" : "";
  const scoreColor = getColorFromScore(score);

  return (
    <Column className={className} colCount={3} minWidth={"450px"} maxWidth={"600px"} onHover={(v) => setIsHover(v)}>
      <SitePreviewContent onClick={() => {
      }} isHover={isHover}>
        <SitePreviewBubble isHover={false} icon={faGamepad} backgroundColor={plattformColor}/>
        <SitePreviewMiniIcons icons={leftIcons} direction={"left"}>
          <span className="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faGamepad}/>
            {notYetPlayed && <FontAwesomeIcon icon={faTimes} transform="shrink-5" color={"#f00"}/>}
            {alreadyCompleted && <FontAwesomeIcon icon={faCheck} transform="shrink-5" color={"#0f0"}/>}
          </span>
          <span>
            {playTimeString}
            {!!playTimeString && !!estimatedPlayTimeString ? "/" : ""}
            {estimatedPlayTimeString}
          </span>
        </SitePreviewMiniIcons>
        <SitePreviewMiniIcons icons={rightIcons} direction={"right"}>
          <span>{plattform}</span>
          {score >= 0 &&
           <span className="fa-layers fa-fw fa-2x" style={{color: scoreColor}}>
            <FontAwesomeIcon icon={faCircleRegular} size={"2x"}/>
            <span style={{marginLeft: "2px"}}>{score}</span>
          </span>}
        </SitePreviewMiniIcons>
        <SitePreviewHeadline isHover={isHover} isOpenState={isOpenState}
                             leftItem={<SitePreviewExpander isOpenState={isOpenState}/>}
                             rightItem={<RoundButton style={{verticalAlign: "middle", width: "34px"}}
                                                     icon={<FontAwesomeIcon icon={faChevronRight}/>}/>}>
          {name}
        </SitePreviewHeadline>
        {isOpen && <SitePreviewDescription style={{textAlign: "left"}}>
            <ReactMarkdown>
              {
                GameEntityType.rowNames.format + ": " + format +
                "\n\n" +
                GameEntityType.rowNames.releaseDate + ": " + releaseDate +
                "\n\n" +
                GameEntityType.rowNames.usk + ": " + usk +
                "\n\n" +
                GameEntityType.rowNames.condition + ": " + condition +
                "\n\n" +
                GameEntityType.rowNames.withOVP + ": " + (withOVP ? "Ja" : "Nein") +
                "\n\n" +
                GameEntityType.rowNames.ovpCondition + ": " + ovpCondition
              }
            </ReactMarkdown>
        </SitePreviewDescription>}
      </SitePreviewContent>

      {/*{!!displayConfig?.tags && <p>{GameEntityType.rowNames.tags + ": " + tags}</p>}*/}

      {/*{!!displayConfig?.usages && <p>{GameEntityType.rowNames.usages + ": " + usages}</p>}*/}

      {/*{!!displayConfig?.relatedMedias && <p>{GameEntityType.rowNames.relatedMedias + ": " + relatedMedias}</p>}*/}
      {/*{!!displayConfig?.reviewNotes &&*/}
      {/*<p>{GameEntityType.rowNames.reviewNotes + ": "} <ReactMarkdown>{reviewNotes}</ReactMarkdown></p>}*/}
      {/*{!!displayConfig?.notices &&*/}
      {/*<p>{GameEntityType.rowNames.notices + ": "}<ReactMarkdown>{notices}</ReactMarkdown></p>}*/}
      {/*{!!displayConfig?.additionalData && <p>{GameEntityType.rowNames.additionalData + ": " + additionalData}</p>}*/}


      {/*{!!displayConfig?.id && <p>{GameEntityType.rowNames.id + ": " + id}</p>}*/}

    </Column>
  );
}

export default styled(GameEntityPreviewDisplay)`

`;
