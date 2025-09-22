import { IMagnitude, ITime, IGeo } from "../shared";
import { IIndicatorValue } from "./indicator-value.interface";

export interface IIndicator {
    name: string;
    short_name: string;
    id: number;
    composited: boolean;
    step_type: string;
    disaggregated: boolean;
    magnitud: IMagnitude[];
    tiempo: ITime[];
    geos: IGeo[];
    values_updated_at: string;
    values: IIndicatorValue[];
}