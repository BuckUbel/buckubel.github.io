import React, { useRef } from "react";
import styled from "styled-components";
import { StyledCompProps } from "../../../helper/types";
import { Color } from "../../../config/color";

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
  onDelete?: () => void;
}

function ImageItem({
  className,
  extraClassName = "",
  children,
  id,
  imageRef,
  onClick,
  onDelete,
  isSelected,
  ...imageProps
}: ImageItemProps) {
  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onDelete) {
      onDelete();
    }
    e.stopPropagation();
  };

  const internalRef = useRef<HTMLImageElement>(null);
  const usedRef = imageRef ?? internalRef;
  return (
    <div className={className + " " + extraClassName} onClick={onClick}>
      <div className={"inner-imager-container"}>
        <img className={"display-image"} id={"display-" + id} {...imageProps} />
        <img
          className={"ref-image"}
          id={id}
          ref={imageRef ?? internalRef}
          {...imageProps}
        />
        {onDelete && (
          <div className={"image-delete-button"} onClick={handleDelete}>
            x
          </div>
        )}
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
    .image-delete-button {
      display: none;
      position: absolute;
      top: 1px;
      right: 1px;
      width: 20px;
      height: 20px;
      color: ${Color.TEXT_PRIME_COLOR};
      background: ${Color.TEXT_ERROR_COLOR};
      cursor: pointer;
    }

    :hover {
      .image-delete-button {
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
