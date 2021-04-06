import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import blog1Image from "../../../images/banner1024.png";
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
export const BLOGS: BlogEntryListInterface = {
  0: {
    id: 0,
    title: "So we will start... ",
    image: blog1Image,
    description: "What thoughts we will discuss here?",
  },
}
export const BLOG_IDS = Object.keys(BLOGS);

export function getLastBlogId() {
  // on values under 0, the latest entry will used
  if (!!BLOG_IDS[BLOG_IDS.length - 1]) {
    return Number(BLOG_IDS[BLOG_IDS.length - 1]);
  }
  return -1;
}
