import NameValidator from './nameValidator/NameValidator';
import * as React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import AdventOfCode2020 from './adventOfCode2020/AdventOfCode2020';
import projectDefaultImage from '../../../images/banner1024.png';
import bitPaletteImage from '../../../images/projects/bitpalette2.png';
import gifmakerImage from '../../../images/projects/gifmaker.gif';
import nameValidatorImage from '../../../images/projects/nameValidator.png';
import MediaMasterContainer from './MediaMaster/MediaMasterContainer';
import GifMakerContainer from './gifMaker/GifMakerContainer';
import BitPalette from './bitPalette/BitPalette';
import { removeSpaces } from '../../helper/strings';
import { EntryInterface } from '../../helper/getEntryInfo';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';

export interface ProjectEntryInterface extends EntryInterface {
  component: JSX.Element;
  favNumber: number;
  icon?: IconDefinition;
}

interface ProjectEntryOptions {
  favNumber?: number;
  icon?: IconDefinition;
  image?: string;
  description?: string;

}

type ProjectEntryConstructorValues = [
  component: JSX.Element, title: string, options?: Partial<ProjectEntryOptions>
];

export class ProjectEntry implements ProjectEntryInterface {
  id?: number = -1;
  title: string;
  url: string;
  component: JSX.Element;
  favNumber: number;
  description?: string;
  icon?: IconDefinition;
  image?: string;

  constructor(...args: ProjectEntryConstructorValues) {
    const [component, title, options] = args;
    this.component = component;
    this.title = title;
    this.url = removeSpaces(title).toLowerCase();
    this.favNumber = options?.favNumber ?? -1;
    this.description = options?.description ?? '';
    this.image = options?.image ?? projectDefaultImage;
    this.icon = options?.icon ?? undefined;
  }

  setId(id: number) {
    this.id = id;
  }
}

export type ProjectEntryListInterface = {
  [key: string]: ProjectEntryInterface;
};

export class ProjectEntryList implements ProjectEntryListInterface {
  [key: string]: ProjectEntryInterface;

  constructor(projectValues: Array<ProjectEntryConstructorValues>) {
    projectValues.forEach((p, i) => {
      const newProject = new ProjectEntry(...p);
      newProject.setId(i);
      this[newProject.url] = newProject;
    });
  }
}

export const PROJECTS: ProjectEntryListInterface = new ProjectEntryList([
  [<BitPalette />, 'BitPalette', {
    description: 'A little tool to use palettes on pixel art and minimize it.',
    favNumber: 4,
    image:bitPaletteImage
  }],
  [<GifMakerContainer />, 'Simple GifMaker', {
    description: 'A little tool to create gif\'s from images.',
    favNumber: 3,
    image: gifmakerImage,
  }],
  [<NameValidator />, 'Name Validator', {
    description: 'The coolest validator for all names of the world.',
    favNumber: 0,
    image: nameValidatorImage,
  }],
  [<AdventOfCode2020 />, 'Advent of Code 2020', {
    description: 'An coding christmas calendar. Unfortunately, I canceled the project at an early stage.',
    favNumber: 1
}],
  [<MediaMasterContainer />, 'Media Master', {
    description: 'A manager for all your media things: video games, movies, series - all such things.',
    favNumber: 2,
    icon: faGamepad
  }]
]);
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
  const projectsValue = Object.values(PROJECTS);
  let returnProject = projectsValue[0];
  projectsValue.forEach((v) => {
    if (highestFavValue < v.favNumber) {
      highestFavValue = v.favNumber;
      returnProject = v;
    }
  });
  return returnProject;
}

export function getProject(url: string) {
  return PROJECTS[url] !== undefined ? PROJECTS[url] : undefined;
}
