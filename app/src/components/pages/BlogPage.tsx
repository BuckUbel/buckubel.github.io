import * as React from "react";
import Page from "../Page";
import {LangEN} from "../config/langEN";
import PageDescription from "../content/PageDescription";
import BlogEntryList from "../content/BlogEntryList";
import {BLOG_IDS, BlogEntryInterface, BLOGS} from "../data/blogs/blogs";

function getLast3BlogEntry() {
  if (BLOG_IDS.length > 2) {
    const blogThirdId = Number(BLOG_IDS[BLOG_IDS.length - 3])
    const blogSecondId = Number(BLOG_IDS[BLOG_IDS.length - 2])
    const blogFirstId = Number(BLOG_IDS[BLOG_IDS.length - 1])
    return [BLOGS[blogFirstId], BLOGS[blogSecondId], BLOGS[blogThirdId]];
  } else if (BLOG_IDS.length > 1) {
    const blogSecondId = Number(BLOG_IDS[BLOG_IDS.length - 2])
    const blogFirstId = Number(BLOG_IDS[BLOG_IDS.length - 1])
    return [BLOGS[blogFirstId], BLOGS[blogSecondId]];
  } else if (BLOG_IDS.length > 0) {
    const blogFirstId = Number(BLOG_IDS[BLOG_IDS.length - 1])
    return [BLOGS[blogFirstId]];
  }
  return [];
}

const last3BlogEntry: BlogEntryInterface[] = getLast3BlogEntry();

function BlogPage() {
  return (
    <Page
      title={LangEN.blogTitle}
      description={LangEN.blogShortDescription}
    >
      <PageDescription content={LangEN.blogDescription} style={{textAlign:"center"}}/>
      <BlogEntryList content={last3BlogEntry}/>
    </Page>
  );
}

export default BlogPage;
