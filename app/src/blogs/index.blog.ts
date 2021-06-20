const BLOGS: { [key: number]: string } = {
  0: "/blogs/BlogEntry0.md",
  1: "/blogs/BlogEntry1.md",
};

export enum BLOG_COMMANDS {
  BLOG_TAGS = "BLOG_TAGS: ",
  BLOG_CREATED_AT = "BLOG_CREATED_AT: ",
  BLOG_PREVIEW_TEXT = "BLOG_PREVIEW_TEXT: ",
  BLOG_HEADLINE = "#",
}

export default BLOGS;
