import {MediaEntityType} from "./MediaType";

export type GameFormatType = "Digital" | "Cartridge" | "Disc"| "unbekannt";
export type GameConditionType = "Abgenutzt" | "Gut" | "Sehr Gut" | "Top" | "unbekannt";

export class GameEntityType extends MediaEntityType<GameFormatType> {
  plattform: string= "";
  condition: number = -1;
  conditionType: GameConditionType = "unbekannt";
  goodForPlayerCount: number[] =  []; // 1-5+

  withOVP: boolean = false;
  ovpCondition: number = -1;
  ovpConditionType: GameConditionType = "unbekannt";

  playTime: number = 0
  estimatedPlayTime: number = -1;
  notYetPlayed:boolean = true;
  alreadyCompleted: boolean = false;
}
