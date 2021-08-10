import React, { useState } from "react";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import { InterfaceChangedPropTypes } from "../../../../../helper/utilTypes";
import Column from "../../../../../grid/Column";
import SitePreviewContent from "../../../../../content/SitePreview/SitePreviewContent";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import SitePreviewBubble from "../../../../../content/SitePreview/SitePreviewBubble";
import styled from "styled-components";
import { useConnectState } from "../../../../../helper/useConnectState";
import GameEntityPreviewLeftMiniIcons from "./GameEntityPreviewLeftMiniIcons";
import GameEntityPreviewRightMiniIcons from "./GameEntityPreviewRightMiniIcons";
import GameEntityPreviewHeadline from "./GameEntityPreviewHeadline";
import GameEntityPreviewDescription from "./GameEntityPreviewDescription";
import RoundButton from "../../../../../buttons/RoundButton";
import GameEntityEditModal from "../GameEntityModal/GameEntityEditModal";

interface GameEntityPreviewDisplayProps {
  className?: string;
  game: GameEntityType;
  onClick?: () => void;
  displayConfig?: Partial<InterfaceChangedPropTypes<GameEntityType, boolean>>;
  outerIsOpen?: boolean;
  withEdit?: boolean;
}

function GameEntityPreviewDisplay(props: GameEntityPreviewDisplayProps) {
  const { className, game, onClick, outerIsOpen, withEdit } = props;
  const { plattformColor } = game;

  const [isHover, setIsHover] = useState(false);
  const isOpenState = useConnectState(outerIsOpen ?? false);
  const [isOpen] = isOpenState;

  return (
    <Column
      className={className}
      colCount={3}
      minWidth={"450px"}
      maxWidth={"600px"}
      onHover={(v) => setIsHover(v)}
    >
      <SitePreviewContent isHover={isHover}>
        <SitePreviewBubble
          isHover={false}
          icon={faGamepad}
          backgroundColor={plattformColor}
        />
        <GameEntityPreviewLeftMiniIcons game={game} />
        <GameEntityPreviewRightMiniIcons game={game} />
        <GameEntityPreviewHeadline
          game={game}
          isHover={isHover}
          isOpenState={isOpenState}
          outerIsOpen={outerIsOpen}
          onClick={onClick}
        />
        {isOpen && <GameEntityPreviewDescription game={game} />}
        {withEdit && isOpen && (
          <GameEntityEditModal
            game={game}
            buttonCreator={(onClick) => (
              <RoundButton link={""} onClick={onClick} text={"Edit"} />
            )}
          />
        )}
      </SitePreviewContent>

      {/*{!!displayConfig?.tags && <p>{GameEntityType.rowNames.tags + ": " + tags}</p>}*/}
      {/*{!!displayConfig?.usages && <p>{GameEntityType.rowNames.usages + ": " + usages}</p>}*/}
      {/*{!!displayConfig?.relatedMedias && <p>{GameEntityType.rowNames.relatedMedias + ": " + relatedMedias}</p>}*/}
      {/*{!!displayConfig?.reviewNotes &&*/}
      {/*<p>{GameEntityType.rowNames.reviewNotes + ": "} <ReactMarkdown>{reviewNotes}</ReactMarkdown></p>}*/}
      {/*{!!displayConfig?.notices &&*/}
      {/*<p>{GameEntityType.rowNames.notices + ": "}<ReactMarkdown>{notices}</ReactMarkdown></p>}*/}
      {/*{!!displayConfig?.additionalData && <p>{GameEntityType.rowNames.additionalData + ": " + additionalData}</p>}*/}
    </Column>
  );
}

export default styled(GameEntityPreviewDisplay)``;
