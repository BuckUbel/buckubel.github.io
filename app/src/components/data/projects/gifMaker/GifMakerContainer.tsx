import LocalStoreProvider from "../../../../hooks/useLocalStorage/LocalStoreProvider";
import GifMaker from "./GifMaker";

interface GifMakerContainerProps {}

function GifMakerContainer(props: GifMakerContainerProps) {
  return (
    <LocalStoreProvider prefix={"GIF-MAKER"}>
      <GifMaker />
    </LocalStoreProvider>
  );
}

export default GifMakerContainer;
