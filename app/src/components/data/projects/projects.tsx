import NameValidator from "./nameValidator/NameValidator";
import * as React from "react";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import AdventOfCode2020 from "./adventOfCode2020/AdventOfCode2020";
import project1Image from "../../../images/banner1024.png";
import project2Image from "../../../images/banner1024.png";

export interface ProjectEntryInterface {
  title: string,
  component: JSX.Element;
  description?: string,
  icon?: IconDefinition;
  image?: string;
}

export type ProjectEntryListInterface = {
  [key: number]: ProjectEntryInterface
}
export const PROJECTS: ProjectEntryListInterface = {
  0: {
    title: "Name Validator",
    image: project1Image,
    component: <NameValidator/>,
    description: "The coolest validator for all names of the world."
  },
  1: {
    title: "Advent of Code 2020",
    image: project2Image,
    component: <AdventOfCode2020/>,
    description: "An coding christmas calendar. Unfortunately, I canceled the project at an early stage."
  },
}
export const PROJECT_IDS = Object.keys(PROJECTS);

export function getProjectHeadline(id: number) {
  return PROJECTS[id] !== undefined ? PROJECTS[id].title : "";
}

export function getProjectComponent(id: number) {
  return PROJECTS[id] !== undefined ? PROJECTS[id].component : "";
}
