import * as React from "react";
import Page from "../Page";
import {LangDE} from "../config/langDE";
import PageDescription from "../content/PageDescription";
import SitePreview from "../content/SitePreview";
import {getSitePreviewContent} from "../config/sitePreviewConfig";
import {routes} from "../config/routes";
import ColumnsContainer from "../grid/ColumnsContainer";
import NameValidator from "../../nameValidator/NameValidator";

function StartPage() {
  return (
    <Page
      title={LangDE.startTitle}
      description={LangDE.startShortDescription}
    >
      <PageDescription content={LangDE.startDescription}/>

      <h2>Name Validator</h2>
      <NameValidator/>

      <ColumnsContainer>
        <SitePreview content={getSitePreviewContent(routes).default}/>
        <SitePreview content={getSitePreviewContent(routes).default}/>
        <SitePreview content={getSitePreviewContent(routes).default}/>
      </ColumnsContainer>
    </Page>
  );
}

export default StartPage;
