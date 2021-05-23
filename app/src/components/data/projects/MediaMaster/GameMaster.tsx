import React from 'react';
import styled from 'styled-components';
import RoundButton from "../../../buttons/RoundButton";
import {GameEntityType} from "./mediaTypes/GameEntityType";
import {useLocalStorage} from "../../../../hooks/useLocalStorage/useLocalStorage";

interface GameMasterProps {
  classname?: string;
}

function GameMaster(props: GameMasterProps) {
  const {add, store} = useLocalStorage<GameEntityType>('games', {autoSync: true});
  const a = GameEntityType.create<GameEntityType>({
    name: "Horror Game"
  })
  return (
    <>
      <RoundButton link={""} onClick={() => add(a)} text={"Here"}/>
      {store.map(v => <p key={v.id}>{JSON.stringify(v)}</p>)}
    </>
  );
}

export default styled(GameMaster)``;
