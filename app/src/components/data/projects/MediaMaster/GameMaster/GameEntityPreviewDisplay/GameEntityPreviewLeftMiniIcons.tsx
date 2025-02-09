import React from "react";
import styled from "styled-components";
import SitePreviewMiniIcons from "../../../../../content/SitePreview/SitePreviewMiniIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDice,
  faDiceFour,
  faDiceOne,
  faDiceThree,
  faDiceTwo,
  faGamepad,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface GameEntityPreviewLeftMiniIconsProps {
  className?: string;
  game: GameEntityType;
}

function GameEntityPreviewLeftMiniIcons({
  game: {
    goodForPlayerCount,
    notYetPlayed,
    alreadyCompleted,
    playTime,
    estimatedPlayTime,
  },
}: GameEntityPreviewLeftMiniIconsProps) {
  const leftIcons: IconDefinition[] = [];

  if (goodForPlayerCount) {
    goodForPlayerCount.forEach((v) => {
      if (v === 1) leftIcons.push(faDiceOne);
      if (v === 2) leftIcons.push(faDiceTwo);
      if (v === 3) leftIcons.push(faDiceThree);
      if (v === 4) leftIcons.push(faDiceFour);
      if (v > 4) leftIcons.push(faDice);
    });
  }

  const playTimeString = playTime > 0 ? playTime + "h" : "";
  const estimatedPlayTimeString =
    estimatedPlayTime > 0 ? estimatedPlayTime + "h" : "";

  return (
    <SitePreviewMiniIcons icons={leftIcons} direction={"left"}>
      <span className="fa-layers fa-fw fa-2x">
        <FontAwesomeIcon icon={faGamepad as IconProp} />
        {notYetPlayed && (
          <FontAwesomeIcon icon={faTimes as IconProp} transform="shrink-5" color={"#f00"} />
        )}
        {alreadyCompleted && (
          <FontAwesomeIcon icon={faCheck as IconProp} transform="shrink-5" color={"#0f0"} />
        )}
      </span>
      <span>
        {playTimeString}
        {!!playTimeString && !!estimatedPlayTimeString ? "/" : ""}
        {estimatedPlayTimeString}
      </span>
    </SitePreviewMiniIcons>
  );
}

export default styled(GameEntityPreviewLeftMiniIcons)``;
