import React from "react";
import styled from "styled-components";
import { CompProps } from "../helper/types";
import { Color } from "../config/color";
import { TEXTCOLOR } from "../config/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ModalProps extends CompProps {
  className?: string;
  furtherClassName?: string;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

function Modal(props: ModalProps) {
  if (!props.isOpen) {
    return null;
  }
  return (
    <div
      className={`${props.className} modal-background ${props.furtherClassName}`}
    >
      <div className={"modal"}>
        <div className={"modal-header"}>
          <h3 className={"modal-header-title"}>{props.title}</h3>
          <button
            className={"modal-header-close-button"}
            onClick={props.onClose}
          >
            <FontAwesomeIcon size={"2x"} icon={faTimes as IconProp} />
          </button>
        </div>
        <div className={"modal-content"}>{props.children}</div>
        <div className={"modal-footer"} />
      </div>
    </div>
  );
}

export default styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  z-index: 1000;

  .modal {
    position: absolute;
    left: 10%;
    top: 10%;
    width: 80%;
    max-height: 80%;

    background: #000;
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
    ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};

    .modal-header {
      padding: 5px;
      position: relative;
      height: 32px;

      .modal-header-title {
        height: calc(100% - 6px);
        margin: 6px 6px 0 6px;
        font-size: 26px;
      }

      .modal-header-close-button {
        position: absolute;
        width: 32px;
        height: 32px;
        right: 6px;
        top: 6px;

        background: #000;
        border: 1px solid ${Color.TEXT_PRIME_COLOR};
        box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
        ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
      }
    }

    .modal-content {
      padding: 5px 15px;
      overflow-y: auto;
      overflow-x: hidden;
      text-align: center;
    }

    .modal-footer {
    }
  }
`;
