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
  const routeParts = router.path.split("/");
  const id = routeParts[routeParts.length-2] ?? "";
  const headline = getProjectHeadline(Number(id));
  const myComponent = getProjectComponent(Number(id));

  return (
    <Page
      title={headline}
      topSubChildren={<RoundButton link={getRouteHref("projects")}
                                   icon={<FontAwesomeIcon icon={faChevronLeft}/>} float={"left"} width={"100%"}/>}
    >
      {myComponent}
    </Page>
  );
}

export default ProjectEntryPage;
