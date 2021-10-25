import React, { ChangeEvent, RefObject, useEffect } from "react";
import styled from "styled-components";
import { StateType, StyledCompProps } from "../../../../helper/types";
import BorderContainer from "../../../../content/BorderContainer";
import ImageItem from "../ImageItem";
import { shortHash } from "../helper/shortHash";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../../../config/color";

interface GifMakerSourceContainerProps extends StyledCompProps {
  onlyVisual: boolean;
  addImage: (src: string) => () => void;
  addToUploadedImages: (newSrc: string) => () => void;
  removeFromUploadedImages: (oldSrc: string) => () => void;
  currentSelectedImageState: StateType<string>;
  uploadedImages: string[];
  widthState: StateType<number>;
  heightState: StateType<number>;
  startEditing: (ref: RefObject<HTMLImageElement>) => void;
  srcRef: React.RefObject<HTMLImageElement>;
}

function GifMakerSourceContainer({
  className,
  onlyVisual,
  addImage,
  addToUploadedImages,
  removeFromUploadedImages,
  currentSelectedImageState: [currentSelectedImage, setCurrentSelectedImage],
  uploadedImages: uploadedImages,
  widthState: [, setWidth],
  heightState: [, setHeight],
  startEditing,
  srcRef,
}: GifMakerSourceContainerProps) {
  useEffect(() => {
    if (srcRef.current !== null) {
      setWidth(srcRef.current.width);
      setHeight(srcRef.current.height);
    }
  }, [currentSelectedImage]);

  const addAllUploadImagesToFrames = () => {
    uploadedImages.forEach((upSrc: string) => {
      addImage(upSrc)();
    });
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files.item(i);
        if (file !== null && file.type.startsWith("image")) {
          const reader = new FileReader();
          reader.onload = (progressEvent) => {
            if (progressEvent.target !== null) {
              const newSrc = progressEvent.target.result as string;

              const tempImg = new Image();
              tempImg.src = newSrc;
              tempImg.onload = function () {
                setWidth(tempImg.width);
                setHeight(tempImg.height);
              };

              addToUploadedImages(newSrc);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  return (
    <BorderContainer extraClassName={className}>
      <input
        type={"file"}
        accept={"image/*"}
        onChange={handleImageUpload}
        multiple
      />
      <h4>Selected Image</h4>

      {currentSelectedImage === "" && <p>Kein Bild ausgewählt!</p>}
      {currentSelectedImage !== "" && (
        <div className={"source-image"}>
          <ImageItem
            key={shortHash(currentSelectedImage) + "-src"}
            id={shortHash(currentSelectedImage)}
            alt={"src image"}
            src={currentSelectedImage}
            buttons={[
              {
                icon: faUpload,
                style: { background: Color.TEXT_SUCCESS_COLOR },
                onClick: () => addImage(currentSelectedImage)(),
              },
              {
                icon: faEdit,
                style: { background: Color.TEXT_SECOND_COLOR },
                onClick: () => startEditing(srcRef),
              },
            ]}
            imageRef={srcRef}
            size={100}
          />
        </div>
      )}
      <h4>Images</h4>
      {uploadedImages.length === 0 && <p>Keine Bilder vorhanden!</p>}
      <div className={"source-images-inner-container"}>
        {uploadedImages.map((upSrc: string, index: number) => (
          <ImageItem
            key={shortHash(upSrc) + String(index)}
            src={upSrc}
            size={60}
            isSelected={shortHash(upSrc) === shortHash(currentSelectedImage)}
            buttons={[
              {
                icon: faUpload,
                style: { background: Color.ALPHA_COLOR },
                onClick: () => addImage(upSrc)(),
              },
              {
                icon: faEdit,
                style: { background: Color.BETA_COLOR },
                onClick: (thisRef: RefObject<HTMLImageElement>) =>
                  startEditing(thisRef),
              },
              {
                icon: faTrash,
                style: { background: Color.TEXT_ERROR_COLOR },
                onClick: () => removeFromUploadedImages(upSrc),
              },
            ]}
            onClick={() => {
              if (!onlyVisual) {
                setCurrentSelectedImage(upSrc);
              }
            }}
          />
        ))}
      </div>
      <button onClick={() => addAllUploadImagesToFrames()}>
        Add all images to frames
      </button>
    </BorderContainer>
  );
}

export default styled(GifMakerSourceContainer)`
  padding-top: 5px;

  .source-image {
    display: block;
    margin: 0 auto 20px auto;
  }

  .source-images-inner-container {
  }
`;
