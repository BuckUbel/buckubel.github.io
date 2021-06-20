import React from "react";
import styled from "styled-components";
import SitePreviewDescription from "../../../../../content/SitePreview/SitePreviewDescription";
import ReactMarkdown from "react-markdown";
import { GameEntityType } from "../../mediaTypes/GameEntityType";

interface GameEntityPreviewDescriptionProps {
  className?: string;
  game: GameEntityType;
}

function GameEntityPreviewDescription({
  game: { format, releaseDate, usk, condition, withOVP, ovpCondition },
}: GameEntityPreviewDescriptionProps) {
  return (
    <SitePreviewDescription style={{ textAlign: "left" }}>
      <ReactMarkdown>
        {GameEntityType.rowNames.format +
          ": " +
          format +
          "\n\n" +
          GameEntityType.rowNames.releaseDate +
          ": " +
          releaseDate +
          "\n\n" +
          GameEntityType.rowNames.usk +
          ": " +
          usk +
          "\n\n" +
          GameEntityType.rowNames.condition +
          ": " +
          condition +
          "\n\n" +
          GameEntityType.rowNames.withOVP +
          ": " +
          (withOVP ? "Ja" : "Nein") +
          "\n\n" +
          GameEntityType.rowNames.ovpCondition +
          ": " +
          ovpCondition}
      </ReactMarkdown>
    </SitePreviewDescription>
  );
}

export default styled(GameEntityPreviewDescription)``;
