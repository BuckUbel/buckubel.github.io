import React from 'react';
import styled from 'styled-components';
import RoundButton from "../../../../buttons/RoundButton";
import {GameEntityType} from "../mediaTypes/GameEntityType";
import {useLocalStorage} from "../../../../../hooks/useLocalStorage/useLocalStorage";
import GameEntityPreviewDisplay from "./GameEntityPreviewDisplay";
import {useTable} from "../../../../../hooks/useTable/useTable";
import ColumnsContainer from "../../../../grid/ColumnsContainer";

interface GameMasterProps {
  classname?: string;
}

function GameMaster(props: GameMasterProps) {
  const {displayConfig} = useTable<GameEntityType>(GameEntityType, () => []);
  const {add, store, clear} = useLocalStorage<GameEntityType>('games', {autoSync: true});
  const a = GameEntityType.create<GameEntityType>({
    name: "Horror Game"
  })
  return (
    <>
      <RoundButton link={""} onClick={() => add(a)} text={"Add"}/>
      <RoundButton link={""} onClick={() => clear()} text={"Clear all"}/>
      <ColumnsContainer>
        {/*<TableHead rowNames={GameEntityType.rowNames} displayConfig={displayConfig}/>*/}
        {store.map(v => <GameEntityPreviewDisplay key={v.id} game={v} displayConfig={displayConfig}/>)}
      </ColumnsContainer>
    </>
  );
}

export default styled(GameMaster)``;
