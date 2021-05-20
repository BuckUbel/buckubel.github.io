import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

//TODO extend blog entries with createDate and tags
export interface BlogEntryInterface {
  id: number,
  title: string,
  previewText?: string;
  description?: string,
  icon?: IconDefinition;
  image?: string;
}

export type BlogEntryListInterface = {
  [key: number]: BlogEntryInterface
}


