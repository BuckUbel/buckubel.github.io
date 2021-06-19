import * as React from "react";
import Page from "../Page";
import PageDescription from "../content/PageDescription";
import {useParams} from "react-router-ts";
import RoundButton from "../buttons/RoundButton";
import {routes} from "../config/routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {useBlogs} from "../data/blogs/useBlogs";

function BlogEntryPage() {
  const params = useParams<{ id: string }>("/blog/:id");
  const maybeBlogId = parseInt(params.id);
  const blogId: number = !isNaN(maybeBlogId) ? maybeBlogId : -1;
  const {blogEntries} = useBlogs(blogId)
  const blogEntry = blogId > -1 ? blogEntries[blogId] : undefined;
  if (blogEntry === undefined) {
    return null;
  }
  return (
    <Page
      title={blogEntry.title}
      description={blogEntry.previewText}
      topSubChildren={<div style={{textAlign: "left"}}>
        <RoundButton link={routes.blog.href} icon={<FontAwesomeIcon icon={faChevronLeft}/>}
                     text={" blog list"}/>
      </div>}
    >
      {blogEntry.tags ? <p>{blogEntry.tags.join(", ")}</p> : ""}
      {blogEntry.createdDate ? <p>{blogEntry.createdDate?.toLocaleDateString()}</p> : ""}
      <PageDescription content={blogEntry.description}/>
    </Page>
  );
}

export default BlogEntryPage;
