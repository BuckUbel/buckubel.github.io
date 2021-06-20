import {useState} from "react";
import {StateType} from "./types";
import {useRefEffect} from "./useRefHook";

export const useConnectState = <T>(defaultValue: T): StateType<T> => {
  const stateArray = useState(defaultValue);
  const [state, setState] = stateArray;

  useRefEffect(() => {
    setState(defaultValue);
  }, [defaultValue])

  return [state, setState]
}
