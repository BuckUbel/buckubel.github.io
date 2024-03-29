import React from 'react';
import styled from 'styled-components';
import {useLocalStorage} from "../../../../../hooks/useLocalStorage/useLocalStorage";
import {MovieEntityType} from "../mediaTypes/MovieEntityType";
import RoundButton from "../../../../buttons/RoundButton";

interface MovieMasterProps {
  classname?: string;
}

function MovieMaster(props: MovieMasterProps) {
  const {add, store} = useLocalStorage<MovieEntityType>('movies', {autoSync: true});
  const a = MovieEntityType.create<MovieEntityType>({
    name: "Horror Movie"
  })
  return (
    <>
      <RoundButton link={""} onClick={() => add(a)} text={"Here"}/>
      {store.map(v => <p key={v.id}>{JSON.stringify(v)}</p>)}
    </>
  );
}

export default styled(MovieMaster)``;
