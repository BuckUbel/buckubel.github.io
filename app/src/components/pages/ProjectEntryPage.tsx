import * as React from "react";
import Page from "../Page";
import {useRouter} from "react-router-ts";
import {getProjectComponent, getProjectHeadline} from "../data/projects/projects";
import RoundButton from "../buttons/RoundButton";
import {getRouteHref} from "../config/routes";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function ProjectEntryPage() {
  const router = useRouter();
  const id = router.path.slice(router.path.lastIndexOf("/") + 1);
  const headline = getProjectHeadline(id);
  const myComponent = getProjectComponent(id);

  return (
    <Page
      title={headline}
      topSubChildren={<RoundButton link={getRouteHref("projects")}
                                   text={<FontAwesomeIcon icon={faChevronLeft}/>} float={"left"} width={"100%"}/>}
    >
      {myComponent}
    </Page>
  );
}

export default ProjectEntryPage;
