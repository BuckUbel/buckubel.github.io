import React, { useState } from "react";
import Modal from "./Modal";
import RoundButton from "../buttons/RoundButton";
import styled from "styled-components";

interface YesNoModalProps {
  className?: string;
  title?: string;
  yesText?: string;
  noText?: string;
  description?: string;
  yesAction?: () => void;
  noAction?: () => void;
  onClose?: () => void;
  buttonCreator: (onClick: () => void) => void;
}

function YesNoModal(props: YesNoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleYes = () => {
    if (!!props.yesAction) {
      props.yesAction();
    }
    setIsOpen(false);
  };
  const handleNo = () => {
    if (!!props.noAction) {
      props.noAction();
    }
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title={props.title ?? "Aktion abbrechen?"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        furtherClassName={props.className}
      >
        {props.description ?? <p>Wollen Sie die Aktion durchführen?</p>}
        <div className={"yes-no-modal-button-container"}>
          {props.noAction !== undefined && (
            <RoundButton
              link={""}
              onClick={handleNo}
              text={props.noText ?? "Nein"}
            />
          )}
          {props.yesAction !== undefined && (
            <RoundButton
              link={""}
              onClick={handleYes}
              text={props.yesText ?? "Ja"}
            />
          )}
        </div>
      </Modal>
      {props.buttonCreator(() => setIsOpen(true))}
    </>
  );
}

export default styled(YesNoModal)`
  .modal-content {
    padding: 10px 15px;
  }
  .yes-no-modal-button-container {
    margin-top: 10px;
  }
`;
