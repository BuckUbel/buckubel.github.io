import React from 'react';
import styled from 'styled-components';
import {useLocalStorage} from "../../../../hooks/useLocalStorage/useLocalStorage";
import {MovieEntityType} from "./MovieEntityType";
import RoundButton from "../../../buttons/RoundButton";

interface MediaMasterProps {
  classname?: string;
}

function MediaMaster(props: MediaMasterProps) {
  const {add, store} = useLocalStorage<MovieEntityType>('movies', {autoSync: true});
  return (
    <>
      <RoundButton link={""} onClick={() => add({
        id: Number((Math.random() * 100).toFixed(0)),
        name: "Horror Movie"
      })} text={"Here"}/>
      {JSON.stringify(store)}
    </>
  );
}

export default styled(MediaMaster)``;
