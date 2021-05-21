import * as React from "react";
import Page from "../Page";
import {LangEN} from "../config/langEN";
import PageDescription from "../content/PageDescription";
import BlogEntryList from "../content/BlogEntryList";
import {useBlogs} from "../data/blogs/useBlogs";

function BlogPage() {
  const {last3BlogEntries} = useBlogs()
  return (
    <Page
      title={LangEN.blogTitle}
      description={LangEN.blogShortDescription}
    >
      <PageDescription content={LangEN.blogDescription} style={{textAlign: "center"}}/>
      <BlogEntryList content={last3BlogEntries}/>
    </Page>
  );
}

export default BlogPage;
