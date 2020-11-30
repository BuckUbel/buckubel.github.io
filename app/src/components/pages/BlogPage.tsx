import * as React from "react";
import Page from "../Page";
import {LangDE} from "../config/langDE";
import PageDescription from "../content/PageDescription";
import {BlogEntry} from "../config/blog";

function getLast3BlogEntry(entryList: BlogEntry[]) {
  if (entryList.length > 2) {
    return [entryList[entryList.length - 1], entryList[entryList.length - 2], entryList[entryList.length - 3]];
  } else if (entryList.length > 1) {
    return [entryList[entryList.length - 1], entryList[entryList.length - 2]];
  } else if (entryList.length > 0) {
    return [entryList[entryList.length - 1]];
  }
  return [];
}

// const last3BlogEntry: BlogEntry[] = getLast3BlogEntry(BlogEntries);

function BlogPage() {
  return (
    <Page
      title={LangDE.blogTitle}
      description={LangDE.blogShortDescription}
    >
      <PageDescription content={LangDE.blogDescription}/>
      {/*<BlogEntryList content={last3BlogEntry}/>*/}
      {/*<ColumnsContainer>*/}
      {/*  <SitePreview content={getSitePreviewContent(routes).default}/>*/}
      {/*  <SitePreview content={getSitePreviewContent(routes).default}/>*/}
      {/*  <SitePreview content={getSitePreviewContent(routes).default}/>*/}
      {/*</ColumnsContainer>*/}
    </Page>
  );
}

export default BlogPage;
