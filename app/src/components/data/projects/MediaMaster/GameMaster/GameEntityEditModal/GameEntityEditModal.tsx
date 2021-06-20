import React, { useState } from "react";
import styled from "styled-components";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import Modal from "../../../../../modal/Modal";
import RoundButton from "../../../../../buttons/RoundButton";
import { useRefMemo } from "../../../../../helper/useRefHook";

interface GameEntityModalProps {
  className?: string;
  game?: GameEntityType;
  onSubmit: (game: GameEntityType) => void;
  buttonCreator: (onClick: () => void) => void;
}

function GameEntityEditModal({
  game,
  onSubmit,
  buttonCreator,
}: GameEntityModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const newGame = useRefMemo(
    () =>
      GameEntityType.create<GameEntityType>({
        name: "Horror Game",
      }),
    [isOpen]
  );
  const handleSubmit = () => {
    setIsOpen(false);
    onSubmit(newGame);
  };
  return (
    <>
      <Modal
        title={`Spiel ${game ? "bearbeiten" : "hinzufügen"}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        TODO: Formular
        <RoundButton link={""} onClick={handleSubmit} text={"Speichern"} />
      </Modal>
      {buttonCreator(() => setIsOpen(true))}
    </>
  );
}

export default styled(GameEntityEditModal)``;
