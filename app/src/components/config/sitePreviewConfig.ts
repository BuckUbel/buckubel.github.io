import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import {LangDE} from "./langDE";
import {AppRoutesInterface} from "./routes";
import {SitePreviewInterface} from "../helper/types";

interface SitePreviewContent {
  default: SitePreviewInterface;
}

export const getSitePreviewContent = (routes: AppRoutesInterface): SitePreviewContent => ({
  default: {
    icon: faAddressBook,
    headline: LangDE.defaultTitle,
    description: LangDE.defaultShortDescription,
    buttonText: "Hier",
    buttonLink: "/",
  },
})