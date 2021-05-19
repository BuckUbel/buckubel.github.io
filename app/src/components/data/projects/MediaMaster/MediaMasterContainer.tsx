import React from 'react';
import LocalStoreProvider from "../../../../hooks/useLocalStorage/LocalStoreProvider";
import MediaMaster from "./MediaMaster";

interface MediaMasterContainerProps {
}

function MediaMasterContainer(props: MediaMasterContainerProps) {
  return (
    <LocalStoreProvider>
      <MediaMaster/>
    </LocalStoreProvider>
  );
}

export default MediaMasterContainer;
