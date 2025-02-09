import React from "react";
import styled from "styled-components";
import SitePreviewHeadline from "../../../../../content/SitePreview/SitePreviewHeadline";
import SitePreviewExpander from "../../../../../content/SitePreview/SitePreviewExpander";
import RoundButton from "../../../../../buttons/RoundButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import { StateType } from "../../../../../helper/types";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface GameEntityPreviewHeadlineProps {
  className?: string;
  game: GameEntityType;
  isHover: boolean;
  isOpenState: StateType<boolean>;
  outerIsOpen?: boolean;
  onClick?: () => void;
}

function GameEntityPreviewHeadline({
  game: { name },
  onClick,
  outerIsOpen,
  isHover,
  isOpenState,
}: GameEntityPreviewHeadlineProps) {
  return (
    <SitePreviewHeadline
      isHover={isHover}
      isOpenState={isOpenState}
      leftItem={
        !outerIsOpen ? (
          <SitePreviewExpander isOpenState={isOpenState} />
        ) : undefined
      }
      rightItem={
        onClick ? (
          <RoundButton
            style={{ verticalAlign: "middle", width: "34px" }}
            icon={<FontAwesomeIcon icon={faChevronRight as IconProp} />}
            onClick={onClick}
          />
        ) : undefined
      }
    >
      {name}
    </SitePreviewHeadline>
  );
}

export default styled(GameEntityPreviewHeadline)``;
