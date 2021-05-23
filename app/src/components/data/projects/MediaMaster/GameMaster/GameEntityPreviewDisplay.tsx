import React from 'react';
import styled from 'styled-components';
import {GameEntityType} from "../mediaTypes/GameEntityType";
import {InterfaceChangedPropTypes} from "../../../../helper/utilTypes";

interface GameEntityPreviewDisplayProps {
  classname?: string;
  game: GameEntityType
  displayConfig?: Partial<InterfaceChangedPropTypes<GameEntityType, boolean>>;
}

function GameEntityPreviewDisplay(props: GameEntityPreviewDisplayProps) {
  const {game, displayConfig} = props;
  const {
    id,
    plattform, // :string
    condition, // :number
    conditionType, // :GameConditionType
    goodForPlayerCount, // :number
    withOVP, // :boolean
    ovpCondition, // :number
    ovpConditionType, // :GameConditionType
    playTime, // :number
    estimatedPlayTime, // :number
    notYetPlayed, // :boolean
    alreadyCompleted // :boolean
  } = game
  console.log(displayConfig, !!displayConfig?.plattform)
  return (
    <>
      {!!displayConfig?.id && <p>{"id: " + id}</p>}
      {!!displayConfig?.plattform && <p>{"plattform: " + plattform}</p>}
      {!!displayConfig?.condition && <p>{"condition: " + condition}</p>}
      {!!displayConfig?.conditionType && <p>{"conditionType: " + conditionType}</p>}
      {!!displayConfig?.goodForPlayerCount && <p>{"goodForPlayerCount: " + goodForPlayerCount}</p>}
      {!!displayConfig?.withOVP && <p>{"withOVP: " + withOVP}</p>}
      {!!displayConfig?.ovpCondition && <p>{"ovpCondition: " + ovpCondition}</p>}
      {!!displayConfig?.ovpConditionType && <p>{"ovpConditionType: " + ovpConditionType}</p>}
      {!!displayConfig?.playTime && <p>{"playTime: " + playTime}</p>}
      {!!displayConfig?.estimatedPlayTime && <p>{"estimatedPlayTime: " + estimatedPlayTime}</p>}
      {!!displayConfig?.notYetPlayed && <p>{"notYetPlayed: " + notYetPlayed}</p>}
      {!!displayConfig?.alreadyCompleted && <p>{"alreadyCompleted: " + alreadyCompleted}</p>}
    </>
  );
}

export default styled(GameEntityPreviewDisplay)``;
