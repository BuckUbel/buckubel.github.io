import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import ColumnsContainer from "../grid/ColumnsContainer";
import SitePreview from "./SitePreview/SitePreview";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {BlogEntryInterface} from "../data/blogs/blogs";

interface BlogEntryListProps extends CompProps {
  style?: CSSProperties;
  content: BlogEntryInterface[];
}

function BlogEntryList(props: BlogEntryListProps) {
  return (
    <div className="blog-entry-list" style={props.style}>
      <ColumnsContainer>
        {props.content.map((v, i) =>
          <SitePreview
            key={i}
            content={{
              icon: faBook,
              title: v.title,
              description: v.description,
              buttonText: "Read more",
              link: "/blog/" + v.id,
            }}
            descriptionStyle={{textAlign: "left"}}
          />
        )}
      </ColumnsContainer>
      {props.children}
    </div>
  );
}

export default BlogEntryList;
