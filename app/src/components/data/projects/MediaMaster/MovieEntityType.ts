import {LocalStoreEntityType} from "../../../../hooks/useLocalStorage/LocalStoreContext";

export interface MovieEntityType extends LocalStoreEntityType {
  name: string;
}
