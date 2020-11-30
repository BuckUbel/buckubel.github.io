import * as React from "react";
import Page from "../Page";
import {LangDE} from "../config/langDE";
import SitePreview from "../content/SitePreview";
import {getSitePreviewContent} from "../config/sitePreviewConfig";
import {routes} from "../config/routes";
import ColumnsContainer from "../grid/ColumnsContainer";

function ProjectEntryPage() {
  return (
    <Page
      title={LangDE.projectTitle}
    >
      <ColumnsContainer>
        <SitePreview content={getSitePreviewContent(routes).default}/>
        <SitePreview content={getSitePreviewContent(routes).default}/>
        <SitePreview content={getSitePreviewContent(routes).default}/>
      </ColumnsContainer>
    </Page>
  );
}

export default ProjectEntryPage;
