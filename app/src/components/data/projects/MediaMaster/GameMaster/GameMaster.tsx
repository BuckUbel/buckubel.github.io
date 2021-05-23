import React from 'react';
import styled from 'styled-components';
import RoundButton from "../../../../buttons/RoundButton";
import {GameEntityType} from "../mediaTypes/GameEntityType";
import {useLocalStorage} from "../../../../../hooks/useLocalStorage/useLocalStorage";
import TableHead from "../../../../table/TableHead";
import GameEntityPreviewDisplay from "./GameEntityPreviewDisplay";
import GridTable from "../../../../table/GridTable";
import {useTable} from "../../../../../hooks/useTable/useTable";

interface GameMasterProps {
  classname?: string;
}

function GameMaster(props: GameMasterProps) {
  const {displayConfig, toggleRowDisplay} = useTable<GameEntityType>(GameEntityType,()=>[]);
  const {add, store} = useLocalStorage<GameEntityType>('games', {autoSync: true});
  const a = GameEntityType.create<GameEntityType>({
    name: "Horror Game"
  })
  return (
    <>
      <RoundButton link={""} onClick={() => add(a)} text={"Here"}/>
      <GridTable classname={""}>
        <TableHead rowNames={[]}/>
        {store.map(v => <GameEntityPreviewDisplay key={v.id} game={v} displayConfig={displayConfig}/>)}
      </GridTable>
    </>
  );
}

export default styled(GameMaster)``;
