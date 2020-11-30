import * as React from "react";
import Page from "../Page";
import {LangDE} from "../config/langDE";

function ContactPage() {
  return (
    <Page title={LangDE.contactTitle}>
      <p>- Bild </p>
      <p>- Allgemeine </p>
      <p>- E-Mail Adresse </p>
      <p>- Adresse </p>
      <p>- Telefonnummer </p>
      <p>- (Telefax ?) </p>
      <p>- Erreichbarkeit </p>
      <p>- Social Media Links </p>
      <p>- Facebook </p>
      <p>- Twitter </p>
      <p>- Xing </p>
      <p>- ... </p>
    </Page>
  );
}

export default ContactPage;
