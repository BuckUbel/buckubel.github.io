import * as React from "react";
import Page from "../Page";
import PageDescription from "../content/PageDescription";
import {BlogEntries} from "../config/blog";
import {useParams} from "react-router-ts";
import RoundButton from "../buttons/RoundButton";
import {routes} from "../config/routes";

function BlogEntryPage() {
  const params = useParams<{ id: string }>("/blog/:id");
  const maybeBlogId = parseInt(params.id);
  const blogId: number = !isNaN(maybeBlogId) ? maybeBlogId : -1;
  const blogEntry = blogId > -1 ? BlogEntries[blogId] : undefined;
  if (blogEntry === undefined) {
    console.error("This id is not available: ", maybeBlogId)
    return null;
  }
  return (
    <Page
      title={blogEntry.title}
      description={blogEntry.previewText}
      topSubChildren={<div style={{textAlign: "left"}}>
        <RoundButton link={routes.blog.href} text={"Zurück zur Liste"}/>
      </div>}
    >
      <PageDescription content={blogEntry.completeText}/>
    </Page>
  );
}

export default BlogEntryPage;
