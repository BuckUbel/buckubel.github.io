import { pathToRegexp, Key } from "path-to-regexp";
import { RouteParams } from "react-router-ts";

export function routeMatcherFactory(pattern: string) {
  const keys: Key[] = [];
  const regex = pathToRegexp(pattern, keys);

  return (path: string) => {
    const out = regex.exec(path);

    if (!out) return null;

    return keys.reduce((params, key, i) => {
      params[key.name] = out[i + 1];
      return params;
    }, {} as RouteParams);
  }
}
