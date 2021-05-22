import {LocalStoreEntityType} from "../../../../../hooks/useLocalStorage/LocalStoreContext";
import {AdditionalDataType} from "./AdditionalDataType";

export type USKType = 0 | 6 | 12 | 16 | 18;

export class MediaEntityType<Formats> extends LocalStoreEntityType {
  name: string = "";
  format: Array<Formats> = [];
  tags: string[] = [];
  releaseDate?: Date;
  additionalData: Array<AdditionalDataType> = []
  usk: USKType = 0;
  extraContent: string = "";
  score: number = -1;
  reviewNotes: string = "";
}
