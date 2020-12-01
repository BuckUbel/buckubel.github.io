import NameValidator from "../content/projects/nameValidator/NameValidator";
import * as React from "react";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import AdventOfCode2020 from "../content/projects/adventOfCode2020/AdventOfCode2020";

export interface ProjectEntryInterface {
  title: string,
  component: JSX.Element;
  description?: string,
  icon?: IconDefinition;
}

export type ProjectEntryListInterface = {
  [key: string]: ProjectEntryInterface
}
export const PROJECTS: ProjectEntryListInterface = {
  0: {
    title: "Name Validator",
    component: <NameValidator/>
  },
  1: {
    title: "Advent of Code 2020",
    component: <AdventOfCode2020/>
  },
}
export const PROJECT_IDS = Object.keys(PROJECTS);

export function getProjectHeadline(id: string) {
  return PROJECTS[id] !== undefined ? PROJECTS[id].title : "";
}

export function getProjectComponent(id: string) {
  return PROJECTS[id] !== undefined ? PROJECTS[id].component : "";
}