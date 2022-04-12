import React, {ChangeEvent, useEffect, useRef} from "react";
import styled from "styled-components";
import {RefHTMLImageElement, StateType, StyledCompProps} from "../../../../helper/types";
import BorderContainer from "../../../../content/BorderContainer";
import ImageItem from "../ImageItem";
import {shortHash} from "../helper/shortHash";
import {
  faArrowRight,
  faDownload,
  faEdit,
  faImage,
  faImages,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {Color} from "../../../../config/color";
import TextButton, {ElementToUseProps} from "../TextButton";

interface GifMakerSourceContainerProps extends StyledCompProps {
  onlyVisual: boolean;
  addImage: (src: string) => () => void;
  addToUploadedImages: (newSrc: string) => () => void;
  removeFromUploadedImages: (oldSrc: string) => () => void;
  currentSelectedImageState: StateType<string>;
  uploadedImages: string[];
  widthState: StateType<number>;
  heightState: StateType<number>;
  startEditing: (imgElement: RefHTMLImageElement) => void;
  srcRef: React.RefObject<HTMLImageElement>;
  src: RefHTMLImageElement;
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
                                   src,
                                 }: GifMakerSourceContainerProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!!src) {
      setWidth(src.width);
      setHeight(src.height);
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
              if (uploadRef.current !== null) {
                uploadRef.current.value = "";
              }
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  const downloadImage = (imgElement: RefHTMLImageElement) => {
    const newHref = imgElement?.src ?? "";
    if (!!downloadRef.current) {
      downloadRef.current.href = newHref;
      downloadRef.current.click();
    }
  };
  return (
    <BorderContainer extraClassName={className}>
      <h4>Current Image</h4>
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
                icon: faImages,
                style: {background: Color.ALPHA_COLOR},
                onClick: () => addImage(currentSelectedImage)(),
              },
              {
                icon: faEdit,
                style: {background: Color.BETA_COLOR},
                onClick: () => startEditing(src),
              },
              {
                icon: faDownload,
                style: {background: Color.GAMMA_COLOR},
                onClick: () => downloadImage(src),
              },
            ]}
            image={src}
            imageRef={srcRef}
            size={100}
          />
        </div>
      )}
      <a ref={downloadRef} href={""} download={"download.png"}/>
      <h4>Images Library</h4>
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
                icon: faImages,
                style: {background: Color.ALPHA_COLOR},
                onClick: () => addImage(upSrc)(),
              },
              {
                icon: faEdit,
                style: {background: Color.BETA_COLOR},
                onClick: (imgElement: RefHTMLImageElement) =>
                  startEditing(imgElement),
              },
              {
                icon: faTrash,
                style: {background: Color.TEXT_ERROR_COLOR},
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
      <TextButton
        ElementToUse={(props: ElementToUseProps) => <label {...props} />}
        content={"Image Upload"}
        icons={[faUpload]}
      >
        <input
          className={"image-upload-hidden-input"}
          type={"file"}
          accept={"image/*"}
          onChange={handleImageUpload}
          multiple
          ref={uploadRef}
        />
      </TextButton>
      <TextButton
        content={"Add all to frames"}
        disabled={uploadedImages.length === 0}
        icons={[faImage, faArrowRight, faImages]}
        onClick={() => addAllUploadImagesToFrames()}
      />
    </BorderContainer>
  );
}

export default styled(GifMakerSourceContainer)`
  padding-top: 5px;

  .image-upload-hidden-input {
    display: none;
  }

  .source-image {
    display: block;
    margin: 0 auto 20px auto;
  }

  .source-images-inner-container {
  }
`;
