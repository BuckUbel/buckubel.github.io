import {LocalStoreEntityType} from "../../../../../hooks/useLocalStorage/LocalStoreContext";
import {AdditionalDataType} from "./AdditionalDataType";
import {InterfaceChangedPropTypesOnlyRealValues} from "../../../../helper/utilTypes";
import {UsageType} from "./UsageType";
import {MediaRelationType} from "./MediaRelationType";

export type USKType = 0 | 6 | 12 | 16 | 18;

export class MediaEntityType<Formats> extends LocalStoreEntityType {
  name: string = "";
  format: Array<Formats> = [];
  tags: string[] = [];
  releaseDate?: Date;
  additionalData: Array<AdditionalDataType> = []
  usk: USKType = 0;
  notices: string = "";
  score: number = -1;
  reviewNotes: string = "";
  usages: Array<UsageType> = [];
  relatedMedias: MediaRelationType[] = [];

  static rowNames: InterfaceChangedPropTypesOnlyRealValues<MediaEntityType<any>, string> = {
    ...LocalStoreEntityType.rowNames,
    name: "Titel",
    format: "Format",
    tags: "Tags",
    releaseDate: "Herausgabedatum",
    additionalData: "Weitere Daten",
    usk: "USK",
    notices: "Notizen",
    score: "Wertung",
    reviewNotes: "Test",
    usages: "Benutzungen",
    relatedMedias: "andere Medien",
  };
}
