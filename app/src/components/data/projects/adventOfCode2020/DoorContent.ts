import data1 from "./data/1.json";
import data2 from "./data/2.json";
import data3 from "./data/3.json";
import data4 from "./data/4.json";
import data5 from "./data/5.json";
import data6 from "./data/6.json";
import data7 from "./data/7.json";
import data8 from "./data/8.json";
import data9 from "./data/9.json";
import data10 from "./data/10.json";
import data11 from "./data/11.json";
import data12 from "./data/12.json";
import data13 from "./data/13.json";
import data14 from "./data/14.json";
import data15 from "./data/15.json";
import data16 from "./data/16.json";
import data17 from "./data/17.json";
import data18 from "./data/18.json";
import data19 from "./data/19.json";
import data20 from "./data/20.json";
import data21 from "./data/21.json";
import data22 from "./data/22.json";
import data23 from "./data/23.json";
import data24 from "./data/24.json";

const DOOR_DATA = [
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  data14,
  data15,
  data16,
  data17,
  data18,
  data19,
  data20,
  data21,
  data22,
  data23,
  data24
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

console.log(STARTED_DOOR_NUMBERS, COMPLETED_DOOR_NUMBERS)
