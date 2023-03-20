import { RouteParams, useParams } from 'react-router-ts';

export function useDefaultParams<T extends RouteParams>(path: string, defaultValues: T) {
  const returnValue = useParams<T>(path);
  const newReturnValue: RouteParams = Object.assign({}, returnValue);
  Object.keys(returnValue).forEach((key) => {
    if (newReturnValue[key] === null || newReturnValue[key] === undefined) {
      newReturnValue[key] = defaultValues[key];
    }
  });
  return newReturnValue as T;
}
