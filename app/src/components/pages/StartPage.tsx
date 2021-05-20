import * as React from "react";
import Page from "../Page";
import {LangEN} from "../config/langEN";
import PageDescription from "../content/PageDescription";
import ColumnsContainer from "../grid/ColumnsContainer";
import {getSitePreviewContent} from "../config/sitePreviewConfig";
import SitePreview from "../content/SitePreview";
import {useBlogs} from "../data/blogs/useBlogs";

function StartPage() {
  const {lastBlogEntry} = useBlogs();
  return (
    <Page
      title={LangEN.startTitle}
      description={LangEN.startShortDescription}
    >
      <PageDescription content={LangEN.startDescription} style={{textAlign: "center"}}/>
      <ColumnsContainer>
        <SitePreview content={getSitePreviewContent().lastBlog(lastBlogEntry)}/>
        <SitePreview content={getSitePreviewContent().favProject()}/>
      </ColumnsContainer>
    </Page>
  );
}

export default StartPage;
