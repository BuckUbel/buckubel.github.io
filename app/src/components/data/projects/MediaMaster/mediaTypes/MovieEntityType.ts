import {MediaEntityType} from "./MediaType";

export type MovieFormatType = "Record" | "4k Blu-ray" | "Blu-ray" | "DVD" | "VHS";

export class MovieEntityType extends MediaEntityType<MovieFormatType> {
  isSeries: boolean = false;
  relatedToSeries: boolean = false;
  actors: string[] = [];
  length: number = -1;
}
