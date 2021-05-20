import {faAddressBook, faFeatherAlt, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import {LangEN} from "./langEN";
import {getRouteHref} from "./routes";
import {SitePreviewInterface} from "../helper/types";
import favProjectImage from "../../images/banner1024.png";
import {getFavProjectId} from "../data/projects/projects";
import {BlogEntryInterface} from "../data/blogs/blogs";

interface SitePreviewContent {
  default: ()=>SitePreviewInterface;
  favProject: ()=>SitePreviewInterface;
  lastBlog: (blog:BlogEntryInterface)=>SitePreviewInterface;
}

export const getSitePreviewContent = (): SitePreviewContent => ({
  default: ()=> ({
    icon: faAddressBook,
    title: LangEN.defaultTitle,
    description: LangEN.defaultShortDescription,
    link: "/",
    buttonText: "Hier",
  }),
  favProject: ()=>({
    icon: faProjectDiagram,
    title: "Project: " + LangEN.favProjectTitle,
    description: LangEN.favProjectShortDescription,
    link: getRouteHref("projectEntry") + getFavProjectId(),
    image: favProjectImage,
  }),
  lastBlog: (blog?:BlogEntryInterface)=>({
    icon: faFeatherAlt,
    title: "Blog: " + blog?.title ,
    description: blog?.previewText ?? "",
    link: getRouteHref("blogEntry") + blog?.id ?? "",
    buttonText: "Read more",
  }),
})
