import StartPage from "../pages/StartPage";
import ContactPage from "../pages/ContactPage";
import DefaultPage from "../pages/DefaultPage";
import {LangEN} from "./langEN";
import {AppRouteInterface} from "../helper/types";
import ProjectEntryPage from "../pages/ProjectEntryPage";
import ProjectPage from "../pages/ProjectPage";
import BlogPage from "../pages/BlogPage";
import BlogEntryPage from "../pages/BlogEntryPage";

export type AppRouteNames = "start" |
  "projects" |
  "projectEntry" |
  "blog" |
  "blogEntry" |
  "kontakt" |
  "default"

export type AppRoutesInterface = {
  [key in AppRouteNames | string]: AppRouteInterface
}

export const routes: AppRoutesInterface = {
  start: {href: "/", title: LangEN.startTitle, component: StartPage},
  projects: {href: "/project", title: LangEN.projectTitle, component: ProjectPage},
  projectEntry: {
    href: "/project/(.*)",
    hrefWithoutParam: "/project/",
    title: LangEN.projectTitle,
    component: ProjectEntryPage
  },
  blog: {href: "/blog", title: LangEN.blogTitle, component: BlogPage},
  blogEntry: {
    href: "/blog/(.*)", hrefWithoutParam: "/blog/",
    title: LangEN.blogTitle, component: BlogEntryPage
  },
  kontakt: {href: "/kontakt", title: LangEN.contactTitle, component: ContactPage},
  default: {href: "/(.*)", title: LangEN.defaultTitle, component: DefaultPage},
}

export function getRouteHref(key: AppRouteNames) {
  return routes[key] ? routes[key].hrefWithoutParam ?? routes[key].href : ""
}
