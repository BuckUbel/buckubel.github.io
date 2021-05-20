import {PROJECTS} from "../data/projects/projects";
import {getEntryInfo} from "../helper/getEntryInfo";

export const LangEN = {
  startTitle: "Buck Ubel",
  startShortDescription: "",
  startDescription: "I'm glad you found your way here.",

  projectTitle: "Projects",
  blogTitle: "Blog",
  blogShortDescription: "",
  blogDescription: "I wrote a little blog - maybe you want read it.",
  contactTitle: "Contact",
  impressumTitle: "Impressum",
  dataSecurityTitle: "Datenschutzerklärung",

  defaultTitle: "Hey, sorry but ...",
  defaultShortDescription: "This page does not exist. How did you get here?",
  defaultDescription: "This page does not exist. How did you get here?",

  favProjectTitle: getEntryInfo(PROJECTS, "title", 1),
  favProjectShortDescription: getEntryInfo(PROJECTS, "description", 1),
}
