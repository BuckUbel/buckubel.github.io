import React from "react";
import styled from "styled-components";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import Modal from "../../../../../modal/Modal";
import GameEntityPreviewDisplay from "../GameEntityPreviewDisplay/GameEntityPreviewDisplay";
import { useTable } from "../../../../../../hooks/useTable/useTable";

interface GameEntityDisplayModalProps {
  className?: string;
  game?: GameEntityType;
  onClose?: () => void;
}

function GameEntityDisplayModal({
  game,
  onClose,
}: GameEntityDisplayModalProps) {
  const { displayConfig } = useTable<GameEntityType>(
    GameEntityType,
    () => [],
    false
  );
  return (
    <Modal title={game?.name} isOpen={!!game} onClose={onClose}>
      {!!game && (
        <GameEntityPreviewDisplay
          game={game}
          displayConfig={displayConfig}
          outerIsOpen={true}
          withEdit
        />
      )}
    </Modal>
  );
}

export default styled(GameEntityDisplayModal)``;
