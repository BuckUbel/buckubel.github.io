import React, { useState } from "react";
import styled from "styled-components";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import Modal from "../../../../../modal/Modal";
import { useRefMemo } from "../../../../../helper/useRefHook";
import { useLocalStorage } from "../../../../../../hooks/useLocalStorage/useLocalStorage";
import GameEntityForm from "../GameEntityForm/GameEntityForm";

interface GameEntityAddModalProps {
  className?: string;
  onSubmit?: (game: GameEntityType) => void;
  buttonCreator: (onClick: () => void) => void;
}

function GameEntityAddModal({
  className,
  onSubmit,
  buttonCreator,
}: GameEntityAddModalProps) {
  const { add } = useLocalStorage<GameEntityType>("games");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const game = useRefMemo(
    () =>
      GameEntityType.create<GameEntityType>({
        name: "Horror Game",
      }),
    [isOpen]
  );
  const handleSubmit = (newGame: GameEntityType) => {
    setIsOpen(false);
    const withSuccess = add(newGame);
    if (withSuccess && !!onSubmit) {
      onSubmit(newGame);
    }
  };
  return (
    <>
      <Modal
        title={`Spiel hinzufügen`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        furtherClassName={className}
      >
        <GameEntityForm defaultGameValues={game} handleSubmit={handleSubmit} />
      </Modal>
      {buttonCreator(() => setIsOpen(true))}
    </>
  );
}

export default styled(GameEntityAddModal)``;
