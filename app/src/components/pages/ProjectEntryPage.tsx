import * as React from 'react';
import Page from '../Page';
import { useParams } from 'react-router-ts';
import { getProject } from '../data/projects/projects';
import { getRouteHref } from '../config/routes';


function ProjectEntryPage() {
  const params = useParams<{ url: string }>('/project/:url');
  const project = getProject(params.url);

  if (project === undefined) {
    console.error('This id is not available: ', params.url);
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
