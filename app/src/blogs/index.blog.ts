import blog0md from "./BlogEntry0.md";
import blog1md from "./BlogEntry1.md";

const BLOGS: { [key: number]: string; } = {
  0: blog0md,
  1: blog1md
}

export enum BLOG_COMMANDS {
  BLOG_TAGS = "BLOG_TAGS: ",
  BLOG_CREATED_AT = "BLOG_CREATED_AT: ",
  BLOG_PREVIEW_TEXT = "BLOG_PREVIEW_TEXT: ",
  BLOG_HEADLINE = "#",
}

export default BLOGS;
