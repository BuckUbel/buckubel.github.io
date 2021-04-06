import {faAddressBook, faFeatherAlt, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import {LangEN} from "./langEN";
import {getRouteHref} from "./routes";
import {SitePreviewInterface} from "../helper/types";
import {getLastBlogId} from "../data/blogs/blogs";
import favProjectImage from "../../images/banner1024.png";
import {getFavProjectId} from "../data/projects/projects";

interface SitePreviewContent {
  default: SitePreviewInterface;
  favProject: SitePreviewInterface;
  lastBlog: SitePreviewInterface;
}

export const getSitePreviewContent = (): SitePreviewContent => ({
  default: {
    icon: faAddressBook,
    title: LangEN.defaultTitle,
    description: LangEN.defaultShortDescription,
    link: "/",
    buttonText: "Hier",
  },
  favProject: {
    icon: faProjectDiagram,
    title: "Project: " + LangEN.favProjectTitle,
    description: LangEN.favProjectShortDescription,
    link: getRouteHref("projectEntry") + getFavProjectId(),
    image: favProjectImage,
  },
  lastBlog: {
    icon: faFeatherAlt,
    title: "Blog: " + LangEN.lastBlogTitle,
    description: LangEN.lastBlogShortDescription,
    link: getRouteHref("blogEntry") + getLastBlogId(),
    buttonText: "Read more",
  },
})
