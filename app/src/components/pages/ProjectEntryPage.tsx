import * as React from 'react';
import Page from '../Page';
import { useParams } from 'react-router-ts';
import { getProject } from '../data/projects/projects';
import { getRouteHref } from '../config/routes';


function ProjectEntryPage() {
  const params = useParams<{ project: string }>('/project/:project/(.*)?');
  const project = getProject(params.project);

  if (project === undefined) {
    console.error('This id is not available: ', params.project);
    return null;
  }

  return (
    <Page
      title={project.title}
      returnLink={getRouteHref('projects')}
    >
      {project.component}
    </Page>
  );
}

export default ProjectEntryPage;
