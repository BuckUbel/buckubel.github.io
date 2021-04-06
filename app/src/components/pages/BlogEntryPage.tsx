import * as React from "react";
import Page from "../Page";
import PageDescription from "../content/PageDescription";
import {useParams} from "react-router-ts";
import RoundButton from "../buttons/RoundButton";
import {routes} from "../config/routes";
import {BLOGS} from "../data/blogs/blogs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

function BlogEntryPage() {
  const params = useParams<{ id: string }>("/blog/:id");
  const maybeBlogId = parseInt(params.id);
  const blogId: number = !isNaN(maybeBlogId) ? maybeBlogId : -1;
  const blogEntry = blogId > -1 ? BLOGS[blogId] : undefined;
  if (blogEntry === undefined) {
    console.error("This id is not available: ", maybeBlogId)
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
      <PageDescription content={blogEntry.description}/>
    </Page>
  );
}

export default BlogEntryPage;
