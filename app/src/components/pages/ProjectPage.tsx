import * as React from "react";
import Page from "../Page";
import {LangDE} from "../config/langDE";
import ColumnsContainer from "../grid/ColumnsContainer";
import ProjectPreview from "../content/ProjectPreview";
import {PROJECTS} from "../data/projects/projects";

const projects = Object.values(PROJECTS);

function ProjectPage() {
  return (
    <Page
      title={LangDE.projectTitle}
    >
      <ColumnsContainer>
        {projects.map((v, i) =>
          <ProjectPreview key={i} content={v} id={i} colCount={3}/>
        )}
      </ColumnsContainer>
    </Page>
  );
}

export default ProjectPage;
