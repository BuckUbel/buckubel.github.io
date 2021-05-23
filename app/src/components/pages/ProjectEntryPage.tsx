import * as React from "react";
import Page from "../Page";
import {useParams} from "react-router-ts";
import {getProjectComponent, PROJECTS} from "../data/projects/projects";
import {getRouteHref} from "../config/routes";
import {getEntryInfo} from "../helper/getEntryInfo";


function ProjectEntryPage() {
  const params = useParams<{ id: string }>("/project/:id");
  const maybeProjectId = parseInt(params.id);
  const projectId: number = !isNaN(maybeProjectId) ? maybeProjectId : -1;

  const headline = getEntryInfo(PROJECTS, "title", Number(projectId));
  const myComponent = getProjectComponent(Number(projectId));

  if (myComponent === undefined) {
    console.error("This id is not available: ", projectId)
    return null;
  }

  return (
    <Page
      title={headline}
      returnLink={getRouteHref("projects")}
    >
      {myComponent}
    </Page>
  );
}

export default ProjectEntryPage;
