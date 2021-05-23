import { DependencyList, useEffect, useMemo, useRef } from 'react';
const useRefHook = <T>(
  hook: (fn: () => any, dependencies: DependencyList) => any,
  fn: () => any,
  dependencies: DependencyList
): T => {
  const ref = useRef<any>(null);
  if (!ref.current || dependencies !== ref.current.dpd) {
    ref.current = {
      fn,
      dependencies,
    };
  }
  return hook(() => {
    return ref.current.fn();
  }, [...ref.current.dependencies, ref]);
};
// use this hook instead of useEffect for preventing compile hints
// the "problem" is, that you will use variables/functions/... which are not in the dependency array
// this is not expected by the architectural approach
// the default solution is to take the "forbidden" content into the dependencies via a reference
export const useRefEffect = (fn: () => any, dependencies: DependencyList) =>
  useRefHook<void>(useEffect, fn, dependencies);
export const useRefMemo = <T>(fn: () => T, dependencies: DependencyList) =>
  useRefHook<T>(useMemo, fn, dependencies);
// if you have more hooks with the need for a dependency array write it here
