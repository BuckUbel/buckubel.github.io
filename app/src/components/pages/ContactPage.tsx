import * as React from "react";
import Page from "../Page";
import {LangEN} from "../config/langEN";

function ContactPage() {
  return (
    <Page title={LangEN.contactTitle}>
      <p>Twitter: <a href={"https://twitter.com/BuckUbel"} target={"_blank"} rel={"noopener noreferrer"}>BuckUbel</a></p>
      <p>GitHub: <a href={"https://github.com/BuckUbel"} target={"_blank"}  rel={"noopener noreferrer"}>BuckUbel</a></p>
      <p>YouTube: <a href={"https://www.youtube.com/channel/UCHUp6q3TlhPjRJbza2TkiCg"} target={"_blank"}  rel={"noopener noreferrer"}>BuckUbel</a></p>
    </Page>
  );
}

export default ContactPage;
