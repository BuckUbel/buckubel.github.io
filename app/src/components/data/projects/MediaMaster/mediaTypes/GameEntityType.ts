import {MediaEntityType} from "./MediaType";
import {InterfaceChangedPropTypesOnlyRealValues} from "../../../../helper/utilTypes";

export type GameFormatType = "Digital" | "Cartridge" | "Disc" | "unbekannt";
export type GameConditionType = 0 | 1 | 2 | 3 | -1;
export enum GamePlattformColor  {
 RED="#f00",
 BLUE="#00f",
 LIGHT_BLUE="#0af",
 GREEN="#0f0",
 GREY="#444",
}

// export type GameConditionType = "Abgenutzt" | "Gut" | "Sehr Gut" | "Top" | "unbekannt";

export class GameEntityType extends MediaEntityType<GameFormatType> {
  plattform: string = "";
  plattformColor: GamePlattformColor = GamePlattformColor.GREY;
  condition: GameConditionType = -1;
  goodForPlayerCount: number[] = []; // 1-5+

  withOVP: boolean = false;
  ovpCondition: GameConditionType = -1;

  playTime: number = 0
  estimatedPlayTime: number = -1;
  notYetPlayed: boolean = true;
  alreadyCompleted: boolean = false;

  mobileCompatible: boolean = false;

  static rowNames: InterfaceChangedPropTypesOnlyRealValues<GameEntityType, string> = {
    ...MediaEntityType.rowNames,
    plattform: "Plattform",
    plattformColor: "Plattform-Farbe",
    condition: "Zustand",
    goodForPlayerCount: "Gute Spieler-Zahl",
    withOVP: "OVP",
    ovpCondition: "OVP Zustand",
    playTime: "Spielzeit",
    estimatedPlayTime: "Bisherige Spielzeit",
    notYetPlayed: "nicht gespielt",
    alreadyCompleted: "beendet",
    mobileCompatible: "mobilfähig",
  };
}
