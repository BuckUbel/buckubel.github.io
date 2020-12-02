import React from "react";

export function crlfToP(stringValue: string) {
  return stringValue.split("\n").map((v, i) => <p key={i}>{v}</p>);
}
