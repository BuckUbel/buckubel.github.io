export class AdditionalDataType {
  colName: string = "";
  dataType: "string" | "number" | "boolean" | "Date" | "undefined" = "undefined";
  value: string | number | boolean | Date | undefined = undefined;
  label: string = "";
}
