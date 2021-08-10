import React, { useState } from "react";
import ColumnsContainer from "../../../../../grid/ColumnsContainer";
import Column from "../../../../../grid/Column";
import RoundButton from "../../../../../buttons/RoundButton";
import styled from "styled-components";
import { GameEntityType } from "../../mediaTypes/GameEntityType";
import FormProvider from "../../../../../../hooks/useForm/FormProvider";
import InputField from "../../../../../form/InputField";
import { StateType } from "../../../../../helper/types";

interface GameEntityFormProps {
  className?: string;
  defaultGameValues?: GameEntityType;
  handleSubmit?: (game: GameEntityType) => void;
}

function GameEntityForm({
  defaultGameValues,
  handleSubmit,
}: GameEntityFormProps) {
  const gameState: StateType<GameEntityType> = useState(() =>
    GameEntityType.create<GameEntityType>(defaultGameValues)
  );
  const [game, setGame] = gameState;
  return (
    <FormProvider state={gameState} entityClass={GameEntityType}>
      <ColumnsContainer>
        <Column colCount={3}>
          <InputField name={"name"} state={gameState} label={"Name"} />
        </Column>
        <Column colCount={3}>
          <InputField name={"name"} state={gameState} label={"Name"} />
        </Column>
        <Column colCount={3}>
          <InputField name={"name"} state={gameState} label={"Name"} />
        </Column>
        <Column colCount={3}>
          <InputField name={"name"} state={gameState} label={"Name"} />
        </Column>
      </ColumnsContainer>
      {!!handleSubmit && (
        <ColumnsContainer>
          <RoundButton link={""} onClick={handleSubmit} text={"Speichern"} />
        </ColumnsContainer>
      )}
    </FormProvider>
  );
}

export default styled(GameEntityForm)``;
