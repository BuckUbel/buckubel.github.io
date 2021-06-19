import {useMemo, useState} from "react";
import BLOGS, {BLOG_COMMANDS} from "../../../blogs/index.blog";
import blogDefaultImage from "../../../images/banner1024.png";
import {BlogEntryInterface, BlogEntryListInterface} from "./blogs";
import {useRefEffect, useRefMemo} from "../../helper/useRefHook";

function getContentFromCommand(content: string, command: string): [string, number, number] {
  const startPos = content.indexOf(command);
  const endPos = content.substring(startPos).indexOf("\n") + startPos;
  const commandContent = content.substring(startPos + command.length, endPos).trim();
  return [commandContent, startPos, endPos]
}

function clusterBlogEntryData(content: string) {
  let title = "";
  let body = "";
  let previewText = "";
  let createdDate = new Date();
  let tags: string[] = [];

  const [tagsContent] = getContentFromCommand(content, BLOG_COMMANDS.BLOG_TAGS);
  tags = tagsContent.split(", ");

  const [createdDateString] = getContentFromCommand(content, BLOG_COMMANDS.BLOG_CREATED_AT);
  const createdDateArray = createdDateString.split(".");
  if (!!createdDateArray[2] && !!createdDateArray[1] && !!createdDateArray[0]) {
    createdDate = new Date(createdDateArray[2] + "-" + createdDateArray[1] + "-" + createdDateArray[0]);
  }

  const [previewTextContent] = getContentFromCommand(content, BLOG_COMMANDS.BLOG_PREVIEW_TEXT);
  previewText = previewTextContent;
  const [titleContent, , lastHeadlineChar] = getContentFromCommand(content, BLOG_COMMANDS.BLOG_HEADLINE);
  title = titleContent;

  body = content.substring(lastHeadlineChar);

  return {
    title, body, previewText, createdDate, tags
  }
}

async function getBlogEntry(url: string) {
  return await fetch(url)
    .then(response => response.text())
    .then(data => data);
}

export const useBlogs = (id?: number) => {

  const [error, setError] = useState<boolean>(false);
  const [blogContent, setBlogContent] = useState<string[]>([]);

  useRefEffect(() => {
      async function fetchBlogEntries() {
        if (id !== undefined && id > -1 && BLOGS[id] !== undefined) {
          setBlogContent([await getBlogEntry(BLOGS[id])]);
          if (error) {
            setError(false)
          }
        }
        if (id !== undefined && id > -1 && BLOGS[id] === undefined) {
          setError(true)
        }
        if (id === undefined) {
          const BLOG_URLS = Object.values(BLOGS);
          const allBlogs: string[] = [];
          for (let i = 0; i < BLOG_URLS.length; i++) {
            allBlogs.push(await getBlogEntry(BLOG_URLS[i]));
          }
          setBlogContent(allBlogs);
          if (error) {
            setError(false)
          }
        }
      }

      fetchBlogEntries().then()
    }, [id]
  );

  const blogEntries = useRefMemo((): BlogEntryListInterface => {
    const blogMap: BlogEntryListInterface = {};
    blogContent.forEach((v, index) => {
      const blogId = id ?? index;
      const blogEntryData = clusterBlogEntryData(v);
      blogMap[blogId] = {
        id: blogId,
        title: blogEntryData.title,
        image: blogDefaultImage,
        previewText: blogEntryData.previewText,
        description: blogEntryData.body,
        createdDate: blogEntryData.createdDate,
        tags: blogEntryData.tags,
      };
    });
    return blogMap;
  }, [blogContent]);

  const getLastBlogEntries = (blogEntries: BlogEntryListInterface, max: number = 3) => {
    const blogIds = Object.keys(blogEntries).reverse();
    const blogEntryValues = Object.values(blogEntries);

    const returnBlogEntries: BlogEntryInterface[] = [];
    blogIds.forEach((v, i) => {
      const id = Number(v);
      if (!isNaN(id) && id >= 0 && i < max) {
        returnBlogEntries.push(blogEntryValues[id]);
      }
    })
    return returnBlogEntries;
  }

  const last3BlogEntries = useMemo(() => getLastBlogEntries(blogEntries, 3), [blogEntries])
  const lastBlogEntry = useMemo(() => getLastBlogEntries(blogEntries, 1), [blogEntries])
  return {blogEntries, last3BlogEntries, lastBlogEntry: lastBlogEntry[0], error}
}
