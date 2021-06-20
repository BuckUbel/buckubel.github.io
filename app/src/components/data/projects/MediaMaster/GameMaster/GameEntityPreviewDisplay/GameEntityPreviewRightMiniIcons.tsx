import React from "react";
import styled from "styled-components";
import SitePreviewMiniIcons from "../../../../../content/SitePreview/SitePreviewMiniIcons";
import ScoreIcon from "../ScoreIcon";
import { GameEntityType } from "../../mediaTypes/GameEntityType";

interface GameEntityPreviewRightMiniIconsProps {
  className?: string;
  game: GameEntityType;
}

function GameEntityPreviewRightMiniIcons({
  game: { plattform, score },
}: GameEntityPreviewRightMiniIconsProps) {
  return (
    <SitePreviewMiniIcons direction={"right"}>
      <span>{plattform}</span>
      <ScoreIcon score={score} />
    </SitePreviewMiniIcons>
  );
}

export default styled(GameEntityPreviewRightMiniIcons)``;
