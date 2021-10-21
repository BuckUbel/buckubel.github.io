import LocalStoreProvider from "../../../../hooks/useLocalStorage/LocalStoreProvider";
import GifMaker from "./GifMaker";
import { useState } from "react";

interface GifMakerContainerProps {}

function GifMakerContainer(props: GifMakerContainerProps) {
  const [onlyVisual, setOnlyVisual] = useState(false);
  return (
    <LocalStoreProvider prefix={"GIF-MAKER"}>
      <button onClick={() => setOnlyVisual((prev) => !prev)}>
        Only visual
      </button>
      <GifMaker onlyVisual={onlyVisual} />
    </LocalStoreProvider>
  );
}

export default GifMakerContainer;
