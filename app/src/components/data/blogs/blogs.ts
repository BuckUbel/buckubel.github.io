import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export interface BlogEntryInterface {
  id: number,
  title: string,
  previewText?: string;
  description?: string,
  icon?: IconDefinition;
  image?: string;
  createdDate?:Date;
  tags?: string[]
}

export type BlogEntryListInterface = {
  [key: number]: BlogEntryInterface
}


