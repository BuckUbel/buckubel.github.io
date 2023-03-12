import * as React from "react";
import Page from "../Page";
import {LangEN} from "../config/langEN";
import ColumnsContainer from "../grid/ColumnsContainer";
import {PROJECTS} from "../data/projects/projects";
import SitePreview from "../content/SitePreview/SitePreview";
import {getRouteHref} from "../config/routes";

const projects = Object.values(PROJECTS);

function ProjectPage() {
  return (
    <Page
      title={LangEN.projectTitle}
    >
      <ColumnsContainer>
        {projects.map((p, i) =>
          <SitePreview key={i}
                       id={i}
                       colCount={3}
                       content={{...p, link: getRouteHref("projectEntry") + p.url}}
          />
        )}
      </ColumnsContainer>
    </Page>
  );
}

export default ProjectPage;
