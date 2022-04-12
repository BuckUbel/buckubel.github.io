import React, {CSSProperties, useRef} from "react";
import styled from "styled-components";
import {RefHTMLImageElement, StyledCompProps} from "../../../helper/types";
import {Color} from "../../../config/color";
import ActionButton from "./ActionButton";
import {IconLookup} from "@fortawesome/fontawesome-common-types";
import {useImageDimensions} from "./hooks/useImageDimensions";

type ImgHTMLProps = Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement>,
  "ref">;

const defaultSize = 100;

interface ImageItemProps extends StyledCompProps, ImgHTMLProps {
  extraClassName?: string;
  image: RefHTMLImageElement;
  imageRef?: React.RefObject<HTMLImageElement>;
  size: number;
  isSelected: boolean;
  buttons: Array<{
    icon: IconLookup;
    onClick: (imgElement: RefHTMLImageElement) => void;
    style?: CSSProperties;
  }>;
  onDelete?: () => void;
  index?: number;
}

function ImageItem({
                     className,
                     extraClassName = "",
                     children,
                     id,
                     size = defaultSize,
                     image,
                     imageRef,
                     onClick,
                     buttons = [],
                     onDelete,
                     isSelected,
                     index,
                     src,
                     ...imageProps
                   }: ImageItemProps) {
  // TODO: same for canvas items

  const [width, height] = useImageDimensions(src);
  const internalRef = useRef<HTMLImageElement>(null);
  const usedImageRef = imageRef ?? internalRef;
  const usedImage = image ?? internalRef.current;
  return (
    <div className={className + " " + extraClassName} onClick={onClick}>
      <div className={"inner-imager-container"}>
        <img
          alt={"visual image"}
          className={"display-image"}
          id={"display-" + id}
          src={src}
          {...imageProps}
        />
        <img
          alt={"non visual image"}
          className={"ref-image"}
          id={id}
          ref={usedImageRef}
          src={src}
          {...imageProps}
        />
        <div className={"image-action-buttons"}>
          {buttons.map((button, index) => (
            <ActionButton
              key={button.icon.iconName + String(index)}
              style={button.style}
              size={size / 3}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                button.onClick(usedImage);
                e.stopPropagation();
              }}
              icon={button.icon}
            />
          ))}
        </div>
      </div>
      <p className={"image-item-sub-info"}>
        {index !== undefined ? `${index}: ` : ""}{width}x{height}
      </p>
    </div>
  );
}

function getSize(props: ImageItemProps) {
  if (!!props.size && props.size > 0) {
    return props.size;
  }
  return defaultSize;
}

export default styled(ImageItem)`
  display: inline-block;
  vertical-align: top;
  margin: 2px;

  border: 2px ${(props) =>
          props.isSelected ? Color.TEXT_SECOND_COLOR : Color.TEXT_PRIME_COLOR} solid;

  .inner-imager-container {
    position: relative;
    display: inline-block;

    min-width: ${getSize}px;
    max-width: ${getSize}px;
    min-height: ${getSize}px;
    max-height: ${getSize}px;

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
      width: ${(props) => getSize(props) - 4}px;
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
    max-width: ${getSize}px;
    font-size: ${(props) => getSize(props) / 5}px;
  }
`;
