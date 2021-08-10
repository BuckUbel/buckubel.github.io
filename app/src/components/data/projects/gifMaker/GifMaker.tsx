import React, { useRef, useState } from "react";
import GIF from "gif.js.optimized/dist/gif";
import image from "../../../../images/logo.png";

interface GifMakerProps {}

function GifMaker(props: GifMakerProps) {
  const [myGeneratedGif, setMyGeneratedGif] = useState<string | undefined>(
    undefined
  );
  const ref = useRef(null);
  const makeGif = () => {
    let gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: "/lib/gif.worker.js",
      debug: true,
      // width: "1000px",
      // height: "100px",
      // transparent: "#000000",
    });

    // add an image element
    gif.addFrame(ref.current);
    // renderFrame(ref);
    // or a canvas element

    const canvas = document.createElement("canvas");
    // canvas.width = 400; //specify width of your canvas
    // canvas.height = 400; //specify height of your canvas

    // gif.addFrame(canvas);

    // const img = document.createElement("img");
    // img.src = "image.png"; //specify url
    // gif.addFrame(img);

    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      ctx.rotate((45 * Math.PI) / 180); // rotate by 90 degrees
      // ctx.drawImage(img, 100, 100); //draw it
      ctx.fill();
    }
    document.body.appendChild(canvas);

    gif.addFrame(ctx, { delay: 200 });

    // or copy the pixels from a canvas context
    // gif.addFrame(ctx, { copy: true });

    gif.on("finished", function (blob: string) {
      // window.open(URL.createObjectURL(blob));
      setMyGeneratedGif(URL.createObjectURL(blob));
      console.log(myGeneratedGif);
    });
    gif.render();
  };
  console.log("Render", myGeneratedGif);

  //TODO: Image upload
  //TODO: Gif options setter with typescript ?

  return (
    <>
      <button onClick={makeGif}>Make Gif</button>
      <img src={image} ref={ref} style={{ width: "800px" }} />
      {!!myGeneratedGif && (
        <img
          src={myGeneratedGif}
          style={{ width: "100px", height: "100px", border: "white" }}
        />
      )}
    </>
  );
}

export default GifMaker;
