import { IIndicator } from "../../interfaces/indicator/indicator.interface";
import { IMagnitude, ITime } from "../../interfaces/shared";
import { IndicatorValue } from "./indicator-value.class";

export class Indicator {
    public id: number;
    public composited: boolean;
    public stepType: 'linear' | string;
    public disaggregated: boolean;
    public magnitude: IMagnitude[];
    public time: ITime[];
    public geos: { id: number, name: string }[];
    public values: IndicatorValue[];
    public updatedAt: string;
    
    constructor(json: IIndicator) {
        this.id = json.id;
        this.composited = json.composited;
        this.stepType = json.step_type;
        this.disaggregated = json.disaggregated;
        this.magnitude = json.magnitud;
        this.time = json.tiempo;
        this.geos = json.geos.map(({geo_id, geo_name}) => ({ id: geo_id, name: geo_name }));
        this.values = json.values.map((value) => new IndicatorValue(value));
        this.updatedAt = json.values_updated_at;
    }
}