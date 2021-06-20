import React, { useState } from "react";
import styled from "styled-components";
import RoundButton from "../../../../buttons/RoundButton";
import { GameEntityType } from "../mediaTypes/GameEntityType";
import { useLocalStorage } from "../../../../../hooks/useLocalStorage/useLocalStorage";
import GameEntityPreviewDisplay from "./GameEntityPreviewDisplay/GameEntityPreviewDisplay";
import { useTable } from "../../../../../hooks/useTable/useTable";
import ColumnsContainer from "../../../../grid/ColumnsContainer";
import { sortString } from "../../../../helper/sortFunctions";
import GameEntityDisplayModal from "./GameEntityDisplayModal/GameEntityDisplayModal";
import GameEntityEditModal from "./GameEntityEditModal/GameEntityEditModal";
import YesNoModal from "../../../../modal/YesNoModal";

interface GameMasterProps {
  classname?: string;
}

function GameMaster(props: GameMasterProps) {
  const { displayConfig } = useTable<GameEntityType>(
    GameEntityType,
    () => [],
    false
  );
  const { add, update, store, clear } = useLocalStorage<GameEntityType>(
    "games",
    {
      autoSync: true,
      sort: sortString("name"),
      pageSize: 4,
      page: 0,
    }
  );
  const [gameForModal, setGameForModal] = useState<GameEntityType | undefined>(
    undefined
  );
  const openDetailModal = (game: GameEntityType | undefined) => () => {
    setGameForModal(game);
  };
  return (
    <>
      <GameEntityDisplayModal
        game={gameForModal}
        onClose={openDetailModal(undefined)}
      />
      <GameEntityEditModal
        onSubmit={add}
        buttonCreator={(onClick) => (
          <RoundButton link={""} onClick={onClick} text={"Hinzufügen"} />
        )}
      />
      <YesNoModal
        noAction={() => {}}
        yesAction={clear}
        title={"Alles löschen"}
        description={"Wollen sie wirkliche alle Spiele löschen?"}
        buttonCreator={(onClick) => (
          <RoundButton link={""} onClick={onClick} text={"Alles löschen"} />
        )}
      />

      <ColumnsContainer>
        {store.map((v) => (
          <GameEntityPreviewDisplay
            key={v.id}
            game={v}
            onClick={openDetailModal(v)}
            displayConfig={displayConfig}
            update={update}
          />
        ))}
      </ColumnsContainer>
    </>
  );
}

export default styled(GameMaster)``;
