import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SitePreview from "../../../content/SitePreview";
import ColumnsContainer from "../../../grid/ColumnsContainer";
import {faGamepad, faTv} from "@fortawesome/free-solid-svg-icons";
import MovieMaster from "./MovieMaster";
import GameMaster from "./GameMaster";
import {usePage} from "../../../../hooks/usePage/usePage";

interface MediaMasterProps {
  classname?: string;
}

function MediaMaster(props: MediaMasterProps) {
  const [storeName, setStoreName] = useState<"movies" | "games" | undefined>(undefined)
  const {changeReturnClick, changeTitle} = usePage();

  useEffect(() => {
    if (storeName !== undefined) {
      changeReturnClick(() => setStoreName(undefined));
    } else {
      changeReturnClick(undefined)
    }
    switch (storeName) {
      case "games":
        changeTitle("GameMaster")
        break;
      case "movies":
        changeTitle("MovieMaster")
        break;
      default:
        changeTitle("MediaMaster")
        break;
    }
  }, [storeName]);

  return (
    <>
      {storeName === undefined &&
      <ColumnsContainer>
          <SitePreview content={{
            title: "GameMaster",
            link: "",
            onClick: () => setStoreName("games"),
            description: "Krieg die volle Kontrolle über deine Spiel-Sammlung!",
            icon: faGamepad,
          }}/>
          <SitePreview content={{
            title: "MovieMaster",
            link: "",
            onClick: () => setStoreName("movies"),
            description: "Manage deine große Video-Sammlung!",
            icon: faTv,
          }}/>

      </ColumnsContainer>}
      {storeName === "movies" && <MovieMaster/>}
      {storeName === "games" && <GameMaster/>}
    </>
  );
}

export default styled(MediaMaster)``;
