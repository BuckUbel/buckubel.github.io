import { useState } from "react";
import { StateType } from "./types";
import { useRefEffect } from "./useRefHook";

export const useNonEmptyConnectState = <T>(
  defaultValue: Array<T>
): StateType<Array<T>> => {
  const stateArray = useState(defaultValue);
  const [state, setState] = stateArray;
  const [isApplied, setIsApplied] = useState(false);

  useRefEffect(() => {
    if (!isApplied && state.length === 0 && defaultValue.length > 0) {
      setState(defaultValue);
      setIsApplied(true);
    }
  }, [defaultValue]);

  return [state, setState];
};
