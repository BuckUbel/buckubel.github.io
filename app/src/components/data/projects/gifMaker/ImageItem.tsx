import React, { CSSProperties, RefObject, useRef } from "react";
import styled from "styled-components";
import { StyledCompProps } from "../../../helper/types";
import { Color } from "../../../config/color";
import { IconName } from "@fortawesome/fontawesome-common-types";
import ActionButton from "./ActionButton";

type ImgHTMLProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "ref"
>;

interface ImageItemProps extends StyledCompProps, ImgHTMLProps {
  extraClassName?: string;
  imageRef: React.RefObject<HTMLImageElement>;
  size: number;
  isSelected: boolean;
  buttons: Array<{
    icon: IconName;
    onClick: (ref: RefObject<HTMLImageElement>) => void;
    style?: CSSProperties;
  }>;
  onDelete?: () => void;
}

function ImageItem({
  className,
  extraClassName = "",
  children,
  id,
  size,
  imageRef,
  onClick,
  buttons = [],
  onDelete,
  isSelected,
  ...imageProps
}: ImageItemProps) {
  // TODO: same for canvas items

  const internalRef = useRef<HTMLImageElement>(null);
  const usedRef = imageRef ?? internalRef;
  return (
    <div className={className + " " + extraClassName} onClick={onClick}>
      <div className={"inner-imager-container"}>
        <img className={"display-image"} id={"display-" + id} {...imageProps} />
        <img className={"ref-image"} id={id} ref={usedRef} {...imageProps} />
        <div className={"image-action-buttons"}>
          {buttons.map((button, index) => (
            <ActionButton
              style={button.style}
              size={size / 3}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                button.onClick(usedRef);
                e.stopPropagation();
              }}
              icon={button.icon}
            />
          ))}
        </div>
      </div>
      <p className={"image-item-sub-info"}>
        {usedRef?.current?.width}x{usedRef?.current?.height}
      </p>
    </div>
  );
}

export default styled(ImageItem)`
  display: inline-block;
  vertical-align: top;
  margin: 0 2px;

  .inner-imager-container {
    position: relative;
    display: inline-block;
    border: 2px
      ${(props) =>
        props.isSelected ? Color.TEXT_SECOND_COLOR : Color.TEXT_PRIME_COLOR}
      solid;

    min-width: ${(props) => props.size}px;
    max-width: ${(props) => props.size}px;
    min-height: ${(props) => props.size}px;
    max-height: ${(props) => props.size}px;

    .display-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }

    .ref-image {
      display: none;
    }

    .image-action-buttons {
      display: none;
      position: absolute;
      top: 3px;
      right: 1px;
      width: ${(props) => props.size - 4}px;
    }

    :hover {
      .image-action-buttons {
        display: block;
      }
    }
  }

  .image-item-sub-info {
    margin: 0;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: ${(props) => props.size}px;
    font-size: ${(props) => props.size / 5}px;
  }
`;
