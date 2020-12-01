import StartPage from "../pages/StartPage";
import ContactPage from "../pages/ContactPage";
import DefaultPage from "../pages/DefaultPage";
import {LangDE} from "./langDE";
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
  start: {href: "/", title: LangDE.startTitle, component: StartPage},
  projects: {href: "/project", title: LangDE.projectTitle, component: ProjectPage},
  projectEntry: {
    href: "/project/(.*)",
    hrefWithoutParam: "/project/",
    title: LangDE.projectTitle,
    component: ProjectEntryPage
  },
  blog: {href: "/blog", title: LangDE.blogTitle, component: BlogPage},
  blogEntry: {href: "/blog/(.*)", title: LangDE.blogTitle, component: BlogEntryPage},
  kontakt: {href: "/kontakt", title: LangDE.contactTitle, component: ContactPage},
  default: {href: "/(.*)", title: LangDE.defaultTitle, component: DefaultPage},
}

export function getRouteHref(key: AppRouteNames) {
  return routes[key] ? routes[key].hrefWithoutParam ?? routes[key].href : ""
}