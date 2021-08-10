import React, { useState } from "react";
import styled from "styled-components";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import Modal from "../../../../../modal/Modal";
import { useLocalStorage } from "../../../../../../hooks/useLocalStorage/useLocalStorage";
import GameEntityForm from "../GameEntityForm/GameEntityForm";

interface GameEntityEditModalProps {
  className?: string;
  game?: GameEntityType;
  onSubmit?: (game: GameEntityType) => void;
  buttonCreator: (onClick: () => void) => void;
}

function GameEntityEditModal({
  className,
  game,
  onSubmit,
  buttonCreator,
}: GameEntityEditModalProps) {
  const { update } = useLocalStorage<GameEntityType>("games");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSubmit = (newGame: GameEntityType) => {
    setIsOpen(false);
    const withSuccess = update(newGame);
    if (withSuccess && !!onSubmit) {
      onSubmit(newGame);
    }
  };
  return (
    <>
      <Modal
        title={`Spiel bearbeiten`}
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

export default styled(GameEntityEditModal)``;
