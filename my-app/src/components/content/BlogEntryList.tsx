import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import {BlogEntry} from "../config/blog";
import ColumnsContainer from "../grid/ColumnsContainer";
import SitePreview from "./SitePreview";
import {faBook} from "@fortawesome/free-solid-svg-icons";

interface BlogEntryListProps extends CompProps {
  style?: CSSProperties;
  content: BlogEntry[];
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
              headline: v.title,
              description: v.previewText,
              buttonText: "Willst du mehr erfahren ?",
              buttonLink: "/blog/" + v.id,
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
