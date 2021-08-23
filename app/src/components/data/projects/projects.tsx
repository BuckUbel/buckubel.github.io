import NameValidator from "./nameValidator/NameValidator";
import * as React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import AdventOfCode2020 from "./adventOfCode2020/AdventOfCode2020";
import project1Image from "../../../images/banner1024.png";
import project2Image from "../../../images/banner1024.png";
import project3Image from "../../../images/banner1024.png";
import project4Image from "../../../images/banner1024.png";
import MediaMasterContainer from "./MediaMaster/MediaMasterContainer";
import GifMakerContainer from "./gifMaker/GifMakerContainer";

export interface ProjectEntryInterface {
  id?: number;
  title: string;
  component: JSX.Element;
  favNumber: number;
  description?: string;
  icon?: IconDefinition;
  image?: string;
}

export type ProjectEntryListInterface = {
  [key: number]: ProjectEntryInterface;
};
export const PROJECTS: ProjectEntryListInterface = {
  0: {
    id: 0,
    title: "Name Validator",
    image: project1Image,
    component: <NameValidator />,
    description: "The coolest validator for all names of the world.",
    favNumber: 0,
  },
  1: {
    id: 1,
    title: "Advent of Code 2020",
    image: project2Image,
    component: <AdventOfCode2020 />,
    description:
      "An coding christmas calendar. Unfortunately, I canceled the project at an early stage.",
    favNumber: 1,
  },
  2: {
    id: 2,
    title: "Media Master",
    image: project3Image,
    component: <MediaMasterContainer />,
    description:
      "A manager for all your media things: video games, movies, series - all such things.",
    favNumber: 2,
  },
  3: {
    id: 3,
    title: "Simple GifMaker",
    image: project4Image,
    component: <GifMakerContainer />,
    description: "A little tool to create gif's from images.",
    favNumber: 3,
  },
};
export const PROJECT_IDS = Object.keys(PROJECTS);

export function getFavProjectId() {
  let highestFavValue = 0;
  let returnProjectId = Number(PROJECT_IDS[0]);
  Object.values(PROJECTS).forEach((v, i) => {
    if (highestFavValue < v.favNumber) {
      highestFavValue = v.favNumber;
      returnProjectId = Number(PROJECT_IDS[i]);
    }
  });
  return returnProjectId;
}

export function getFavProject() {
  let highestFavValue = 0;
  let returnProject = PROJECTS[0];
  Object.values(PROJECTS).forEach((v, i) => {
    if (highestFavValue < v.favNumber) {
      highestFavValue = v.favNumber;
      returnProject = v;
    }
  });
  return returnProject;
}

export function getProjectComponent(id: number) {
  return PROJECTS[id] !== undefined ? PROJECTS[id].component : "";
}
