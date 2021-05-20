import {useEffect, useMemo, useState} from "react";
import BLOGS from "../../../blogs/index.blog";
import blog1Image from "../../../images/banner1024.png";
import {BlogEntryListInterface} from "./blogs";

function getBlogEntryTitle(content: string) {
  const firstHeadlineChar = content.indexOf("#")
  const firstNextLine = content.indexOf("\n")
  if (firstNextLine > firstHeadlineChar) {
    return content.substring(firstHeadlineChar, firstNextLine).replace("#", "");
  }
  console.log("No headline found!")
  return "";
}

function getBlogEntryBody(content: string) {
  const firstHeadlineChar = content.indexOf("#")
  const firstNextLine = content.indexOf("\n")
  if (firstNextLine > firstHeadlineChar) {
    return content.substring(firstNextLine);
  }
  return content;
}

async function getBlogEntry(url: string) {
  return await fetch(url)
    .then(response => response.text())
    .then(data => data);
}

export const useBlogs = (id?: number) => {

  const [error, setError] = useState<boolean>(false);
  const [blogContent, setBlogContent] = useState<string[]>([]);

  useEffect(() => {
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
            console.log(BLOG_URLS[i])
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

  const blogEntries = useMemo((): BlogEntryListInterface => {
    const blogMap: BlogEntryListInterface = {};
    blogContent.forEach((v, index) => {
      const blogId = id ?? index;
      blogMap[blogId] = {
        id: blogId,
        title: getBlogEntryTitle(v),
        image: blog1Image,
        description: getBlogEntryBody(v)
      };
    });
    return blogMap;
  }, [blogContent]);

  const getLastBlogEntries = (blogEntries: BlogEntryListInterface, max:number = 3) => {
    if(max > 3){
      console.error("Use only maximum 3 last entries")
    }
    const blogIds = Object.keys(blogEntries);
    const blogEntryValues = Object.values(blogEntries);
    if (blogIds.length > 2 && max === 3) {
      const blogThirdId = Number(blogIds[blogIds.length - 3])
      const blogSecondId = Number(blogIds[blogIds.length - 2])
      const blogFirstId = Number(blogIds[blogIds.length - 1])
      return [blogEntryValues[blogFirstId], blogEntryValues[blogSecondId], blogEntryValues[blogThirdId]];
    }
    if (blogIds.length > 1&& max === 2) {
      const blogSecondId = Number(blogIds[blogIds.length - 2])
      const blogFirstId = Number(blogIds[blogIds.length - 1])
      return [blogEntryValues[blogFirstId], blogEntryValues[blogSecondId]];
    }
    if (blogIds.length > 0&& max === 1) {
      const blogFirstId = Number(blogIds[blogIds.length - 1])
      return [blogEntryValues[blogFirstId]];
    }
    return [];
  }
  const last3BlogEntries = useMemo(() => getLastBlogEntries(blogEntries,3), [blogEntries])
  const lastBlogEntry = useMemo(() => getLastBlogEntries(blogEntries,1)[0], [blogEntries])

  return {blogEntries, last3BlogEntries, lastBlogEntry, error}
}
