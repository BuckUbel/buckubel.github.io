import {LocalStoreEntityType} from "../../../../../hooks/useLocalStorage/LocalStoreContext";
import {InterfaceChangedPropTypesOnlyRealValues} from "../../../../helper/utilTypes";

export type UsageOpinionType = "Negativ" | "Neutral" | "Positiv" | "ungewertet";

export class UsageType extends LocalStoreEntityType {
  date: Date = new Date();
  notice: string = "";
  opinion: UsageOpinionType = "ungewertet";
  length: number = 0;

  static rowNames: InterfaceChangedPropTypesOnlyRealValues<UsageType, string> = {
    ...LocalStoreEntityType.rowNames,
    date: "Datum",
    notice: "Notizen",
    opinion: "Meinung",
    length: "Länge"
  };
}
