import { IntensityIndex } from "./IntensityIndex";

export interface Intensity {
  forecast: number;
  actual: number;
  index: IntensityIndex;
}
