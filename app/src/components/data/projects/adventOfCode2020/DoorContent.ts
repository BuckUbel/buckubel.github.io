import data1 from "./data/1.json";
import data2 from "./data/2.json";
import data3 from "./data/3.json";
import data4 from "./data/4.json";
import data5 from "./data/5.json";

const DOOR_DATA = [
  data1,
  data2,
  data3,
  data4,
  data5,
]

export interface DoorContentInterface {
  headline: string;
  task: string;
  translated_task: string;
  propsForSolution?: string;
  solution: string;
  finished: boolean;
}

export type DoorContentListInterface = {
  [key: number]: DoorContentInterface
};

function doorArrayToObject(): DoorContentListInterface {
  const doorContentObject: DoorContentListInterface = {};
  DOOR_DATA.forEach((v: { text: string, translatedText: string, solution: string, myPropsForSolution?: string, finished?: boolean }, i) => {
    const doorNumber = i + 1;
    if (v.solution !== "") {
      doorContentObject[doorNumber] = {
        headline: "Aufgabe " + doorNumber,
        task: v.text,
        translated_task: v.translatedText,
        propsForSolution: v.myPropsForSolution,
        solution: v.solution,
        finished: !!v.finished,
      }
    }
  });
  return doorContentObject;
}

export const DOOR_CONTENT: DoorContentListInterface = doorArrayToObject();

export const STARTED_DOOR_NUMBERS = Object.keys(DOOR_CONTENT).map(v => Number(v));
export const COMPLETED_DOOR_NUMBERS = Object.keys(DOOR_CONTENT)
    .filter((v,i)=> !!DOOR_CONTENT[i+1]?.finished)
    .map(v => Number(v));
